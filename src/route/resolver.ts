import Router from 'koa-router';
import Koa from 'koa';
import path from 'path';
import { PATH_METADATA } from '../constants';
import RouterExplorer from './explorer';
import koaBody from 'koa-body';
import globby from 'globby';

async function scan(
  app: Koa,
  ControllerDir: string,
  router?: Router
): Promise<void> {
  router = router || new Router();
  app.use(koaBody());
  // const Controllers = await fsp.readdir(ControllerDir);
  const Controllers = await globby(`${ControllerDir}/!(*.d).{ts,js}`, {
    expandDirectories: true,
  });

  for (const Controller of Controllers) {
    const { default: ctor } = await require(path.resolve(
      ControllerDir,
      Controller
    ));
    const basePath = Reflect.getMetadata(PATH_METADATA, ctor);
    if (basePath) {
      new RouterExplorer(router, basePath, app).explore(new ctor());
    }
  }
}
export { scan };
