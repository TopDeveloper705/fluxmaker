import { expect } from 'chai';

describe('FetchrPlugin', () => {
  it('should load services', () => {
    expect($app.services).to.be.an.instanceof(Object);
  });
});
