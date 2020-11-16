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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var constants_1 = require("../constants");
var type_1 = require("../utils/type");
var koa_router_1 = __importDefault(require("koa-router"));
var params_factory_1 = __importDefault(require("./params-factory"));
var RouterExplorer = /** @class */ (function () {
    function RouterExplorer(basePath, app) {
        this.router = new koa_router_1.default();
        this.paramsFactory = new params_factory_1.default();
        this.basePath = basePath;
        this.app = app;
    }
    RouterExplorer.prototype.explore = function (instance) {
        var routerPaths = this.scanForPaths(instance);
        this.applyPathsToRouterProxy(routerPaths, instance);
    };
    RouterExplorer.prototype.scanForPaths = function (instance) {
        var prototype = Object.getPrototypeOf(instance);
        // 筛选出类的 methodName
        var methodsNames = Object.getOwnPropertyNames(prototype).filter(function (item) {
            return !type_1.isConstructor(item) && type_1.isFunction(prototype[item]);
        });
        return methodsNames.map(function (methodName) {
            var fn = prototype[methodName];
            // 取出定义的 metadata
            var routePath = Reflect.getMetadata(constants_1.PATH_METADATA, fn);
            var method = Reflect.getMetadata(constants_1.METHOD_METADATA, fn);
            return {
                routePath: routePath,
                method: method.toLowerCase(),
                fn: fn,
                methodName: methodName,
            };
        });
    };
    RouterExplorer.prototype.applyPathsToRouterProxy = function (routerPaths, instance) {
        var _this = this;
        routerPaths.map(function (pathProperty) {
            _this.applyCallbackToRouter(pathProperty, instance);
            // router[route.method](`${basePath}${route.route}`, (ctx) => {
            //   const result = new ctor(ctx)[route.methodName]();
            //   ctx.body = result;
            // });
        });
        this.app.use(this.router.routes());
    };
    RouterExplorer.prototype.applyCallbackToRouter = function (pathProperty, instance) {
        var routePath = pathProperty.routePath, method = pathProperty.method, methodName = pathProperty.methodName, fn = pathProperty.fn;
        var routerMethod = this.router[method].bind(this.router);
        var fullPath = "" + this.basePath + routePath;
        var handler = this.createCallbackProxy(fn, instance, methodName);
        routerMethod(fullPath, handler);
    };
    RouterExplorer.prototype.createCallbackProxy = function (callback, instance, methodName) {
        var _this = this;
        //todo get paramDecorator
        var metadata = Reflect.getMetadata(constants_1.ROUTE_ARGS_METADATA, instance.constructor, methodName) || {};
        var types = Reflect.getMetadata('design:paramtypes', instance, methodName);
        var keys = Object.keys(metadata);
        var args = new Array(keys.length);
        var paramsOptions = keys.map(function (key) {
            var _a = metadata[key], index = _a.index, data = _a.data;
            var type = Number(key.split(':')[0]);
            return {
                index: index,
                data: data,
                type: type,
                extractValue: function (ctx, next) {
                    return _this.paramsFactory.exchangeKeyForValue(type, data, {
                        ctx: ctx,
                        next: next,
                    });
                },
            };
        });
        var fnApplyPipes = this.createPipesFn(null, paramsOptions);
        return function (ctx, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = fnApplyPipes;
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, fnApplyPipes(args, ctx, next)];
                    case 1:
                        _a = (_b.sent());
                        _b.label = 2;
                    case 2:
                        _a;
                        result = callback.call.apply(callback, __spreadArrays([instance], args));
                        if (!(result === null || result === void 0 ? void 0 : result.then)) return [3 /*break*/, 4];
                        return [4 /*yield*/, result];
                    case 3:
                        result = _b.sent();
                        _b.label = 4;
                    case 4:
                        ctx.body = result;
                        return [2 /*return*/];
                }
            });
        }); };
    };
    RouterExplorer.prototype.createPipesFn = function (pipes, paramsOptions) {
        var _this = this;
        var pipesFn = function (args, ctx, next) { return __awaiter(_this, void 0, void 0, function () {
            var resolveParamValue;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        resolveParamValue = function (param) { return __awaiter(_this, void 0, void 0, function () {
                            var index, extractValue, value;
                            return __generator(this, function (_a) {
                                index = param.index, extractValue = param.extractValue;
                                value = extractValue(ctx, next);
                                args[index] = value;
                                return [2 /*return*/];
                            });
                        }); };
                        return [4 /*yield*/, Promise.all(paramsOptions.map(resolveParamValue))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); };
        return paramsOptions.length ? pipesFn : null;
    };
    return RouterExplorer;
}());
exports.default = RouterExplorer;
