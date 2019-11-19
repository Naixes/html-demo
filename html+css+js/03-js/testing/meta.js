// 1 Symbol.toPrimitive

// let obj = {
//     // 对象的Symbol.toPrimitive属性。指向一个方法。该对象被转化为原始类型的值时，会调用这个办法，返回该对象对应的原始类型值。
//     [Symbol.toPrimitive](hint) {
//         console.log(hint)
//         switch (hint) {
//             case "number":
//                 return 123;
//             case "string":
//                 return "str";
//             case "default":
//                 return "default";
//         }
//     }
// }
// console.log(1 + obj) // 1default

// // ===========================================
// // 3 + obj;
// let yideng = {
//     [Symbol.toPrimitive]: ((i) => () => ++i)(0)
// }
// // 3 + obj;
// if (yideng == 1 && yideng == 2 && yideng == 3) {
//     console.log("sin");
// }

// 2 tco

//TCO 直接支持浏览器的TCO
function test(i){
    return test(i--,i)
    TCO_ENABLED = true;
}
test(5);

// 3 proxy
let laoyuan = {
    age: 30
}
const validator = {
    set(target,key,value){
        if(typeof value!="number" || Number.isNaN(value)){
            throw new Error("年龄得是数字");
        }
    }
}
const proxy = new Proxy(laoyuan,validator);
proxy.age = "京程一灯";

// 4 反射
require("reflect-metadata")
class C {
    // @Reflect.metadata(metadataKey, metadataValue)
    method() {
    }
}
Reflect.defineMetadata("yideng", "🌶  🌰", C.prototype, "method");

let metadataValue = Reflect.getMetadata("yideng", C.prototype, "method");
console.log(metadataValue);