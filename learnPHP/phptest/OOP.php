<?php
	class Person {
		// 构造函数：new的时候执行
		public function __construct($age) {
			$this->age = $age;
		}
		// 对象毁时执行
		public function __destruct() {
			// 可以进行资源的释放，数据库关闭，读取文件关闭
			echo "bye" . $this->ag
		// 析造函数：对象销e;
			echo "bye {$this->age}";
		}
		public function getAge() {
			return $this->age;
		}
	}

	$p1 = new Person(30);
	$p2 = new Person(20);
	echo $p1->getAge();
?>