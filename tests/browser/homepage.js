const Browser = require('zombie');

const browser = new Browser({site: 'http://localhost:8081'});

describe('User visits home page', function() {
  before(function(done) {
    browser.visit('/', done);
  });
  // it('should be successful', function() {
  //   browser.assert.success();
  // });
});
