import { expect } from 'chai';

import { factory } from 'fluxmaker/testing';

describe('User', () => {
  let user;

  before(() => {
    return factory.create('user')
      .then((_user) => user = _user);
  });

  afterEach(() => $testSuite.cleanDatabase());

  it('should check user\'s email', () => {
    expect(user.email).to.contain('@');
  });
});
