import Promise from 'bluebird';
import request from 'supertest-as-promised';

import factory from './factory';
import loadFactories from './loadFactories';

import cleanDatabase from '../database/cleanDatabase';

class TestSuite {
  constructor({ application }) {
    this.application = application;
  }

  initialize() {
    return this.application.initialize()
      .then(() => Promise.resolve(this.loadFactories()))
      .catch((e) => {
        throw e;
      });
  }

  request() {
    const { _server } = this.application.server;

    return request(_server);
  }

  cleanDatabase() {
    return cleanDatabase(this.application).catch((e) => {
      throw e;
    });
  }

  loadFactories() {
    return loadFactories(this.application, factory);
  }
}

export {
  factory,
  TestSuite
};

export default TestSuite;
