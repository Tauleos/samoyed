"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const constants_1 = require("../constants");
function Controller(path) {
    return (target) => {
        Reflect.defineMetadata(constants_1.PATH_METADATA, path, target);
    };
}
exports.Controller = Controller;
