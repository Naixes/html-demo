// esprima是一个js解释器
import { parseScript } from 'esprima';
import CreateIoc from './ioc';
import type { Pattern } from 'estree';
// 元编程
import 'reflect-metadata';

//常量区域
interface ITypes {
  [key: string]: symbol;
}
const TYPES: ITypes = {
  indexService: Symbol.for('indexService'),
};
interface IIndexService {
  log(str: string): void;
}
class IndexService implements IIndexService {
  log(str: string) {
    console.log(str);
  }
}
const container = new CreateIoc();
//把所需注入的服务注入到容器中container
container.bind(TYPES.indexService, () => new IndexService());

function getParams(fn: Function) {
  const ast = parseScript(fn.toString());
  // 忽略
  // @ts-expect-error
  const node = ast.body[0]['body']['body'][0];
  let fnParams: Pattern[] = [];
  if (node.kind === 'constructor') {
    fnParams = node['value'].params;
  }
  const validParams: string[] = [];
  fnParams.forEach((obj) => {
    if (obj.type === 'Identifier') {
      validParams.push(obj.name);
    }
  });
  //   console.log('node: ', validParams);
  return validParams;
}

// keyof any表示string，number或者symbol，使用PropertyKey也可以
function haskey<O extends Object>(obj: O, key: PropertyKey): key is keyof O {
  return obj.hasOwnProperty(key);
}

function inject(serviceIdentifier: symbol) {
  return (target: Function, targetKey: string, index: number) => {
    if (!targetKey) {
      // 把想构造的参数事先注册好
      Reflect.defineMetadata(
        serviceIdentifier,
        container.get(serviceIdentifier),
        target
      );
    }
  };
}

function controller<T extends { new (...args: any[]): {} }>(constructor: T) {
  class Controller extends constructor {
    // 拦截
    constructor(...args: any[]) {
      super(args);
      // 获取所有的参数
      const _parmas = getParams(constructor);
      let identity: string;
      // 寻找并注入
      for (identity of _parmas) {
        if (haskey(this, identity)) {
          //this[identity] = container.get(TYPES[identity]);
          this[identity] = Reflect.getMetadata(TYPES[identity], constructor); 
        }
      }
    }
  }
  return Controller;
}

@controller
class IndexController {
  public indexService: IIndexService;
  constructor(@inject(TYPES.indexService) indexService?: IndexService) {
    if (indexService) {
      this.indexService = indexService;
    }
  }
  info() {
    this.indexService.log('京程一灯 🏮' + Math.random());
  }
}
const index = new IndexController();
index.info();
//①最愚蠢的业务和所需的service 在一起
// const instance = new IndexService();
// this.indexService = instance;
//②稍微好一点 但是业务逻辑的代码还是跟所需的服务混合一起
// const instance = new IndexService();
// const index = new IndexController(instance);
