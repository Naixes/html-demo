<?php
class myException extends Exception{
	public function getAllInfo() {
		return "错误文件为：{$this->getFile()}，错误行数为：{$this->getLine()}，错误代码为：{$this->getCode()}，错误信息为：{$this->getMessage()}";
	}
}
try{
	$num = 3;
	if($num === 1) {
		echo "success";
	}elseif($num === 3){
		throw new myException("num不应该等于3");
	}elseif($num === 4){
		throw new Exception("num不应该等于4");
	}
	// 可捕获多个不同类型的异常，注意顺序
}catch(myException $e){
	echo $e->getAllInfo();
}catch(Exception $e){
	echo $e->getMessage();
}
?>