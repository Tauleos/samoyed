import Koa from 'koa';
declare function scan(app: Koa, ControllerDir: string): Promise<void>;
export { scan };
