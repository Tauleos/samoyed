"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const enum_1 = require("../enum");
class RouteParamsFactory {
    exchangeKeyForValue(key, data, { ctx, next }) {
        switch (key) {
            case enum_1.RouteParamTypes.NEXT:
                return next;
            case enum_1.RouteParamTypes.CTX:
                return ctx;
            case enum_1.RouteParamTypes.REQUEST:
                return ctx.req;
            case enum_1.RouteParamTypes.RESPONSE:
                return ctx.res;
            case enum_1.RouteParamTypes.BODY:
                return data && ctx.request.body
                    ? ctx.request.body[data]
                    : ctx.request.body;
            case enum_1.RouteParamTypes.PARAM:
                return data ? ctx.params[data] : ctx.params;
            case enum_1.RouteParamTypes.HOST:
                return data ? ctx.hosts[data] : ctx.hosts;
            case enum_1.RouteParamTypes.QUERY:
                return data ? ctx.query[data] : ctx.query;
            case enum_1.RouteParamTypes.HEADERS:
                return data ? ctx.headers[data.toLowerCase()] : ctx.headers;
            case enum_1.RouteParamTypes.SESSION:
                return ctx.session;
            case enum_1.RouteParamTypes.FILE:
                return ctx.request.files ? [data || 'file'] : undefined;
            case enum_1.RouteParamTypes.FILES:
                return ctx.request.files;
            case enum_1.RouteParamTypes.IP:
                return ctx.ip;
            default:
                return null;
        }
    }
}
exports.default = RouteParamsFactory;
