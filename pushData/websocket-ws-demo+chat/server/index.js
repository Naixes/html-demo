const WebSocket = require('ws')
const { existKey, getValue, setValue } = require('./config/RedisConfig')

const wss = new WebSocket.Server({port: 3000})

let num = 0
let group = {}
const heartbeatTime = 20000

wss.on('connection', async function connection(ws) {
    // 初始化心跳检测
    ws.isAlive = true

    ws.on('message', function (msg) {
        const msgObj = JSON.parse(msg)
        const roomid = msgObj.roomid ? msgObj.roomid : ws.roomid
        if(msgObj.type === 'enter') {
            ws.name = msgObj.name
            ws.roomid = msgObj.roomid
            ws.uid = msgObj.uid
            // 判断redis中房间是否存在
            const result = await existKey(roomid)
            if(result === 0) {
                // 房间不存在：初始化房间信息
                setValue(roomid, msgObj.uid)
            }else {
                const usersStr = await getValue(roomid)
                const usersArr = usersStr.split(',')
                if(usersArr.indexOf(msgObj.uid) === -1) {
                    setValue(roomid, usersStr+','+msgObj.uid)
                }
            }

            // 人数统计
            if(typeof group[msgObj.roomid] === 'undefined') {
                group[msgObj.roomid] = 1
            }else {
                group[msgObj.roomid]++
            }
        }
        // 心跳检测
        if(msgObj.type === 'heartbeat' && msgObj.message === 'pong') {
            ws.isAlive = true
            return
        }
        // 广播消息
        // 获取房间里所用用户信息
        const usersStr = await getValue(roomid)
        const usersArr = usersStr.split(',')
        wss.clients.forEach(async client => {
            // 连接人数
            // wss.clients.size
            // 客户端需要过滤掉自己
            // 给在线的当前房间的用户发送消息
            if(client.readyState == WebSocket.OPEN && client.roomid === ws.roomid) {
                msgObj.num = group[ws.roomid]
                client.send(JSON.stringify(msgObj))
                // 排除在线用户
                if(usersArr.indexOf(client.uid) !== -1) {
                    usersArr.splice(usersArr.indexOf(client.uid), 1)
                }
                // 判断当前用户发是否存在之前缓存的离线消息
                let result = await existKey(ws.uid)
                // 当前存在离线消息
                if(result !== 0) {
                    let msgStr = await getValue(ws.uid)
                    let msgArr = JSON.parse(msgStr)
                    if(msgArr.length > 0) {
                        let tmp = []
                        // 给当前用户发送之前缓存的离线消息
                        msgArr.forEach(item => {
                            if(item.roomid === client.roomid && ws.uid === client.uid) {
                                client.send(JSON.stringify(item))
                                tmp.push(item)
                            }
                        })
                        // 删除已经发送消息的缓存
                        if(tmp.length > 0) {
                            tmp.forEach(item => {
                                msgArr.splice(item, 1)
                            })
                        }
                        // 更新缓存
                        setValue(ws.uid, JSON.stringify(msgArr))
                    }
                }
            }

            // 离线用户进行数据缓存，并且收到了消息
            if(usersArr.length > 0 && msgObj.type === 'message') {
                usersArr.forEach(uid => {
                    const result = await existKey(uid)
                    if(result !== 0) {
                        // 已经存在离线消息
                        const userMsg = await getValue(uid)
                        let msgs = JSON.parse(userMsg)
                        msgs.push({
                            roomid: ws.roomid,
                            msg: msgObj.message,
                            type: msgObj.type,
                            name: msgObj.name
                        })
                        setValue(uid, JSON.stringify(msgs))
                    }else {
                        // 之前没有离线消息
                        setValue(uid, JSON.stringify([
                            {
                                roomid: ws.roomid,
                                msg: msgObj.message,
                                type: msgObj.type,
                                name: msgObj.name
                            }
                        ]))
                    }
                })
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

// 心跳检测
setInterval(() => {
    wss.clients.forEach(ws => {
        if(!ws.isAlive && ws.roomid) {
            group[ws.roomid]--
            delete group['roomid']
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