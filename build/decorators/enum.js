"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouteParamTypes = void 0;
var RouteParamTypes;
(function (RouteParamTypes) {
    RouteParamTypes[RouteParamTypes["REQUEST"] = 0] = "REQUEST";
    RouteParamTypes[RouteParamTypes["RESPONSE"] = 1] = "RESPONSE";
    RouteParamTypes[RouteParamTypes["NEXT"] = 2] = "NEXT";
    RouteParamTypes[RouteParamTypes["BODY"] = 3] = "BODY";
    RouteParamTypes[RouteParamTypes["QUERY"] = 4] = "QUERY";
    RouteParamTypes[RouteParamTypes["PARAM"] = 5] = "PARAM";
    RouteParamTypes[RouteParamTypes["HEADERS"] = 6] = "HEADERS";
    RouteParamTypes[RouteParamTypes["SESSION"] = 7] = "SESSION";
    RouteParamTypes[RouteParamTypes["FILE"] = 8] = "FILE";
    RouteParamTypes[RouteParamTypes["FILES"] = 9] = "FILES";
    RouteParamTypes[RouteParamTypes["HOST"] = 10] = "HOST";
    RouteParamTypes[RouteParamTypes["IP"] = 11] = "IP";
})(RouteParamTypes = exports.RouteParamTypes || (exports.RouteParamTypes = {}));
