const pug = require('pug')

pug.renderFile('./template/hello.pug', {
    // 美化
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