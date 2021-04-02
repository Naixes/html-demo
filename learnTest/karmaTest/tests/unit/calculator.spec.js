
// karma不支持commonjs
// const add = require('../../src/calculator')

describe('calculator', function(){
    it('add', function() {
        expect(add(1, 1)).toBe(2)
    })
})
