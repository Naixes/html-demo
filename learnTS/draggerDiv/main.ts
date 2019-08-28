let div = document.createElement('div')
div.style.border = '1px solid red'
div.style.width = '100px'
div.style.height = '100px'
div.id = 'box'

document.body.appendChild(div)

// 开关
let flag = false

// 初始化鼠标位置
let position = [0, 0]

document.onmousedown = (e) => {
	flag = true
	position = [e.clientX, e.clientY]
}

document.onmousemove = (e) => {
	// 鼠标位置
	// console.log(e.clientX, e.clientY)
	if(flag) {
		let disX = e.clientX - position[0]
		let disY = e.clientY - position[1]
		// 有可能值是auto，!表示不会为空
		let top = parseInt(div.style.top!) || 0
		let left = parseInt(div.style.left!) || 0
		// 移动相对位置
		div.style.top = top + disY + 'px'
		div.style.left = left + disX + 'px'
		// 重置鼠标位置
		position = [e.clientX, e.clientY]
	}
}

document.onmouseup = () => {
	flag = false
}