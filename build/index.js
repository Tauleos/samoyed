"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scan = void 0;
require("reflect-metadata");
const koa_router_1 = __importDefault(require("koa-router"));
const resolver_1 = require("./route/resolver");
class Samoyed {
    constructor(app, dir, prefix) {
        this.app = app;
        this.dir = dir;
        this.router = new koa_router_1.default({ prefix });
    }
    scan() {
        return resolver_1.scan(this.app, this.dir, this.router);
    }
}
exports.default = Samoyed;
var resolver_2 = require("./route/resolver");
Object.defineProperty(exports, "scan", { enumerable: true, get: function () { return resolver_2.scan; } });
__exportStar(require("./decorators"), exports);
