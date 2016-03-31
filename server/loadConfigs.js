'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interopRequire = require('interop-require');

var _interopRequire2 = _interopRequireDefault(_interopRequire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var env = _ref.env;
  var path = _ref.path;

  var paths = {
    app: path('app'),
    build: path('build'),
    config: path('config'),
    tasks: path('tasks')
  };

  var config = (0, _interopRequire2.default)(path('config', env));

  config.database = (0, _interopRequire2.default)(path('config', 'database'))[env];

  return { paths: paths, config: config };
};