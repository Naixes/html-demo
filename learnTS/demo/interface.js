create({ prop: 0, num: 2 });
function createSquare(config) {
    // 应用：对属性进行预定义
    var newSquare = { color: 'white', area: 100 };
    // 可以防止拼写错误
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
// 额外属性检查：利用字面量传递属性有额外属性时会报错（现在又不报了，可能是版本的不同），可以不使用字面量或者属性断言，不推荐，可以使用索引签名
var mySquare = createSquare({ color: 'black', height: 200 });
var p1 = { x: 10, y: 10 };
// p1.x = 0
// 泛型只读数组
var a = [1, 2, 3];
var ro = a;
// ro[0] = 0
