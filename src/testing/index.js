import Promise from 'bluebird';
import request from 'supertest-as-promised';

import loadFactory from './loadFactory';

class TestHelper {
  constructor({ application }) {
    this.application = application;
  }

  initialize() {
    const application = this.application;

    return application.initialize()
      .then(() => Promise.resolve(this.loadFactory()))
      .then(() => application.emitAsync('test:initialize', { application, testHelper: this }))
      .catch((e) => {
        throw e;
      });
  }

  request() {
    const { _server } = this.application.server;

    return request(_server);
  }

  loadFactory() {
    this.factory = loadFactory(this.application);
  }
}

export {
  TestHelper
};

export default TestHelper;
