// 类
var User = /** @class */ (function () {
    function User(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + " " + lastName;
    }
    return User;
}());
//  类型注解，参数类型及个数
function greeter(person) {
    return "hello " + person.firstName + person.lastName;
}
//  let user: Person = {
// 	 firstName: 'S',
// 	 lastName: 'in'
//  }
var user = new User('S', 'in');
console.log(greeter(user));
