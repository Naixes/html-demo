// 注入

// 方法1
// interface IIndexService {
//     log(str: string): void;
// }

// class IndexService implements IIndexService {
//     public log(str: string) {
//         console.log(str);
//     }
// }

// class IndexController {
//     private indexService: IIndexService
//     constructor() {
//         this.indexService = new IndexService()
//     }
//     info() {
//         this.indexService.log('Naixes')
//     }
// }
// Controller + IndexService 耦合 最冗余的写法


// 2
// interface IIndexService {
//     log(str: string): void;
// }

// class IndexService implements IIndexService {
//     public log(str: string) {
//         console.log(str);
//     }
// }

// class IndexController {
//     private indexService: IIndexService
//     constructor(indexService: IIndexService) {
//         this.indexService = indexService
//     }
//     info() {
//         this.indexService.log('Naixes')
//     }
// }
// const indexService = new IndexService()
// const index = new IndexController(indexService)
// 把需要的参数透传出来


// 3
// interface IIndexService {
//     log(str: string): void;
// }

// class IndexService implements IIndexService {
//     public log(str: string) {
//         console.log(str);
//     }
// }

// class IndexController {
//     private indexService: IIndexService
//     constructor(indexService?: IIndexService) {
//         this.indexService = indexService
//     }
//     info() {
//         this.indexService.log('Naixes')
//     }
// }
// const index = new IndexController(null)
// DI(dependent inject，solid设计原则的组成部分，s单一功能原则，o开闭原则，l里氏替换原则，i接口隔离原则，d依赖反转)


// 4
import {parseScript} from 'esprima'
import {Pattern} from 'estree'
import 'reflect-metadata'

import CreateIoc from './ioc'

// 容器
const container = new CreateIoc()

// 常量区
interface ITypes {
    [key: string]: Symbol
}
const TYPES: ITypes = {
    indexService: Symbol.for('indexService')
}

interface IIndexService {
    log(str: string): void;
}
class IndexService implements IIndexService {
    public log(str: string) {
        console.log(str);
    }
}

container.bind(TYPES.indexService, () => new IndexService())

// 获取函数的参数名
function getParams(fn: Function) {
    const ast = parseScript(fn.toString())
    console.log('ast', ast);
    const node = ast.body[0]
    let fnParams: Pattern[] = []
    if(node.type === 'FunctionDeclaration') {
        fnParams = node.params
    }
    let validParams:string[] = []
    fnParams.forEach(obj => {
        if(obj.type === 'Identifier') {
            validParams.push(obj.name)
        }
    })
    return validParams
}

// 判断对象是否有key
function hasKey<O extends Object>(obj: O, key: keyof any): key is keyof O {
    return obj.hasOwnProperty(key)
}

// 元编程
// 相当于标记需要注入的内容
function inject(serviceIdentifier: Symbol): Function {
    return (target: Function, targetKey: string, index: number) => {
        if(!targetKey) {
            Reflect.defineMetadata(
                serviceIdentifier,
                container.get(serviceIdentifier),
                target
            )
        }
    }
}

// ts中有三个小白点说明代码有问题
// {}在ts中代表：object 代码块 函数体。。
// 范型T保证constructor是可以new的
function controller<T extends {new (...args: any[]): {}}>(constructor: T) {
    class Controller extends constructor {
        constructor(...args: any[]) {
            console.log('constructor', constructor.toString());
            super(args)
            const _params = getParams(constructor)
            let _identity: string
            // 注入参数
            for(_identity of _params) {
                const _meta = Reflect.getMetadata(TYPES[_identity], constructor)
                // 判断
                if(hasKey(this, _identity) && _meta) {
                    // this[_identity] = new IndexService()
                    // 从容器中获取
                    // this[_identity] = container.get(TYPES[_identity])
                    // 从元编程中获取
                    this[_identity] = _meta
                }
            }
        }
    }
    return Controller
}
// controller拦截，对类进行代理
@controller
// 对装饰器的实验支持功能未来可能更改，配置 experimentalDecorators 可消除此处警告
class IndexController {
    private indexService: IIndexService
    // 参数注入
    constructor(@inject(TYPES.indexService) indexService?: IIndexService) {
        // !表示一定有值
        this.indexService = indexService!
    }
    info() {
        this.indexService.log('Naixes')
    }
}
const index = new IndexController()
index.info()
// 注入参数