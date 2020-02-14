<?php
// 设置报头
// header("Content-type:text/html;charset=utf-8");
header("Content-type:text/json;charset=utf-8");
$username = $_REQUEST['username'];
// $username = $_GET['username'];
// $username = $_POST['username'];
if($username === 'admin') {
	echo json_encode(array('msg'=>'登陆成功','code'=>"200"));
}else {
	echo json_encode(array('msg'=>'登陆失败','code'=>"500"));
}
?>