const compose = (f, g) => (x => f(g(x)));
var first = arr => arr[0];
var reverse = arr => arr.reverse();

var last = compose(first, reverse);
console.log(last([1,2,3,4,5]))

// // 函数的合成还必须满足结合律。
// compose(f, compose(g, h))
// // 等同于
// compose(compose(f, g), h)
// // 等同于
// compose(f, g, h)