const redis = require('redis')

// 订阅
// SUBSCRIBE channela
// 发布
// PUBLISH channela xxx

const client1 = redis.createClient(6379, '127.0.0.1')
const client2 = redis.createClient(6379, '127.0.0.1')

client1.subscribe('food')
client1.subscribe('drink')

client1.on('message', (channel, message) => {
    console.log(channel, message)
    client1.unsubscribe('food')
})

client2.publish('food', 'rice')
client2.publish('drink', 'jiuce')
client2.publish('food', 'rice')
setTimeout(() => {
    client2.publish('food', 'rice')
    client2.publish('drink', 'jiuce')
}, 200)