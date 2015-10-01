/* jshint mocha: true */

'use strict';

var assume = require('assume'),
    gitLint = require('../');

describe('git-lint', function () {
  it('should run default rules', function (done) {
    gitLint(function (errors, config) {
      assume(config.core).is.an('object');
      assume(config.core.autocrlf).equals('input');
      assume(config.user).is.an('object');
      done();
    });
  });

  describe('readConfig(opts, callback)', function () {
    it('should read config', function (done) {
      gitLint.readConfig(gitLint.defaults, function (err, config) {
        assume(err).is.falsey();
        assume(config.core).is.an('object');
        assume(config.user).is.an('object');
        done();
      });
    });
  });
});
