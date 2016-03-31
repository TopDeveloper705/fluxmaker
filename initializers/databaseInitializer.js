'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (server) {
  var database = server.config.database;


  var dialectMap = {
    postgres: 'pg'
  };

  database.dialectModulePath = server.path('node_modules', dialectMap[database.dialect]);

  var sequelize = new _sequelize2.default(database.database, database.username, database.password, database);

  var models = {};

  var modelsPath = server.path.bind(null, 'app', 'models');

  _fs2.default.readdirSync(modelsPath()).filter(function (file) {
    return file.indexOf('.') !== 0 && file.indexOf('index.js') !== 0;
  }).forEach(function (file) {
    var model = sequelize.import(modelsPath(file));
    models[file.split('.')[0]] = model;
  });

  Object.keys(models).forEach(function (modelName) {
    if ('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  server.models = models;

  return function () {
    return sequelize.sync();
  };
};