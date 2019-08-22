
// 蛇对象
(function () {
  // 存储所有蛇
  var snakes = []
  // 蛇对象构造函数
  function Snake(width, height, direction) {
    this.width = width || 20
    this.height = height || 20
    
    this.body = [
      {x: 3, y: 2, color: 'red'},
      {x: 2, y: 2, color: '#ff6c85'},
      {x: 1, y: 2, color: '#ff6c85'},
    ]

    this.direction = 'right'
  }
  Snake.prototype = {
    constructor: Snake,
    // 初始化蛇的位置
    init: function (map) {
      // 删除之前初始化的蛇
      deleteAll()
      var i = 0
      var snake = document.createElement('div')
      for(; i<this.body.length; i++) {
        var body = document.createElement('div')

        body.style.position = 'absolute'
        body.style.left = this.body[i].x * this.width + 'px'
        body.style.top = this.body[i].y * this.height + 'px'
        // 注意是backgroundColor不是color
        body.style.backgroundColor = this.body[i].color
        body.style.width = this.width+'px'
        body.style.height = this.height+'px'
        snake.appendChild(body)
      }
      // 在循环外部操作节点
      map.appendChild(snake)
      snakes.push(snake)

      function deleteAll() {
        for(i=0; i<snakes.length; i++) {
          snakes[i].parentNode.removeChild(snakes[i])
          snakes.splice(i, 1)
        }
      }
    },
    move: function (map, food) {
      var i = this.body.length - 1 
      // 改变身体的位置
      for(; i>0; i--) {
        this.body[i].x = this.body[i-1].x
        this.body[i].y = this.body[i-1].y
      }
      console.log(this.direction)
      // 改变头部的位置
      switch(this.direction) {
        case 'right': 
          this.body[0].x ++
          break
        case 'left': 
          this.body[0].x --
          break
        case 'up':
          this.body[0].y --
          break
        case 'down':
          this.body[0].y ++
          break
      }
      // 判断蛇与食物的位置是否相同
      // 获取蛇头的位置
      var headX = this.body[0].x*this.width
      var headY = this.body[0].y*this.height
      // 判断
      if(headX == food.mapX && headY == food.mapY) {
        // 复制蛇尾
        // 获取蛇尾
        var lastBody = this.body[this.body.length - 1]
        this.body.push({
          x: lastBody.x,
          y: lastBody.y,
          color: lastBody.color
        })
        // 初始化食物的位置
        food.init(map)
      }
      this.init(map)
    }
  }
  window.Snake = Snake
}())
