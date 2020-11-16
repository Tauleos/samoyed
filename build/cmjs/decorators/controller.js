"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
var constants_1 = require("../constants");
function Controller(path) {
    return function (target) {
        Reflect.defineMetadata(constants_1.PATH_METADATA, path, target);
    };
}
exports.Controller = Controller;
