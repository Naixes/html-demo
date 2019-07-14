class Greeter {
	greeting: string
	constructor(msg: string) {
		this.greeting = msg
	}
	greet() {
		return `hello ${this.greeting}`
	}
}
let greeter = new Greeter('word')
greeter.greet()

// 继承
class Animal {
	name: string
	// 私有成员：不能在外部（实例）使用，包括子类
	// private age: number
	// 保护成员：不能在外部（实例）使用，不包括子类
	// protected age: number
	// readonly：只读修饰符
	// readonly age: number

	// 构造函数也可以加protected
	// protected constructor(name: string, age: number) {
	// 参数属性（给构造函数参数前加访问限定符来声明），readonly也可以直接写到这里，创建和初始化
	constructor(name: string, readonly age: number) {
		this.name = name 
		// this.age = age 
	}
	move(dis: number = 0) {
		console.log(`${this.name} moved ${dis}m`)
	}
}
class Dog extends Animal{
	bark() {
		console.log('www')
	}
}
let dog = new Dog('hh', 2)
dog.bark()
dog.move(10)

class Snake extends Animal {
	constructor(name: string, age: number) {
		// 写在最前面
		super(name, age)
	}
	move(dis: number = 5) { 
		console.log('sss')
		super.move(dis)
	}
}

let snake = new Snake('ss', 3)
snake.move(20)

class Rhino extends Animal {
	constructor() {
		super('Rhino', 3)
	}
}

class Employee {
	name: string
	private age: number
	constructor(name: string, age: number) {
		this.name = name
		this.age = age
	}
}

let animal = new Animal('aa', 4)
let rhino = new Rhino()
let employee = new Employee('ee', 6)

animal = rhino
// animal = employee

// 存取器
class Person {
	private _fullNme: string
	get fullName(): string {
		return this._fullNme
	}
	set fullNmae(newName: string) {
		this._fullNme = newName
	}
}
// 编译不通过时 --target es5

// 静态属性
class Grid {
	static origin = {x: 0, y: 0}
	scale: number
	constructor(scale: number) {
		this.scale = scale
	}
	calculateDistanceFromOrigin(point: {x: number, y: number}) {
		let xDist = point.x - Grid.origin.x
		let yDist = point.y - Grid.origin.y
		return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale
	}
}

let grid = new Grid(1)
console.log(grid.calculateDistanceFromOrigin({x: 3, y: 4}))

