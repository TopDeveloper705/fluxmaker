import path from 'path';

import Promise from 'bluebird';
import debug from 'debug';

import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';

import loadConfigs from './loadConfigs';
import loadInitializers from './loadInitializers';

class Server {
  constructor({ env, root }, { flux }) {
    this.env = env;
    this.flux = flux;
    this.log = debug('my-app');
    this.path = path.join.bind(path, root);
    
    this._server = express();
    this.middlewares = express.Router();

    this.loadConfigs();
    this.loadInitializers();
    this.setupMiddlewares();
  }

  start() {
    return this.initialize()
      .then(() => this.listen())
      .catch((error) => this.log(error));
  }

  initialize() {
    const initializers = this.initializers.map((i) => i());
    
    return Promise.all(initializers);
  }

  listen() {
    const { port } = this.config;

    this._server.use(this.middlewares);

    return new Promise((resolve, reject) => this._server.listen(port, resolve));
  }

  loadConfigs() {
    const { config, paths } = loadConfigs(this);
    
    this.config = config;
    this.paths = paths;
  }

  loadInitializers() {
    this.initializers = loadInitializers(this);
  }

  setupMiddlewares() {
    const paths = this.paths;

    this.middlewares.use('/public', express.static(paths.build));
    this.middlewares.use(compression());
    this.middlewares.use(bodyParser.json());
  }
}

export default Server;