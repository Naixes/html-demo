<?php
try{
	$num = 2;
	if($num === 1) {
		echo "success";
	}else{
		throw new Exception("num应该等于1");
	}
}catch(Exception $e){
	echo "错误文件为：";
	echo $e->getFile();
	echo "错误行数为：";
	echo $e->getLine();
	echo "错误代码为：";
	echo $e->getCode();
	echo "错误信息为：";
	echo $e->getMessage();
}
?>