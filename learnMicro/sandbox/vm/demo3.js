//没能逃逸
const { VM } = require('vm2');
new VM().run('this.constructor.constructor("return process")().exit()');
