<?php
// Create connection
$con=mysqli_connect("localhost","root","","php_test");

// Check connection
if (!$con)
{
	// .连接字符串
	die("Failed to connect to MySQL: " . mysqli_connect_error());
}else {
	$title = $_REQUEST['newstitle'];
	$img = $_REQUEST['newsimg'];
	$content = $_REQUEST['newscontent'];
	$addtime = $_REQUEST['newsdate'];
	// $result = mysqli_query($con,"INSERT INTO news (title, img, content, addtime) VALUES ('tit', 'png', '内容', '2020-02-20')");
	$result = mysqli_query($con,"INSERT INTO news (title, img, content, addtime) VALUES ('" . $title . "','" . $img . "','" . $content . "','" . $addtime . "')");
	if(!$result) {
		die('Error:' . mysqli_error($con));
	}else {
		echo 'ok';
	}
	mysqli_close($con);
}
?>