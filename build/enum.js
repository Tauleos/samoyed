"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteParamTypes = void 0;
var RouteParamTypes;
(function (RouteParamTypes) {
    RouteParamTypes[RouteParamTypes["REQUEST"] = 0] = "REQUEST";
    RouteParamTypes[RouteParamTypes["RESPONSE"] = 1] = "RESPONSE";
    RouteParamTypes[RouteParamTypes["CTX"] = 2] = "CTX";
    RouteParamTypes[RouteParamTypes["NEXT"] = 3] = "NEXT";
    RouteParamTypes[RouteParamTypes["BODY"] = 4] = "BODY";
    RouteParamTypes[RouteParamTypes["QUERY"] = 5] = "QUERY";
    RouteParamTypes[RouteParamTypes["PARAM"] = 6] = "PARAM";
    RouteParamTypes[RouteParamTypes["HEADERS"] = 7] = "HEADERS";
    RouteParamTypes[RouteParamTypes["SESSION"] = 8] = "SESSION";
    RouteParamTypes[RouteParamTypes["FILE"] = 9] = "FILE";
    RouteParamTypes[RouteParamTypes["FILES"] = 10] = "FILES";
    RouteParamTypes[RouteParamTypes["HOST"] = 11] = "HOST";
    RouteParamTypes[RouteParamTypes["IP"] = 12] = "IP";
})(RouteParamTypes = exports.RouteParamTypes || (exports.RouteParamTypes = {}));
