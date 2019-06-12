const crypto = require('crypto')

module.exports = {
    md5(buffer) {
        // md5:使用的加密算法
        let obj = crypto.createHash('md5')
        obj.update(buffer)
        // hex:十六进制
        return obj.digest('hex')
    }
}