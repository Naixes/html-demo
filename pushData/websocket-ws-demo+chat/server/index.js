const Websocket = require('ws')

const wss = new Websocket.Server({port: 3000})

let num = 0

wss.on('connection', function connection(ws) {
    ws.on('message', function (msg) {
        const msgObj = JSON.parse(msg)
        if(msgObj.type === 'enter') {
            num++
            console.log('num', num);
            ws.name = msgObj.name
        }
        wss.clients.forEach(client => {
            // 连接人数
            // wss.clients.size
            // 广播消息
            // 客户端需要过滤掉自己
            if(client.readyState == Websocket.OPEN) {
                msgObj.num = num
                console.log('msgObj', msgObj);
                client.send(JSON.stringify(msgObj))
            }
        })
    })
    ws.on('close', function (msg) {
        if(ws.name) {
            num--
        }
        wss.clients.forEach(client => {
            if(client.readyState == Websocket.OPEN) {
                const msgObj = {
                    name: ws.name,
                    num,
                    type: 'out'
                }
                client.send(JSON.stringify(msgObj))
            }
        })
    })
})