import Koa, { DefaultContext, DefaultState } from 'koa';
import Router from 'koa-router';
interface PathProperty {
    routePath: string;
    method: 'get' | 'post';
    fn: () => void;
    methodName: string;
}
export default class RouterExplorer {
    private paramsFactory;
    private readonly basePath;
    private app;
    private readonly router;
    constructor(router: Router, basePath: string, app: Koa<DefaultState, DefaultContext>);
    explore(instance: Record<string, unknown>): void;
    scanForPaths(instance: Record<string, unknown>): {
        routePath: any;
        method: "get";
        fn: any;
        methodName: string;
    }[];
    applyPathsToRouterProxy(routerPaths: PathProperty[], instance: Record<string, unknown>): void;
    applyCallbackToRouter(pathProperty: PathProperty, instance: Record<string, unknown>): void;
    private createCallbackProxy;
    private createPipesFn;
}
export {};
