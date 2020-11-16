import { RouteParamTypes } from '../enum';
import { Context, Next } from 'koa';
export default class RouteParamsFactory {
    exchangeKeyForValue(key: RouteParamTypes | string, data: string | Record<string, unknown> | any, { ctx, next }: {
        ctx: Context;
        next: Next;
    }): any;
}
