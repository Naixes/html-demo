<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>PHP</title>
</head>
<body>
	<?php
	// 可以在这里编写逻辑控制页面显示
	// 结尾必须加分号
	// 在屏幕打印
	echo "hello php ";

	// 变量

	// 以$开头；块级作用域
	$a = "变量a ";
	echo $a;
	// 判断变量是否被声明
	echo isset($a);
	// 方法中不能访问到外部变量
	$b = "变量b";
	// 引入模块
	// 引入出错后不会执行后面的代码
	require_once('modulea.php');
	// 引入出错后会执行后面的代码
	// include_once('modulea.php');
	function testb() {
		// 报错
		echo $b;
		// 将b变为全局
		global $b;
		echo $b;
		// 输出其他模块变量
		echo $GLOBALS['c'];
	}
	testb();

	// 数组

	$arrayTest = array(0=>"苹果", 1=>"测试");
	echo json_encode($arrayTest);
	echo $arrayTest[0];

	// session 

	// 会话存储
	session_start(); 
	$_SESSION['views'] = 'home';
	echo $_SESSION['views'];
	?>
	<form action="submit.php" method="get">
		<p>
			<label for="username">账号</label>
			<input type="text" name="username">
		</p>
		<p>
			<label for="password">密码</label>
			<input type="password" name="password">
		</p>
		<input type="submit" value="提交">
	</form>
</body>
</html>