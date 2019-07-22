const {assert, expect} = require('chai')

const {add} = require('../calculator')

describe('calculator', () => {
    it('add', () => {
        assert(add(1, 1) == 2)
        assert.equal(add(1, 2), 2)
    })
})

// 异步测试：3种方式
// 运行用例超时可设置超时时间 >mocha -t 3000
describe('async', () => {
    it('add', (done) => {
        setTimeout(() => {
            assert.equal(add(1, 2), 4)
            done()
        }, 200)
    })
    it('add2', () => {
        return new Promise((res, rej) => {
            setTimeout(() => {
                assert.equal(add(1, 2), 3)
                res()
            }, 200)
        })
    })
    it('add3', async function () {
        await setTimeout(function () {
            expect(1 + 1).to.be.equal(2);
        }, 2000);
    });
})