const {assert} = require('chai')
const request = require('supertest')

const app = require('../server')

describe('testInterface', () => {
    it('/', (done) => {
        request(app)
            .get('/')
            .expect('Content-Type', /json/)
            .expect('Content-Length', "14")
            .expect(200)
            .end((req, res) => {
                // console.log(res)
                assert.equal(res.body.name, 'sin')
                done()
            });
    })
    it('/post', (done) => {
        request(app)
            .post('/post')
            .type('form')
            .send({name: 'sin'})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(done);
    })
})