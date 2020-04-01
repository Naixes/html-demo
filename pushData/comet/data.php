<?php
	header("Content-type:application/json;charset=utf-8")
	header("Cache-Control:max-age=0")

	while(true) {
		echo rand(1, 999)
		ob_flush()
		flush()
	}
?>