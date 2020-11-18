import Koa from 'koa';

import Samoyed, { scan } from '../src';
import path from 'path';
const app = new Koa();
// 初始化
const ControllerDir = path.resolve(__dirname, './controller');
const sam = new Samoyed(app, ControllerDir, '/api');
scan(app, ControllerDir).then(() => {
  app.listen(3000);
});
sam.scan().then(() => {
  app.listen(3000);
});
