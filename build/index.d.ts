import 'reflect-metadata';
import Koa, { DefaultContext, DefaultState } from 'koa';
export default class Samoyed {
    private router;
    private readonly app;
    private readonly dir;
    constructor(app: Koa<DefaultState, DefaultContext>, dir: string, prefix: string);
    scan(): Promise<void>;
}
export { scan } from './route/resolver';
export * from './decorators';
