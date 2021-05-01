const WebSocket = require('ws')

const ws = new WebSocket('ws://192.168.0.100:3000')

// 连接成功回调
ws.on('open', function(){
    console.log('Client is connected to Server');
    ws.on('message', function (msg) {
        console.log('msg', msg);
    })
    ws.send('ws client msg')
})