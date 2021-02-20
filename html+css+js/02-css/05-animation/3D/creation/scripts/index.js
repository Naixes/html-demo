var container = document.getElementById('container')
var box = document.getElementById('box')
var arr = box.getElementsByTagName('div')
var radius = calculateRadius(129, 20)
var audio = document.getElementById('audio')

for (var i = 0; i < arr.length; i++) {
  arr[i].style.background = 'url(./img/p' + (i + 1) + '.png) no-repeat'
  arr[i].style.WebkitTransform = 'rotateY('+ 360/arr.length * i +'deg) translatez(' + radius + 'px)'
}

function calculateRadius(length, totalNum) {
  // -3 是为了去白边
  return Math.round(length / (2 * Math.tan(Math.PI / totalNum))) - 3
}

$('#laba').on('tap', function(e) {
	if (audio.paused) {
		audio.play()
		$('#laba').text('🎺')
	} else {
		audio.pause()
		$('#laba').text('⏸')
	}
})
// 标记是否手动转
var flag = true
var startX = 0,
    x = 0,
    endX = 0

$('#box').on('touchstart', function (e) {
  e.preventDefault()
  var touch = event.targetTouches[0]
  startX = touch.pageX - x
})

$('#box').on('touchmove', function (e) {
  if (flag) {
    e.preventDefault()
    var touch = event.targetTouches[0]
    endX = touch.pageX
    x = endX - startX
    box.style.transform = 'rotateY('+ x +'deg)'
  } else {
    return false
  }
  
})

$('#box').on('touchend', function (e) {
  console.log('touchend over')
})

window.addEventListener('deviceorientation', function (e) {
  var gamma = e.gamma
  if (Math.abs(gamma) > 1) {
    flag = false
    box.style.transform = 'rotateY('+ gamma +'deg)'
  } else {
    flag = true
  }
})