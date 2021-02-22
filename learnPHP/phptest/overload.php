<?php
	class Person {
		public $name;
		private $age;
		protected $money;

		// 构造函数：new的时候执行
		public function __construct($name, $age, $money) {
			$this->name = $name;
			$this->age = $age;
			$this->money = $money;
		}

		public function getSex($name) {
			echo "unknow";
		}
	}

	class Man extends Person{
		public $sex;

		public function __construct($name, $age, $money) {
			parent::__construct($name, $age, $money);
			$this->sex = "man";
		}

		// php重如果写同样的名称就是重写和参数无关，5.4以后需要与父类参数个数一致否则会报警告
		public function getSex($name) {
			// php实现重载
			parent::getSex($name);
			echo "{$name} is {$this->sex}";
		}
		public function getMoney() {
			echo "{$this->name} has {$this->money}";
		}
	}

	$man1 = new Man('jack', 18, 200);
	// 参数不对会报错
	// $man1->getSex();
	$man1->getSex('jack');
	$man1->getMoney();
?>