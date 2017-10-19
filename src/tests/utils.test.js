import React from 'react';
import utils from '../utils/utils';

describe('isRecordVisible', () => {
  it('should calculate if record is visible', () => {
    expect(utils.isRecordVisible(1, 1, 5)).toBe(true);
    expect(utils.isRecordVisible(2, 1, 5)).toBe(false);
    expect(utils.isRecordVisible(2, 6, 5)).toBe(true);
  });
});
