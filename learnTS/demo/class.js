var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Greeter = /** @class */ (function () {
    function Greeter(msg) {
        this.greeting = msg;
    }
    Greeter.prototype.greet = function () {
        return "hello " + this.greeting;
    };
    return Greeter;
}());
var greeter = new Greeter('word');
greeter.greet();
// 继承
var Animal = /** @class */ (function () {
    // 私有成员：不能在外部（实例）使用，包括子类
    // private age: number
    // 保护成员：不能在外部（实例）使用，不包括子类
    // protected age: number
    // readonly：只读修饰符
    // readonly age: number
    // 构造函数也可以加protected
    // protected constructor(name: string, age: number) {
    // 参数属性（给构造函数参数前加访问限定符来声明），readonly也可以直接写到这里，创建和初始化
    function Animal(name, age) {
        this.age = age;
        this.name = name;
        // this.age = age 
    }
    Animal.prototype.move = function (dis) {
        if (dis === void 0) { dis = 0; }
        console.log(this.name + " moved " + dis + "m");
    };
    return Animal;
}());
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dog.prototype.bark = function () {
        console.log('www');
    };
    return Dog;
}(Animal));
var dog = new Dog('hh', 2);
dog.bark();
dog.move(10);
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name, age) {
        // 写在最前面
        return _super.call(this, name, age) || this;
    }
    Snake.prototype.move = function (dis) {
        if (dis === void 0) { dis = 5; }
        console.log('sss');
        _super.prototype.move.call(this, dis);
    };
    return Snake;
}(Animal));
var snake = new Snake('ss', 3);
snake.move(20);
var Rhino = /** @class */ (function (_super) {
    __extends(Rhino, _super);
    function Rhino() {
        return _super.call(this, 'Rhino', 3) || this;
    }
    return Rhino;
}(Animal));
var Employee = /** @class */ (function () {
    function Employee(name, age) {
        this.name = name;
        this.age = age;
    }
    return Employee;
}());
var animal = new Animal('aa', 4);
var rhino = new Rhino();
var employee = new Employee('ee', 6);
animal = rhino;
// animal = employee
// 存取器
var Person = /** @class */ (function () {
    function Person() {
    }
    Object.defineProperty(Person.prototype, "fullName", {
        get: function () {
            return this._fullNme;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Person.prototype, "fullNmae", {
        set: function (newName) {
            this._fullNme = newName;
        },
        enumerable: true,
        configurable: true
    });
    return Person;
}());
// 编译不通过时 --target es5
// 静态属性
var Grid = /** @class */ (function () {
    function Grid(scale) {
        this.scale = scale;
    }
    Grid.prototype.calculateDistanceFromOrigin = function (point) {
        var xDist = point.x - Grid.origin.x;
        var yDist = point.y - Grid.origin.y;
        return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale;
    };
    Grid.origin = { x: 0, y: 0 };
    return Grid;
}());
var grid = new Grid(1);
console.log(grid.calculateDistanceFromOrigin({ x: 3, y: 4 }));
