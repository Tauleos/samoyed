import { RouteParamTypes } from '../enum';
import { Context, Next } from 'koa';

export default class RouteParamsFactory {
  exchangeKeyForValue(
    key: RouteParamTypes | string,
    data: string | Record<string, unknown> | any,
    { ctx, next }: { ctx: Context; next: Next }
  ) {
    switch (key) {
      case RouteParamTypes.NEXT:
        return next as any;
      case RouteParamTypes.REQUEST:
        return ctx.req as any;
      case RouteParamTypes.RESPONSE:
        return ctx.res as any;
      case RouteParamTypes.BODY:
        return data && ctx.request.body
          ? ctx.request.body[data]
          : ctx.request.body;
      case RouteParamTypes.PARAM:
        return data ? ctx.params[data] : ctx.params;
      case RouteParamTypes.HOST:
        return data ? ctx.hosts[data] : ctx.hosts;
      case RouteParamTypes.QUERY:
        return data ? ctx.query[data] : ctx.query;
      case RouteParamTypes.HEADERS:
        return data ? ctx.headers[data.toLowerCase()] : ctx.headers;
      case RouteParamTypes.SESSION:
        return ctx.session;
      case RouteParamTypes.FILE:
        return ctx.request.files ? [data || 'file'] : undefined;
      case RouteParamTypes.FILES:
        return ctx.request.files;
      case RouteParamTypes.IP:
        return ctx.ip;
      default:
        return null;
    }
  }
}
