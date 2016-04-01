import { expect } from 'chai';
import { stub } from 'sinon';

import Promise from 'bluebird';

import Application from '../../../src/application/application';

describe('Application', () => {
  let application;

  before(() => {
    stub(Application.prototype, 'loadConfigs');
  });

  after(() => {
    Application.prototype.loadConfigs.restore();
  });

  describe('#constructor', () => {
    before(() => {
      application = new Application({
        env: 'test',
        root: __dirname,
        setGlobal: 'testGlobal'
      }, {
        flux: {},
        server: {}
      });
    });

    after(() => {
      global.testGlobal = undefined;
    });

    it('should call #loadConfigs', () => {
      expect(Application.prototype.loadConfigs).to.have.been.calledOnce;
    });

    it('should set `testGlobal` global', () => {
      expect(global.testGlobal).to.equal(application);
    });

    it('should have an array of plugins', () => {
      expect(application.plugins).to.be.an.instanceof(Array);
    });
  });

  describe('#initialize', () => {
    before(() => {
      application = new Application({
        env: 'test',
        root: __dirname,
        setGlobal: false
      }, {
        flux: {},
        server: {}
      });
    });

    it('should return a promise', () => {
      expect(application.initialize()).to.be.an.instanceof(Promise);
    });
  });
});
