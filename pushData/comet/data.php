<?php
	// header("Content-type:appliacation/json;charset=utf-8");
	// 后端输出不缓存
	header("Cache-Control:max-age=0");

	// 以下代码可以完成定时向客户端推送数据

	// 方式1：需要前端在第三阶段捕获数据
	$i = 0;
	while($i < 9) {
		$i++;
		sleep(1);
		echo rand(1, 999);
		echo "<br/>";
		// $j = array("success"=>"ok", "text"=>"测试文本");
		// echo json_encode($j);
		// 刷新输出缓存区内容，在调用ob_flush()之后缓冲区内容将被丢弃
		ob_flush();
		// 将当前为止程序的所有输出发送到用户的浏览器。在3阶段可以捕捉到
		// flush() 函数不会对服务器或客户端浏览器的缓存模式产生影响。因此，必须同时使用 ob_flush() 和flush() 函数来刷新输出缓冲。
		flush();
	}
	
	// 方式2：需要前端递归调用请求方法
	sleep(1);
	echo rand(1, 999);
	echo "<br/>";

	// 方式3：可以在后台控制结束条件
	$i = 0;
	while($i < 9) {
		$i++;
		sleep(1);
		echo rand(1, 999);
		exit()
	}
?>