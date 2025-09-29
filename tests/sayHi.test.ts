import { expect, test } from '@rstest/core';
import { sayHi } from './sayHi';

test('should sayHi correctly', () => {
  expect(sayHi()).toBe('hi');
});
