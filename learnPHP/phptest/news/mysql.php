<?php
// header("Content-type:text/html;charset=utf-8");
// Create connection
$con=mysqli_connect("localhost","root","","phptest");

// Check connection
if (!$con)
{
	// .连接字符串
	die("Failed to connect to MySQL: " . mysqli_connect_error());
}else {
    // mysqli_query($con,"set names 'utf8'");

    // // 添加数据
	// $title = $_REQUEST['newstitle'];
	// $img = $_REQUEST['newsimg'];
	// $content = $_REQUEST['newscontent'];
	// $addtime = $_REQUEST['newsdate'];
	// // $result = mysqli_query($con,"INSERT INTO news (newstitle, newsimg, newscontent, newsdate) VALUES ('tit', 'png', '内容', '2020-02-20')");
    // $sql = "INSERT INTO news (newstitle, newsimg, newscontent, newsdate) VALUES ('" . $title . "','" . $img . "','" . $content . "','" . $addtime . "')"
	// $result = mysqli_query($con,$sql);
	// if(!$result) {
	// 	die('Error:' . mysqli_error($con));
	// }else {
	// 	echo 'ok';
	// }

    // 查询数据
    $sql = "SELECT * FROM news";
	$result = mysqli_query($con,$sql);
    if ($result->num_rows > 0) {
        $results = array();
        // 输出数据
        while($row = $result->fetch_assoc()) {
            // echo $row["newstitle"]. " - newstitle: " . $row["newsimg"]. " " . $row["newscontent"] . $row["newsdate"] . "<br>";
            array_push($results, array("newstitle"=>$row["newstitle"], "newsimg"=>$row["newsimg"], "newscontent"=>$row["newscontent"], "newsdate"=>$row["newsdate"]));
        }
        $result = array("errcode"=>0, "results"=>$results);
        // JSON_UNESCAPED_UNICODE：json_encode不要unicode编码
        echo json_encode($result, JSON_UNESCAPED_UNICODE);
    } else {
        echo "0 结果";
    }

	mysqli_close($con);
}
?>