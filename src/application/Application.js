import path from 'path';
import EventEmitter from 'events';

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
    this.root = root;

    this._loadConfigs();

    this._plugins = [];

    this.server = server || new Server(this);
  }

  initialize() {
    this._plugins.push(ServerPlugin);

    if(!this.chainedInitializers) {
      this.chainedInitializers = this._plugins
        .map((plugin) => plugin.initializer.bind(plugin))
        .reduce((chain, initializer) => {
          return chain.then(initializer(this));
        }, Promise.resolve());
    }

    return this.chainedInitializers;
  }

  plug(plugin) {
    this._plugins.push(plugin);
  }

  exit() {
    process.abort();
  }

  log(...args) {
    this._debug(...args);
  }

  emitAsync(type, payload) {
    const listeners = this.listeners(type);

    return listeners.reduce((chain, listener) => {
      return chain.then(() => listener(payload));
    }, Promise.resolve());
  }

  _loadConfigs() {
    const { config, paths } = loadConfigs(this);

    this.config = config;
    this.paths = paths;
  }
}

export default Application;
