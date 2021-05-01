const Websocket = require('ws')

const wss = new Websocket.Server({port: 3000})

wss.on('connection', function connection(ws) {
    ws.on('message', function (msg) {
        console.log('msg', msg);
        wss.clients.forEach(client => {
            // 过滤掉自己
            if(ws !== client && client.readyState == Websocket.OPEN) {
                client.send(msg)
            }
        })
    })
})