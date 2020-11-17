import { ROUTE_ARGS_METADATA } from '../constants';
import { RouteParamTypes } from '../enum';

export type ParamData = Record<string, unknown> | string | number;
function createRouteParamDecorator(paramType: RouteParamTypes) {
  return (data?: ParamData): ParameterDecorator => (target, key, index) => {
    const args =
      Reflect.getMetadata(ROUTE_ARGS_METADATA, target.constructor, key) || {};
    Reflect.defineMetadata(
      ROUTE_ARGS_METADATA,
      { ...args, [`${paramType}:${index}`]: { index, data } },
      target.constructor,
      key
    );
  };
}

export const Request = createRouteParamDecorator(RouteParamTypes.REQUEST);
export const Response = createRouteParamDecorator(RouteParamTypes.RESPONSE);
export const Ctx = createRouteParamDecorator(RouteParamTypes.CTX);
export const Next = createRouteParamDecorator(RouteParamTypes.NEXT);
export const Body = createRouteParamDecorator(RouteParamTypes.BODY);
export const Query = createRouteParamDecorator(RouteParamTypes.QUERY);
export const Param = createRouteParamDecorator(RouteParamTypes.PARAM);
export const Headers = createRouteParamDecorator(RouteParamTypes.HEADERS);
export const Session = createRouteParamDecorator(RouteParamTypes.SESSION);
export const File = createRouteParamDecorator(RouteParamTypes.FILE);
export const Files = createRouteParamDecorator(RouteParamTypes.FILES);
export const Ip = createRouteParamDecorator(RouteParamTypes.IP);
export const Req = Request;
export const Res = Response;
