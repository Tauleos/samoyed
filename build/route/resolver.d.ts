import Router from 'koa-router';
import Koa from 'koa';
declare function scan(app: Koa, ControllerDir: string, router?: Router): Promise<void>;
export { scan };
