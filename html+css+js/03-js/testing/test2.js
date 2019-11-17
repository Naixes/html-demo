// function fn() {
// 	// "use strict"; // 2. 对this起作用
// 	console.log(this.length);
// }
// var yideng = {
// 	length: 5,
// 	method: function () {
// 		// 对this不起作用
// 		"use strict"; // 1. this还是window，注意分清位置
// 		fn(); // window.length
// 		// arguments.fn()
// 		// console.log(arguments)
// 		arguments[0]() // 2：参数个数
// 	}
// }
// // 忽略this的指定
// const result = yideng.method.bind(null);
// result(fn, 1);

// =======================================================

function yideng(a, b, c) {
	console.log(this.length);
	console.log(this.callee.length); // this.callee = fn
}
function fn(d) {
	// arguments.yideng(....)
	arguments[0](10, 20, 30, 40, 50); // 4, 1
}
fn(yideng, 10, 20, 30);
