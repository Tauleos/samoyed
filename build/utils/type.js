"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isConstructor = exports.isFunction = void 0;
function isFunction(target) {
    return typeof target === 'function';
}
exports.isFunction = isFunction;
function isConstructor(target) {
    return target === 'constructor';
}
exports.isConstructor = isConstructor;
