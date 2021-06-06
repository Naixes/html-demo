import "reflect-metadata";

// 元编程

function inject(serviceIdentifier) {
  return function(target, targetKey, index) {
    Reflect.defineMetadata(serviceIdentifier, "naixes", target);
  };
}
class IndexController {
  public indexService;
  constructor(@inject('xxx') indexService) {
    this.indexService = indexService;
  }
}
const indexController = new IndexController("sin");
console.log("🍎",indexController.indexService); // sin
// 不破坏js原来的结构
console.log("🍊",Reflect.getMetadata("xxx",IndexController)); // naixes