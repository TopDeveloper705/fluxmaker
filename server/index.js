'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _loadConfigs3 = require('./loadConfigs');

var _loadConfigs4 = _interopRequireDefault(_loadConfigs3);

var _loadInitializers2 = require('./loadInitializers');

var _loadInitializers3 = _interopRequireDefault(_loadInitializers2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Server = function () {
  function Server(_ref, _ref2) {
    var env = _ref.env;
    var root = _ref.root;
    var flux = _ref2.flux;

    _classCallCheck(this, Server);

    this.env = env;
    this.flux = flux;
    this.log = (0, _debug2.default)('my-app');
    this.path = _path2.default.join.bind(_path2.default, root);

    this._server = (0, _express2.default)();
    this.middlewares = _express2.default.Router();

    this.loadConfigs();
    this.loadInitializers();
    this.setupMiddlewares();
  }

  _createClass(Server, [{
    key: 'start',
    value: function start() {
      var _this = this;

      return this.initialize().then(function () {
        return _this.listen();
      }).catch(function (error) {
        return _this.log(error);
      });
    }
  }, {
    key: 'initialize',
    value: function initialize() {
      var initializers = this.initializers.map(function (i) {
        return i();
      });

      return _bluebird2.default.all(initializers);
    }
  }, {
    key: 'listen',
    value: function listen() {
      var _this2 = this;

      var port = this.config.port;


      this._server.use(this.middlewares);

      return new _bluebird2.default(function (resolve, reject) {
        return _this2._server.listen(port, resolve);
      });
    }
  }, {
    key: 'loadConfigs',
    value: function loadConfigs() {
      var _loadConfigs2 = (0, _loadConfigs4.default)(this);

      var config = _loadConfigs2.config;
      var paths = _loadConfigs2.paths;


      this.config = config;
      this.paths = paths;
    }
  }, {
    key: 'loadInitializers',
    value: function loadInitializers() {
      this.initializers = (0, _loadInitializers3.default)(this);
    }
  }, {
    key: 'setupMiddlewares',
    value: function setupMiddlewares() {
      var paths = this.paths;

      this.middlewares.use('/public', _express2.default.static(paths.build));
      this.middlewares.use((0, _compression2.default)());
      this.middlewares.use(_bodyParser2.default.json());
    }
  }]);

  return Server;
}();

exports.default = Server;