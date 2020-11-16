"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Req = exports.Ip = exports.Files = exports.File = exports.Session = exports.Headers = exports.Param = exports.Query = exports.Body = exports.Next = exports.Ctx = exports.Response = exports.Request = void 0;
var constants_1 = require("../constants");
var enum_1 = require("../enum");
function createRouteParamDecorator(paramType) {
    return function (data) { return function (target, key, index) {
        var _a;
        var args = Reflect.getMetadata(constants_1.ROUTE_ARGS_METADATA, target.constructor, key) || {};
        Reflect.defineMetadata(constants_1.ROUTE_ARGS_METADATA, __assign(__assign({}, args), (_a = {}, _a[paramType + ":" + index] = { index: index, data: data }, _a)), target.constructor, key);
    }; };
}
exports.Request = createRouteParamDecorator(enum_1.RouteParamTypes.REQUEST);
exports.Response = createRouteParamDecorator(enum_1.RouteParamTypes.RESPONSE);
exports.Ctx = createRouteParamDecorator(enum_1.RouteParamTypes.CTX);
exports.Next = createRouteParamDecorator(enum_1.RouteParamTypes.NEXT);
exports.Body = createRouteParamDecorator(enum_1.RouteParamTypes.BODY);
exports.Query = createRouteParamDecorator(enum_1.RouteParamTypes.QUERY);
exports.Param = createRouteParamDecorator(enum_1.RouteParamTypes.PARAM);
exports.Headers = createRouteParamDecorator(enum_1.RouteParamTypes.HEADERS);
exports.Session = createRouteParamDecorator(enum_1.RouteParamTypes.SESSION);
exports.File = createRouteParamDecorator(enum_1.RouteParamTypes.FILE);
exports.Files = createRouteParamDecorator(enum_1.RouteParamTypes.FILES);
exports.Ip = createRouteParamDecorator(enum_1.RouteParamTypes.IP);
exports.Req = exports.Request;
