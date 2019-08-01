// 交换数组指定位置元素：
// 例如： [1 ,2, 3, 4] ===> [1, 2, 4, 3]
function arrIndexExchange(array, x, y){
    array.splice(x - 1, 1, ...array.splice(y - 1, 1, array[x - 1]));
    return array;
};