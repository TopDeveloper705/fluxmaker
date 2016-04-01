import { expect } from 'chai';

describe('Internals#config', () => {
  it('should load correct database config', () => {
    expect($app.config.database).to.be.an.instanceof(Object);
  });

  it('should load correct dummy config', () => {
    expect($app.config.dummy).to.eql({ fake: 'config' });
  });

  it('should load correct config with function', () => {
    expect($app.config.withFunction).to.eql({ fn: 'config' });
  });
});
