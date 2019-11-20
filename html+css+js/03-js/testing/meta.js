// 1 Symbol.toPrimitive

let obj = {
	// 对象的Symbol.toPrimitive属性。指向一个方法。该对象被转化为原始类型的值时，会调用这个办法，返回该对象对应的原始类型值。
	[Symbol.toPrimitive](hint) {
		console.log(hint)
		switch (hint) {
			case "number":
				return 123;
			case "string":
				return "str";
			case "default":
				return "default";
		}
	}
}
console.log(1 + obj) // 1default
console.log(2 * obj) // 246
console.log(1 + String(obj)) // 1str

// ===========================================
// 3 + obj;
let yideng = {
	[Symbol.toPrimitive]: ((i) => () => ++i)(0)
}
// 3 + obj;
if (yideng == 1 && yideng == 2 && yideng == 3) {
	console.log("sin");
}

// 2 tco

//TCO 直接支持浏览器的TCO
function factorial(n, total = 1) { 
 if (n === 1) return total;
 return factorial(n - 1, n * total);
 TCO_ENABLED = true;
}

factorial(3)

// 3 proxy
let laoyuan = {
	age: 30
}
const validator = {
	set(target, key, value) {
		if (typeof value != "number" || Number.isNaN(value)) {
			throw new Error("年龄得是数字");
		}
	}
}
const proxy = new Proxy(laoyuan,validator);
proxy.age = "sin";

// 4 反射
require("reflect-metadata")
class C {
	// @Reflect.metadata(metadataKey, metadataValue)
	method() {
	}
}
Reflect.defineMetadata("sin", "🌶  🌰", C.prototype, "method");

let metadataValue = Reflect.getMetadata("sin", C.prototype, "method");
console.log(metadataValue);