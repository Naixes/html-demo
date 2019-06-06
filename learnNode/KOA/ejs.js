const ejs = require('ejs')

// 和pug一样
ejs.renderFile('./template/hello.ejs', {
    pretty: true,
    title: 'hello',
    users: [
        {name: 'a', pass: '1'},
        {name: 'b', pass: '2'},
        {name: 'c', pass: '3'},
    ]
}, (err, data) => {
    if(err) {
        console.log(err)
    }else {
        console.log(data)
    }
})