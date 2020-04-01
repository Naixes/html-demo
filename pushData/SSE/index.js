var source;
function init(arg) {
	source = new EventSource('http://localhost/sse/data.php')
	source.onopen = function () {
		console.log('连接已建立', this.readyState)
	}
	source.onmessage = function (event) {
		console.log('数据', event.data)
	}
	source.onerror = function () { }
}
init()