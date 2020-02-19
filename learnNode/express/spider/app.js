var express = require('express');
var app = express();
var request = require('request')
var cheerio = require('cheerio')

app.get('/', function (req, res) {
	request('https://www.jikexueyuan.com/', function (error, response, body) {
		if (!error && response.statusCode === 200) {
			$ = cheerio.load(body) // 拿到了整个body的选择器
			res.send({
				'classnum': $('.aside-allCategory .aside-cList>li').length
			})
		}
	})
});

app.listen(3000);

module.exports = app;
