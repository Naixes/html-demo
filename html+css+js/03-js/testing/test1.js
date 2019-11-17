// console.log(a); // undefined
// var flag = true;
// if (!flag) {
// 	var a = 1;
// }

// ==============================================

console.log(typeof yideng()); // 3. 报错：not function
// yideng() // 2. 报错：not function

var flag = true;
if (flag) {
	function yideng(a) {
		yideng = a;
		console.log("yideng1");
	}
} else {
	function yideng(a) {
		yideng = a;
		console.log("yideng2");
	}
}

// yideng() // 1. yideng1

// ================================================


// function yideng(a) {
// 	yideng = a;
// 	console.log("yideng3");
// }

// function init() {
// 	// 提升到函数作用域
// 	var flag = false;
// 	if (flag) {
// 		function yideng(a) {
// 			yideng = a;
// 			console.log("yideng1");
// 		}
// 	}
// 	yideng() // 报错：not function
// }

// init()