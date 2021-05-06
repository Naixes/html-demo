const WebSocket = require('ws')
const http = require('http');
const jwt = require('jsonwebtoken')

const server = http.createServer();
// const wss = new WebSocket.Server({port: 3000})
const wss = new WebSocket.Server({ noServer: true });

let num = 0
let group = {}
const heartbeatTime = 2000

wss.on('connection', function connection(ws) {
    // 初始化心跳检测
    ws.isAlive = true

    ws.on('message', function (msg) {
        const msgObj = JSON.parse(msg)
        // 判断客户端主动发送的鉴权消息
        if(msgObj.type === 'auth') {
            jwt.verify(msgObj.message, 'secret', (err, decode) => {
                if(err) {
                    ws.send({
                        type: 'noauth',
                        message: 'please auth again'
                    })
                    console.log('鉴权失败');
                    return
                }else {
                    console.log(decode);
                    ws.isAuth = true
                    return
                }
            })
            return
        }
        // 拦截未鉴权消息
        if(!ws.isAuth) {
            return
        }
        if(msgObj.type === 'enter') {
            if(typeof group[msgObj.roomid] === 'undefined') {
                group[msgObj.roomid] = 1
            }else {
                group[msgObj.roomid]++
            }
            ws.name = msgObj.name
            ws.roomid = msgObj.roomid
        }
        // 心跳检测
        if(msgObj.type === 'heartbeat' && msgObj.message === 'pong') {
            ws.isAlive = true
            return
        }
        // 广播消息
        wss.clients.forEach(client => {
            // 连接人数
            // wss.clients.size
            // 客户端需要过滤掉自己
            if(client.readyState == WebSocket.OPEN && client.roomid === ws.roomid) {
                msgObj.num = group[ws.roomid]
                client.send(JSON.stringify(msgObj))
            }
        })
    })
    ws.on('close', function () {
        if(ws.name) {
            group[ws.roomid]--
        }
        wss.clients.forEach(client => {
            if(client.readyState == WebSocket.OPEN && client.roomid === ws.roomid) {
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

server.on('upgrade', function upgrade(request, socket, head) {
    // This function is not defined on purpose. Implement it with your own logic.
    // authenticate(request, (err, client) => {
    //     if (err || !client) {
    //         socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    //         socket.destroy();
    //         return;
    //     }

        wss.handleUpgrade(request, socket, head, function done(ws) {
        wss.emit('connection', ws, request);
        });
    // });
});

server.listen(3000);

// 心跳检测
setInterval(() => {
    wss.clients.forEach(ws => {
        if(!ws.isAlive) {
            group[ws.roomid]--
            return ws.terminate()
        }
        ws.isAlive = false
        ws.send(JSON.stringify({
            type: 'heartbeat',
            message: 'ping',
            num: group[ws.roomid]
        }))
    })
}, heartbeatTime)