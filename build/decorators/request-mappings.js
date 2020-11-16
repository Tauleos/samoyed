"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Put = exports.Post = exports.Get = void 0;
var constants_1 = require("../constants");
var createMappingDecorator = function (method) { return function (path) {
    return function (target, key, descriptor) {
        Reflect.defineMetadata(constants_1.PATH_METADATA, path, descriptor.value);
        Reflect.defineMetadata(constants_1.METHOD_METADATA, method, descriptor.value);
        return descriptor;
    };
}; };
exports.Get = createMappingDecorator('GET');
exports.Post = createMappingDecorator('POST');
exports.Put = createMappingDecorator('PUT');
exports.Delete = createMappingDecorator('DELETE');
