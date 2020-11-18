import 'reflect-metadata';
import Router from 'koa-router';
import Koa, { DefaultContext, DefaultState } from 'koa';
import { scan } from './route/resolver';
export default class Samoyed {
  private router: Router<any, {}>;
  private readonly app: Koa<DefaultState, DefaultContext>;
  private readonly dir: string;

  constructor(
    app: Koa<DefaultState, DefaultContext>,
    dir: string,
    prefix: string
  ) {
    this.app = app;
    this.dir = dir;
    this.router = new Router({ prefix });
  }
  scan() {
    return scan(this.app, this.dir, this.router);
  }
}
export { scan } from './route/resolver';
export * from './decorators';
