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
var gitLint = module.exports = function (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }

  var opts = assign({}, defaults, options);
  gitLint.readConfig(opts, function (err, config) {
    if (err) { return callback(err); }
    gitLint.run(opts, config, callback);
  });
};

/*
 * Export defaults for testability
 */
gitLint.defaults = defaults;

/*
 * Reads and merges the git config at `~/.gitconfig` and `./.git/config`
 */
gitLint.readConfig = function (opts, callback) {
  async.parallel({
    global: async.apply(fs.readFile, path.join(opts.homeDir, '.gitconfig'), 'utf8'),
    local: async.apply(fs.readFile, path.join(opts.cwd, '.git', 'config'), 'utf8')
  }, function (err, files) {
    if (err && err.code !== 'ENOENT') {
      return callback(err);
    }

    callback(null, merge(
      {},
      ini.parse(files.global || ''),
      ini.parse(files.local || '')
    ));
  });
};

/**
 * Runs all rules on the specified config
 */
gitLint.run = function runRules(opts, config, callback) {
  var rulesDir = path.join(__dirname, 'rules');

  fs.readdir(rulesDir, function (err, rules) {
    if (err) { return callback(err); }

    var errors = {};

    rules.forEach(function runOne(rule, next) {
      var result = require(path.join(rulesDir, rule))(opts, config),
          name = path.basename(rule, '.js');

      if (result) {
        errors[name] = result;
      }
    });

    return Object.keys(errors).length
      ? callback(errors, config)
      : callback(null, config);
  });
};
