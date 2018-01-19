const assert = require('assert');
const request = require('supertest');
const server = require('../server');

describe('The express app', () => {
    it('Handles a GET request to the /api route', (done) => {
        request(server).get('/api')
                       .end((err, res) => {
                            assert(res.body.hi === 'there');
                            done();
                       });
    });
});