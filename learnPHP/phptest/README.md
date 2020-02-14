### php
xampp打开apache web server服务

在应用文件夹(htdocs)中新建项目文件夹，新建index.php(默认的首页)，浏览器输入localhost/项目文件夹名称即可显示首页

### mysql
xampp打开mysql服务
打开服务失败
```
17:51:47  [mysql] 	Error: MySQL shutdown unexpectedly.
17:51:47  [mysql] 	This may be due to a blocked port, missing dependencies, 
17:51:47  [mysql] 	improper privileges, a crash, or a shutdown by another method.
17:51:47  [mysql] 	Press the Logs button to view error logs and check
17:51:47  [mysql] 	the Windows Event Viewer for more clues
17:51:47  [mysql] 	If you need more help, copy and post this
17:51:47  [mysql] 	entire log window on the forums
```
解决方法1：
在mysql配置文件内搜索到[mysqld]所在行，在其下方插入
```
[mysqld]
innodb_force_recovery = 4
```
没用
解决方法2：
```
mysqld --install
net start mysql
```
没用
解决方法3：
最后查看服务发现已经启动了一个mysql服务，停止后重启就好了。。。


浏览器打开localhost，选择phpMyAdmin