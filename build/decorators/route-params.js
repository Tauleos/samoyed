"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Res = exports.Req = exports.Ip = exports.Files = exports.File = exports.Session = exports.Headers = exports.Param = exports.Query = exports.Body = exports.Next = exports.Ctx = exports.Response = exports.Request = void 0;
const constants_1 = require("../constants");
const enum_1 = require("../enum");
function createRouteParamDecorator(paramType) {
    return (data) => (target, key, index) => {
        const args = Reflect.getMetadata(constants_1.ROUTE_ARGS_METADATA, target.constructor, key) || {};
        Reflect.defineMetadata(constants_1.ROUTE_ARGS_METADATA, Object.assign(Object.assign({}, args), { [`${paramType}:${index}`]: { index, data } }), target.constructor, key);
    };
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
exports.Res = exports.Response;
