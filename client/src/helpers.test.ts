import expect from 'expect';

import { getRandomColor } from './helpers';

describe('getRandomColor', () => {
  it('returned length should be string with length = 7: #000000', () => {
    const color: string = getRandomColor();
    expect(color).toHaveLength(7);
    expect(typeof color).toBe('string');
  });
});

import { formatDate } from './helpers';

describe('formatDate', () => {
  it('should format date?', () => {
      const result = formatDate("25.11.1987");
      console.log(result);
  });
});
