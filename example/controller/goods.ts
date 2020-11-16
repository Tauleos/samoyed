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
