import path from 'path';

import Promise from 'bluebird';

import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';

class Server {
  constructor(application) {
    this.application = application;

    this._server = express();
    this.middlewares = express.Router();

    this.setupDefaultMiddlewares();
  }

  start() {
    const { port } = this.application.config;

    return new Promise((resolve, reject) => this._server.listen(port, resolve));
  }

  setupDefaultMiddlewares() {
    const { paths } = this.application;

    this.middlewares.use('/public', express.static(paths.build));
    this.middlewares.use(compression());
    this.middlewares.use(bodyParser.json());
  }
}

export default Server;
