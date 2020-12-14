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
exports.scan = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const constants_1 = require("../constants");
const explorer_1 = __importDefault(require("./explorer"));
const koa_body_1 = __importDefault(require("koa-body"));
function scan(app, ControllerDir, router) {
    return __awaiter(this, void 0, void 0, function* () {
        router = router || new koa_router_1.default();
        app.use(koa_body_1.default());
        const Controllers = yield fs_1.promises.readdir(ControllerDir);
        for (const Controller of Controllers) {
            const { default: ctor } = yield require(path_1.default.resolve(ControllerDir, Controller));
            const basePath = Reflect.getMetadata(constants_1.PATH_METADATA, ctor);
            if (basePath) {
                new explorer_1.default(router, basePath, app).explore(new ctor());
            }
        }
    });
}
exports.scan = scan;
