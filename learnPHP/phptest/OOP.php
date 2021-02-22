<?php
	class Person {
		// 构造函数：new的时候执行
		public function __construct($age) {
			$this->age = $age;
		}
		// 析造函数：对象毁时执行
		public function __destruct() {
			// 可以进行资源的释放，数据库关闭，读取文件关闭
      		// 对象被销毁时执行，即没有代码要执行时
			echo "bye" . $this->ag;
			// 另一种连接字符串的方式
			// echo "bye {$this->age}";
		}
		public function getAge() {
			return $this->age;
		}
	}

	$p1 = new Person(30);
	$p2 = new Person(20);
	echo $p1->getAge();
?>