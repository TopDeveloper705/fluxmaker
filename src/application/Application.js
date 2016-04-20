import path from 'path';
import EventEmitter from 'eventemitter2';

import Promise from 'bluebird';
import debug from 'debug';

import { Server, ServerPlugin } from '../server';

import loadConfigs from './loadConfigs';

class Application extends EventEmitter {
  constructor({ env, root }, { flux, server }) {
    super();

    this._debug = debug('app');
    this.log = this.log.bind(this);
    this.env = env;
    this.flux = flux;
    this.pathTo = path.join.bind(path, root);

    this.loadConfigs();

    this.plugins = [];

    this.server = server || new Server(this);
  }

  initialize() {
    this.plugins.push(ServerPlugin);

    if(!this.chainedInitializers) {
      this.chainedInitializers = this.plugins
        .map((plugin) => plugin.initializer)
        .reduce((chain, initializer) => {
          return chain.then(initializer(this));
        }, Promise.resolve());
    }

    return this.chainedInitializers;
  }

  plug(plugin) {
    this.plugins.push(plugin);
  }

  exit() {
    process.abort();
  }

  loadConfigs() {
    const { config, paths } = loadConfigs(this);

    this.config = config;
    this.paths = paths;
  }

  log(...args) {
    this._debug(...args);
  }
}

export default Application;
