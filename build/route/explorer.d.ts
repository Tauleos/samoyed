import Router from 'koa-router';
import Koa from 'koa';
interface PathProperty {
    routePath: string;
    method: 'get' | 'post';
    fn: () => void;
    methodName: string;
}
export default class RouterExplorer {
    router: Router<any, {}>;
    private paramsFactory;
    private readonly basePath;
    private app;
    constructor(basePath: string, app: Koa);
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
