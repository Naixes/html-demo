//提供基础的闭包能力
function sandbox(global) {
  console.log(global.document);
}
foo({
  document: '我是自定义属性',
});
//eval 还是 function，执行时都会把作用域一层一层向上查找，如果找不到会一直到 global，那么利用 Proxy 的原理就是，让执行了代码在 sandobx 中找的到，以达到「防逃逸」的目的。
function evalute(code, sandbox) {
  sandbox = sandbox || Object.create(null);
  const fn = new Function('sandbox', `with(sandbox){return (${code})}`);
  const proxy = new Proxy(sandbox, {
    has(target, key) {
      // 让动态执行的代码认为属性已存在
      return true;
    },
  });
  return fn(proxy);
}
evalute('1+2'); // 3
evalute('console.log(1)'); // Cannot read property 'log' of undefined
