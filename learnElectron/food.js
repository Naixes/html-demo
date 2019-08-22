
// 食物对象
(function () {
  // 存储所有食物的数组
  var foods = []
  // 食物对象构造函数
  function Food(mapX, mapY, width, height, color) {
    this.mapX = mapX || 0
    this.mapY = mapY || 0
    this.width = width || 20
    this.height = height || 20
    this.color = color || '#ff6c85'
  }
  Food.prototype = {
    constructor: Food,
    // 初始化食物位置
    init: function (map) {
      // 先删除所有食物
      deleteAll()
      var food = document.createElement('div')

      this.mapX = parseInt(Math.random()*map.offsetWidth/this.width)*this.width
      this.mapY = parseInt(Math.random()*map.offsetHeight/this.height)*this.height

      food.style.position = 'absolute'
      food.style.height = this.height + 'px'
      food.style.width = this.width + 'px'
      food.style.left = this.mapX + 'px'
      food.style.top = this.mapY + 'px'
      food.style.backgroundColor= this.color
      // console.log(food.style) // CSSStyleDeclaration
      
      map.appendChild(food)
      foods.push(food)

      // 私有函数
      function deleteAll() {
        for (var i = 0; i < foods.length; i++) {
            foods[i].parentNode.removeChild(foods[i])
            foods.splice(i, 1)
        }
      }
    }
  }
  // 获得Food构造函数的结构
  var food = new Food()
  console.dir(Food)
  console.dir(food)
  window.Food = Food
}())
