<?php
header('Content-Type:text/event-stream;charset=utf-8');
header('Access-Control-Allow-Origin:http://127.0.0.1/');
// 每一次 echo 的内容，都必须是如下格式：field: value并且最后必须加\n\n，否则不会触发事件
// field 可以是 data, event, id, retry 这四个中的任意一个
// value 为数据有效载荷
echo "data:现在的时间".date('H:i:s')."\n\n";
?>