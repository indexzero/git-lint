/* jshint mocha: true */

'use strict';

var assume = require('assume'),
    gitLint = require('../');

describe('git-lint', function () {
  it('should read config', function (done) {
    gitLint(function (err, config) {
      assume(err).is.falsey();
      assume(config.core).is.an('object');
      assume(config.user).is.an('object');
      done();
    });
  });
});
