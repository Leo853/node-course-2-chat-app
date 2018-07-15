var expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString', () => {
  it('should allow string with non-space chars', () => {
    var res = isRealString('some string');

    expect(res).toBe(true);
  });

  it('should reject non-string values', () => {
    var res = isRealString(75);

    expect(res).toBe(false);
  });

  it('should reject string with only spaces', () => {
    var res = isRealString('     ');

    expect(res).toBe(false);
  });
});
