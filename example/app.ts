import Koa from 'koa';

import { scan } from '../build/cmjs';
import path from 'path';
const app = new Koa();
// 初始化
const ControllerDir = path.resolve(__dirname, './controller');
scan(app, ControllerDir).then(() => {
  app.listen(3000);
});
