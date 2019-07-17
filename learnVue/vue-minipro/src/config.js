let server = ''
// 判断当前环境,也可以在webpack中配置??>
if(process.env.NODE_ENV == 'development') {
    server='http://localhost:8081/'
}else {
    server='http://xxx.com/'
}

export const SERVER = server 