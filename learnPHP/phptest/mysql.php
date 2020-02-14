<?php
// Create connection
$con=mysqli_connect("localhost","root","","php_test");

// Check connection
if (!$con)
{
	// .连接字符串
	die("Failed to connect to MySQL: " . mysqli_connect_error());
}else {
	$result = mysqli_query($con,"INSERT INTO user (username, password, account, id)
	VALUES ('admin', '123', 'root', 001)");
	if(!$result) {
		die('Error:' . mysql_error());
	}else {
		echo 'ok';
	}
}
?>