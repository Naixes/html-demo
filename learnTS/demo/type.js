// 基本类型
// 布尔值
var isDone = false;
// 数值
var decLiteral = 20;
var hexLiteral = 0x14; // 16进制
var binaryLiteral = 20; // 2进制
var octalLiteral = 20; // 8进制
// 字符串
var str = 'aaa';
// 数组
var list = [1, 2, 3, 4];
// 数组泛型
// let list: Array<number> = [1, 2, 3, 4]
// 元祖：指定类型和数量，越界赋值会报错（老版本3.1之前不会）
var x = ['aaa', 1];
// 枚举
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 0] = "Green";
    Color[Color["Blue"] = 1] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
var cName = Color[1];
console.log(cName);
// any
var notSure = 4;
notSure = 'aaa';
var arr = [1, 'aaa', false];
// void
function handler() {
    console.log('hello');
}
// null
var n = null;
// 子类型可以赋值给父类型，--strictNullChecks  严格模式下编译不通过：
// Type 'null' is not assignable to type 'undefined'.
n = undefined;
// undefined
var u = undefined;
u = null;
// never：不能返回的，不能结束的，报错的，是任何类型的子类型
function error(message) {
    throw new Error(message);
}
function fail() {
    return error('something failed');
}
function infiniteLoop() {
    while (true) {
    }
}
// 联合类型
var numberOrString;
numberOrString = 2;
// object：非原始类型
// declare function create(o: object | null): void
// 规定数量和类型
// declare function create(o: {prop: number} | null): void
// create({prop: 0})
// 类型断言
var some = 'string';
// 强制转换
// let strLength: number = (<string>some).length
var strLength = some.length;
var fibonacci = [1, 1, 2, 3, 5];
console.log(fibonacci.length);
