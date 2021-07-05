// 实现一个对应的接口
// @可以被注入
// 注入时给了一个名字

import { inject } from 'inversify';
import { interfaces, controller, httpGet, TYPE } from 'inversify-koa-utils';
import TAGS from '../constant/tags';
import { IIndex } from '../interface/IIndex';
import { provideThrowable } from '../ioc';
import type { IRouterContext } from 'koa-router';

// 配置好的当用到name时激活注到容器里的类
// 在路由激活时才去容器中寻找类的实例
@provideThrowable(TYPE.Controller, 'IndexController')
// 使用inversify-koa-utils封装好的controller，interface等自动注册路由
@controller('/')
export default class IndexController implements interfaces.Controller {
  private indexService: IIndex;
  // 注入
  constructor(@inject(TAGS.IndexService) indexService: IIndex) {
    // 私有化
    this.indexService = indexService;
  }
  // action
  @httpGet('/')
  private async index(
    ctx: IRouterContext,
    next: () => Promise<unknown>
  ): Promise<void> {
    const data = this.indexService.getUserId(0);
    ctx.body = {
      data,
    };
  }
}
