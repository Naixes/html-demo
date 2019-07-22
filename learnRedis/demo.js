// 服务器
// redis-server.exe redis.windows.conf

const redis = require('redis')
// const Promise = require('bluebird')

const client = redis.createClient(6379, '127.0.0.1')
// Promise.promisifyAll(client)

client.on('err', (err) => {
    console.log(err)
})

client.set('name', 'sin', redis.print)
client.set('name', 'sin', (err, res) => {
    console.log(res)
})
client.get('name', redis.print)
// hset：设置单个值
client.hmset('user', 'name', 'sin', 'age', '14', 'pw', '123',  redis.print)
// client.hget('user', 'age', redis.print)
client.hkeys('user', (err, replies) => {
    replies.forEach((ele, i, eles) => {
        client.hget('user', ele, redis.print)
    })
})
// 事务
client.multi().hset('user', 'age', '18').hset('user', 'pw', '1234').exec(redis.print)
