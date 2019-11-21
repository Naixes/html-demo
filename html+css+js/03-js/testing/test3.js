// GC
function Sin(name) {
	this.name = name
}

// 在Memory中使用快照，过滤sin查看引用情况

// 闭包
let SinFactory = function (name) {
	let s3 = new Sin(name)
	return function () {
		console.log(s3)
	}
}
let s3 = SinFactory()
s3()
// 此时还是可以看到Sin的引用，但是没有了到根节点的距离了
// 闭包是存在堆区的
s3 = null


function test() {
	var a = "yideng";
	return function () {
		// 1. eval：可以欺骗此法作用域，不会对词法作用域的任何变量解除绑定，即就算没有引用，也不会被回收，因为里面是字符串，浏览器不知道里面是否有引用
		eval("");
	}
}
test()();

var obj = {}
// 2. with会放弃所有变量回收
with (obj) {
	a = 1
}
console.log(obj.a) // undefined
console.log(a) // 1

function init() {
	var a = 30
	// 3. new Function 绑定全局作用域
	var s = new Function('console.log(a)')
	s()
}
init() // 20

function init() {
	var a = 30
	var s = new Function(console.log(a))
	s()
}
init() // 30

// 4. try-catch 的 catch 也欺骗了此法作用域（e）