'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _databaseInitializer = require('../initializers/databaseInitializer');

var _databaseInitializer2 = _interopRequireDefault(_databaseInitializer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (server) {
  return [(0, _databaseInitializer2.default)(server)];
};