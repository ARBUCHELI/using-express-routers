console.log = () => {};
const rewire = require('rewire');
const expect = require('chai').expect;
const request = require('supertest');
const assert = require('chai').assert;
const Structured = require('structured');
const express = require('express');

describe('', function() {
  it('', function(done) {
    process.env.PORT = 8000;
    const appModule = rewire('../app.js');
    const app = appModule.__get__('app');
    let expressionsRouter;
    const expressions = appModule.__get__('expressions');
    try {
      expressionsRouter = appModule.__get__('expressionsRouter');
    } catch(e) {
      expect(e, 'Did you create a router named `expressionsRouter` in app.js?').to.not.exist;
    }
    
    // Test that router responds to endpoints
    const myApp = express();
    myApp.use('/expressions', expressionsRouter);
    myApp.listen(8001, () => {
      request(myApp)
      .get('/expressions')
      .then((response) => {
        expect(response.body, 'Does your GET / route in `expressionsRouter` return the `expressions` array?').to.be.deep.equal(expressions);
      })
      .then(() => {
        return request(app)
        .get('/expressions')
        .then((response) => {
          expect(response.body, 'Did you mount `expressionsRouter` at `/expressions` so that it can send back `expressions`?').to.be.deep.equal(expressions);
          done();
        });
      })
      .catch(done);
    });
  });
});
