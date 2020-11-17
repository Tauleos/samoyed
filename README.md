# Samoyed
>为 koa-router 提供装饰器。方便koa用户使用注解的方式定义路由

[![npm version](https://badge.fury.io/js/isamoyed.svg)](https://badge.fury.io/js/isamoyed)
[![NPM downloads](http://img.shields.io/npm/dy/isamoyed.svg?style=flat)](https://www.npmjs.com/package/isamoyed)

### 适用人群
- Koa 用户
- Typescript用户
- 使用之前请先阅读[注意事项](#注意事项)

### 安装
```
npm install --save isamoyed
```
### 使用
```js
import Koa from 'koa';

import { scan } from '../build/cmjs';
import path from 'path';
const app = new Koa();
// 初始化
const ControllerDir = path.resolve(__dirname, './controller');

await scan(app,controllerDir);

```

### 装饰器使用示例
```
import { Controller, Ctx, Get, Ip, Post, Req } from '../../build';
import { Context, Request } from 'koa';

@Controller('/goods')
export default class GoodsController {
  @Post('/add')
  addAction(@Ctx() ctx: Context, @Ip() ip: string) {
    return { code: 0, success: true };
  }
  @Get('/list')
  listAction(@Req() req: Request) {
    return { success: false };
  }
}
```

### API

- scan(app,ControllerDir):全局扫描控制器进行路由注册
    - app: Koa 实例
    - ControllerDir: 控制器文件所在目录，*目前只支持单层目录*
- Controller(path:string): 定义控制器的基础路由路径
- 支持 `GET POST PUT DELETE` 方法，可使用装饰器 `@GET @POST @PUT @DELETE`
- 支持通过注解`Ctx Request Req Response Res Query Body Param Headers Session File Files Ip `获取对应的属性 


### 注意事项

- `controllerDir` 目前只支持单层目录，暂时不支持目录嵌套。
- 示例中的`Action` 方法目前只支持返回json结构，暂时不支持重定向等操作。