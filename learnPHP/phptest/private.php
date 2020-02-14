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

		// 魔术方法：只适用于私有或保护
		
		public function __get($key) {
			// if($key === 'age') {
			// 	return $this->age;
			// }
			return $this->$key;
		}

		public function __set($key, $value) {
			if($key === 'money') {
				echo "ok";
				$this->money = $value;
			}
		}

		// 判断时触发
		public function __isset($key) {
			if($key === 'money') {
				return true;
			}
		}

		// 删除属性时触发
		public function __unset($key) {
			if($key === 'money') {
				unset($this->money);
			}
		}
	}

	$p1 = new Person('a', 18, 10);
	echo $p1->name;
	echo $p1->age;
	$p1->money = 20;
	echo $p1->money;
	// 显示关于一个或多个表达式的结构信息，包括表达式的类型与值。数组将递归展开值，通过缩进显示其结构。
	var_dump(isset($p1->money));
	// isset：私有会返回false
	var_dump(isset($p1->age));
	unset($p1->money);
	echo $p1->money;
?>