<?php
	// 接口中的方法都是抽象的
	// 接口中可以声明常量
	interface Action {
		const NAME = 'jack';
		public function run();
		public function eat();
	}
	interface Study {
		public function study();
	}

	// 抽象类中也可以有普通方法
	abstract class Person implements Action, Study {
		const PI = 3.14;
		// public abstract function eat();
		// public abstract function run();
		// public abstract function study();
	}

	class Student extends Person {
		const PI = 3.14;
		public function eat() {
			echo "eat";
		}
		public function run() {
			echo "run";
		}
		public function study() {
			echo "study";
		}
		// 静态方法
		public static function getPI() {
			// self指向当前类
			echo self::PI;
		}
	}

	$stu1 = new Student();
	$stu1->eat();
	$stu1->run();
	$stu1->study();
	// 获取常量，执行静态方法
	Student::getPI();
	echo Action::NAME;
	echo Person::PI;
	echo Student::PI;
?>