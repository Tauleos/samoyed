import { Controller, Ctx, Get, Ip, Post, Req } from '../../src';
import { Context, Request } from 'koa';
import { Body } from '../../src';

@Controller('/goods')
export default class GoodsController {
  @Post('/add')
  addAction(@Ctx() ctx: Context, @Ip() ip: string, @Body() params: any) {
    console.log('aaaa', params);

    return { code: 0, success: true };
  }
  @Get('/list')
  listAction(@Req() req: Request) {
    return { success: false };
  }
}
