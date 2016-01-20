const Browser = require('zombie');

const browser = new Browser({site: 'http://localhost:8081'});

describe('User visits home page', function() {
  it('should be successful', function() {
    browser.visit('/', function() {
      browser.assert.success();
    });
  });
});
