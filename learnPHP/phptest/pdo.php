<?php
header("Content-type:text/html;charset=utf-8");
$dbms='mysql';     //数据库类型
$host='localhost'; //数据库主机名
$dbName='phptest';    //使用的数据库
$user='root';      //数据库连接用户名
$pass='';          //对应的密码
$dsn="$dbms:host=$host;dbname=$dbName";

try {
    $dbh = new PDO($dsn, $user, $pass); //初始化一个PDO对象
    echo "连接成功<br/>";
    // 你还可以进行一次搜索操作
    foreach ($dbh->query('SELECT * from news') as $row) {
        print_r($row); //你可以用 echo($GLOBAL); 来看到这些值
    }

    // 插入一个值
    $query= "INSERT INTO news (newstitle, newsimg, newscontent, newsdate) VALUES ('title', 'http://xxx', 'con', '2020-02-20')";
    // echo $query;
    $res = $dbh->exec($query);
    echo $res;
    echo "<br/>受影响行数" . $res;
    $dbh = null;
} catch (PDOException $e) {
    die ("Error!: " . $e->getMessage() . "<br/>");
}
//默认这个不是长连接，如果需要数据库长连接，需要最后加一个参数：array(PDO::ATTR_PERSISTENT => true) 变成这样：
$db = new PDO($dsn, $user, $pass, array(PDO::ATTR_PERSISTENT => true));
?>