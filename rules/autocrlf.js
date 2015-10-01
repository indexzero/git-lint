'use strict';

var errs = require('errs');

/**
 * Valid settings for autocrlf per platform
 */
var valid = {
  'win32': true,
  'linux': 'input',
  'darwin': 'input',
  'freebsd': 'input',
  'sunos': 'input'
};

/*
 * Checks to see if the autocrlf setting is correctly set per platform.
 */
module.exports = function (opts, config) {
  var resolution = 'git config --global autocrlf ' + valid[opts.platform],
      invalidValue;

  if (!config.core) {
    return errs.create({
      message: 'Missing [core] config',
      resolution: resolution
    });
  }

  invalidValue = (opts.platform === 'win32' && config.core.autocrlf !== true)
      || config.core.autocrlf !== 'input';

  if (invalidValue) {
    return errs.create({
      message: 'Must be ' + valid[opts.platform],
      resolution: resolution
    });
  }
};
