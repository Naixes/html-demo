Object.prototype.a = 'a';
Function.prototype.a = 'a1';
function Person() { };

var yideng = new Person();
console.log('p.a: ' + yideng.a); // a，找yideng.__proto__.__proto__ = Object.prototype
console.log(1..a); // a
console.log(1.a); // 1.a会报错，因为不确定.的归属
console.log(yideng.__proto__.__proto__.constructor.constructor.constructor); // yideng._proto_._proto_ = Object.prototype