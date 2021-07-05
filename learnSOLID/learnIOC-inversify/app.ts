// 引入元编程
import 'reflect-metadata';
// loader
import './ioc/loader';

import { InversifyKoaServer } from 'inversify-koa-utils';
import { Container } from 'inversify';
// 让provider生效，注到容器中，之前是用bind
import { buildProviderModule } from 'inversify-binding-decorators';

const container = new Container();
// service + controller 全部支持
container.load(buildProviderModule());
// 绑定服务和容器
const server = new InversifyKoaServer(container);
const app = server.build();
app.listen(3000, () => {
  console.log('🍺服务启动成功');
});
