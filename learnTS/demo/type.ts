// 基本类型
// 布尔值
let isDone: boolean = false

// 数值
let decLiteral: number = 20
let hexLiteral: number = 0x14
let binaryLiteral: number = 0b10100
let octalLiteral: number = 0o24

// 字符串
let str: string = 'aaa'

// 数组
let list: number[] = [1, 2, 3, 4]
// 数组泛型
// let list: Array<number> = [1, 2, 3, 4]

// 元祖：指定类型和数量，越界赋值会报错（老版本3.1之前不会）
let x: [string, number] = ['aaa', 1 ]

// 枚举
enum Color {
		Red,
		Green = 0,
		Blue
}

let c: Color = Color.Green
let cName: string = Color[1]
console.log(cName)

// any
let notSure: any = 4
notSure = 'aaa'
let arr: any[] = [1, 'aaa', false]

// void
function handler(): void {
	console.log('hello')
}

// null
let n: null = null
// 子类型可以赋值给父类型，--strictNullChecks  严格模式下编译不通过：
// Type 'null' is not assignable to type 'undefined'.
n = undefined

// undefined
let u: undefined = undefined
u = null

// never：不能返回的，不能结束的，报错的，是任何类型的子类型
function error(message: string): never {
	throw new Error(message)
}
function fail() {
	return error('something failed')
}

function infiniteLoop(): never {
	while(true) {

	}
}

// object：非原始类型
// declare function create(o: object | null): void
// 规定数量和类型
declare function create(o: {prop: number} | null): void
create({prop: 0})

// 类型断言
let some: any = 'string'
// 强制转换
// let strLength: number = (<string>some).length
let strLength: number = (some as string).length


