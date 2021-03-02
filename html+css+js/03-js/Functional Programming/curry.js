// 柯里化
function curry(targetfn) {
    var numOfArgs = targetfn.length;
    // console.log('numOfArgs', numOfArgs);
    return function fn(...rest) {
        // console.log('...rest', ...rest);
        if (rest.length < numOfArgs) {
            // 缓存参数
            return fn.bind(null, ...rest);
        } else {
            return targetfn.apply(null, rest);
        }
    };
  }
  // 加法函数
  function add(a, b, c, d) {
    return a + b + c + d;
  }
  // 将一个多参数函数转化为多个嵌套的单参数函数
  console.log("柯里化：", curry(add)(1)(2)(3)(4));
  // 柯里化：10