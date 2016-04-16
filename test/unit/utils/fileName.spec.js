import { expect } from 'chai';

import fileName from '../../../src/utils/fileName';

describe('Utils#fileName', () => {
  it('should ignore extension', () => {
    expect(fileName('abc.js')).to.equal('abc');
  });

  it('should work without extension', () => {
    expect(fileName('def')).to.equal('def');
  });

  it('should ignore only the last extension', () => {
    expect(fileName('abc.js.jsx')).to.equal('abc.js');
  });
});
