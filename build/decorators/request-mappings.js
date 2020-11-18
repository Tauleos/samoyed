"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Delete = exports.Put = exports.Post = exports.Get = void 0;
const constants_1 = require("../constants");
const createMappingDecorator = (method) => (path) => {
    return (target, key, descriptor) => {
        Reflect.defineMetadata(constants_1.PATH_METADATA, path, descriptor.value);
        Reflect.defineMetadata(constants_1.METHOD_METADATA, method, descriptor.value);
        return descriptor;
    };
};
exports.Get = createMappingDecorator('GET');
exports.Post = createMappingDecorator('POST');
exports.Put = createMappingDecorator('PUT');
exports.Delete = createMappingDecorator('DELETE');
