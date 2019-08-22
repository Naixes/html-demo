
// 游戏对象
(function () {
  function Game() {
  }
  Game.prototype = {
    constructor: Game,
    // 初始化游戏
    init: function (map) {
      var snake = new Snake()
      var food = new Food()

      food.init(map)
      snake.init(map)
      this.bindKey(snake)
      this.runSnake(snake, map, food)
    },
    runSnake: function (snake, map, food) {
      // 获取最大坐标
      var maxX = map.offsetWidth/snake.width
      var maxY = map.offsetHeight/snake.height
      var intervalId = setInterval(function () {
        snake.move(map, food)
        // 获取蛇头的坐标
        var snakeX = snake.body[0].x
        var snakeY = snake.body[0].y
        if(snakeX >= maxX || snakeY >= maxY || snakeX < 0 || snakeY < 0) {
          clearInterval(intervalId)
          alert('游戏结束')
        }
      }, 150)
    },
    // 绑定方向键
    bindKey: function (snake) {
      document.addEventListener('keydown', function (e) {
        // console.log(e.keyCode)
        switch(e.keyCode) {
          case 37: snake.direction = 'left'; break
          case 38: snake.direction = 'up'; break
          case 39: snake.direction = 'right'; break
          case 40: snake.direction = 'down'; break
        }
        // console.log(snake.direction)
      }, false)
    }
  }
  window.Game = Game
}())
