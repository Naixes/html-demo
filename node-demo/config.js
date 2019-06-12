const path = require('path')

module.exports = {
    DB_HOST: 'localhost',
    DB_USER: 'admin',
    DB_PASS: 'root',
    DB_NAME: 'cpts',

    PORT: 8080,
		HTTP_ROOT: 'http://localhost:8080',
    // HTTP_ROOT: 'https://www.aaa.com/',

    UPLOAD_DIR: path.resolve(__dirname, './static/upload'),

    ADMIN_PREFIX: '@#_<?shd,S:shuiNMBV'
}