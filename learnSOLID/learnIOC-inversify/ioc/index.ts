// 配置中心

// 流式provider
import { fluentProvide } from 'inversify-binding-decorators';

let provideThrowable = (identifier: symbol, name: string) => {
  // 当用到name时激活注到容器里的类
  return fluentProvide(identifier).whenTargetNamed(name).done();
};

export { provideThrowable };
