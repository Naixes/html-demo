// GC
function Sin(name) {
	this.name = name
}

// 在M 

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

// ==========================================================

function test() {
	var a = "yideng";
	return function () {
		// eval：可以欺骗此法作用域，不会对词法作用域的任何变量解除绑定，即就算没有引用，也不会被回收，因为里面是字符串，浏览器不知道里面是否有引用
		eval("");
	}
}
test()();