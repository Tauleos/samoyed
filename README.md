# Samoyed
>为 koa-router 提供装饰器。方便koa用户使用注解的方式定义路由

[![npm version](https://badge.fury.io/js/isamoyed.svg)](https://badge.fury.io/js/isamoyed)
[![NPM downloads](http://img.shields.io/npm/dy/isamoyed.svg?style=flat)](https://www.npmjs.com/package/isamoyed)

### 适用人群
- Koa 用户
- Typescript用户

### 安装
```
npm install --save isamoyed
```
### 使用
```js
import { scan } from 'isamoyed'

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

- scan(app,ControllerDir)
- Controller
- Get
- Post
- Put
- Delete