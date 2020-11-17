"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const type_1 = require("../utils/type");
const koa_router_1 = __importDefault(require("koa-router"));
const params_factory_1 = __importDefault(require("./params-factory"));
class RouterExplorer {
    constructor(basePath, app) {
        this.router = new koa_router_1.default();
        this.paramsFactory = new params_factory_1.default();
        this.basePath = basePath;
        this.app = app;
    }
    explore(instance) {
        const routerPaths = this.scanForPaths(instance);
        this.applyPathsToRouterProxy(routerPaths, instance);
    }
    scanForPaths(instance) {
        const prototype = Object.getPrototypeOf(instance);
        // 筛选出类的 methodName
        const methodsNames = Object.getOwnPropertyNames(prototype).filter((item) => {
            return !type_1.isConstructor(item) && type_1.isFunction(prototype[item]);
        });
        return methodsNames.map((methodName) => {
            const fn = prototype[methodName];
            // 取出定义的 metadata
            const routePath = Reflect.getMetadata(constants_1.PATH_METADATA, fn);
            const method = Reflect.getMetadata(constants_1.METHOD_METADATA, fn);
            return {
                routePath,
                method: method.toLowerCase(),
                fn,
                methodName,
            };
        });
    }
    applyPathsToRouterProxy(routerPaths, instance) {
        routerPaths.map((pathProperty) => {
            this.applyCallbackToRouter(pathProperty, instance);
            // router[route.method](`${basePath}${route.route}`, (ctx) => {
            //   const result = new ctor(ctx)[route.methodName]();
            //   ctx.body = result;
            // });
        });
        this.app.use(this.router.routes());
    }
    applyCallbackToRouter(pathProperty, instance) {
        const { routePath, method, methodName, fn } = pathProperty;
        const routerMethod = this.router[method].bind(this.router);
        const fullPath = `${this.basePath}${routePath}`;
        const handler = this.createCallbackProxy(fn, instance, methodName);
        routerMethod(fullPath, handler);
    }
    createCallbackProxy(callback, instance, methodName) {
        //todo get paramDecorator
        const metadata = Reflect.getMetadata(constants_1.ROUTE_ARGS_METADATA, instance.constructor, methodName) || {};
        const types = Reflect.getMetadata('design:paramtypes', instance, methodName);
        const keys = Object.keys(metadata);
        const args = new Array(keys.length);
        const paramsOptions = keys.map((key) => {
            const { index, data } = metadata[key];
            const type = Number(key.split(':')[0]);
            return {
                index,
                data,
                type,
                extractValue: (ctx, next) => {
                    return this.paramsFactory.exchangeKeyForValue(type, data, {
                        ctx,
                        next,
                    });
                },
            };
        });
        const fnApplyPipes = this.createPipesFn(null, paramsOptions);
        return (ctx, next) => __awaiter(this, void 0, void 0, function* () {
            fnApplyPipes && (yield fnApplyPipes(args, ctx, next));
            let result = callback.call(instance, ...args);
            if (result === null || result === void 0 ? void 0 : result.then) {
                result = yield result;
            }
            ctx.body = result;
        });
    }
    createPipesFn(pipes, paramsOptions) {
        const pipesFn = (args, ctx, next) => __awaiter(this, void 0, void 0, function* () {
            const resolveParamValue = (param) => __awaiter(this, void 0, void 0, function* () {
                const { index, extractValue } = param;
                const value = extractValue(ctx, next);
                args[index] = value;
            });
            yield Promise.all(paramsOptions.map(resolveParamValue));
        });
        return paramsOptions.length ? pipesFn : null;
    }
}
exports.default = RouterExplorer;
