<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>PHP</title>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
</head>
<body>
	<?php

	?>
	<form action="submit.php" method="get">
		<p>
			<label for="username">账号</label>
			<input id="username" type="text" name="username">
		</p>
		<p>
			<label for="password">密码</label>
			<input type="password" name="password">
		</p>
		<input id="btn" type="submit" value="提交">
	</form>
	<script>
		console.log($)
		$('#btn').click(function(e) {
			console.log('click')
			e.preventDefault()
			$.ajax({
				url: 'submit.php',
				method: 'GET',
				data: {
					username: $('#username').val()
				},
				success: function(data) {
					console.log(data)
				}
			})
		})
	</script>
</body>
</html>