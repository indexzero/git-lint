'use strict';

var fs = require('fs'),
    os = require('os'),
    path = require('path'),
    assign = require('object-assign'),
    async = require('async'),
    ini = require('ini'),
    merge = require('lodash.merge');

/*
 * Default values for options.
 */
var defaults = {
  homeDir: process.env.HOME || process.env.USERPROFILE,
  platform: os.platform(),
  cwd: process.cwd()
};

/*
 * Performs a basic lint check by reading and merging
 * the global git config and the local git config and then
 * asserting that certain values are present.
 */
module.exports = function (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var opts = assign({}, defaults, options);

  async.parallel({
    global: async.apply(fs.readFile, path.join(opts.homeDir, '.gitconfig'), 'utf8'),
    local: async.apply(fs.readFile, path.join(opts.cwd, '.git', 'config'), 'utf8')
  }, function (err, files) {
    if (err && err.code !== 'ENOENT') {
      return callback(err);
    }

    var config = merge(
      {},
      ini.parse(files.global || ''),
      ini.parse(files.local || '')
    );

    callback(null, config);
  });
};
