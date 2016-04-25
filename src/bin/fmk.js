#!/usr/bin/env node

var Liftoff = require('liftoff');
var interpret = require('interpret');
var v8flags = require('v8flags');

var cli = new Liftoff({
  processTitle: 'fluxmaker',
  moduleName: 'fluxmaker',
  configName: 'fmkfile',
  extensions: interpret.jsVariants,
  v8flags: v8flags
});

cli.launch({}, function(env) {
  require(env.configPath);
});
