// 类
class User {
	fullName: string
	firstName: string
	lastName: string

	constructor(firstName, lastName) {
		this.firstName = firstName
		this.lastName = lastName
		this.fullName = `${firstName} ${lastName}`
	}
}

//  接口
interface Person {
	firstName: string
	lastName: string
}

//  类型注解，参数类型及个数
 function greeter(person: Person) {
	 return `hello ${person.firstName}${person.lastName}`
 }

//  let user: Person = {
// 	 firstName: 'S',
// 	 lastName: 'in'
//  }

let user = new User('S', 'in')

 console.log(greeter(user))


