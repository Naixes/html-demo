const Websocket = require('ws')

const wss = new Websocket.Server({port: 3000})

let num = 0
let group = {}

wss.on('connection', function connection(ws) {
    ws.on('message', function (msg) {
        const msgObj = JSON.parse(msg)
        if(msgObj.type === 'enter') {
            if(typeof group[msgObj.roomid] === 'undefined') {
                group[msgObj.roomid] = 1
            }else {
                group[msgObj.roomid]++
            }
            ws.name = msgObj.name
            ws.roomid = msgObj.roomid
        }
        // 广播消息
        wss.clients.forEach(client => {
            // 连接人数
            // wss.clients.size
            // 客户端需要过滤掉自己
            if(client.readyState == Websocket.OPEN && client.roomid === ws.roomid) {
                msgObj.num = group[msgObj.roomid]
                client.send(JSON.stringify(msgObj))
            }
        })
    })
    ws.on('close', function () {
        if(ws.name) {
            group[ws.roomid]--
        }
        wss.clients.forEach(client => {
            if(client.readyState == Websocket.OPEN && client.roomid === ws.roomid) {
                const msgObj = {
                    name: ws.name,
                    num: group[ws.roomid],
                    type: 'out'
                }
                client.send(JSON.stringify(msgObj))
            }
        })
    })
})