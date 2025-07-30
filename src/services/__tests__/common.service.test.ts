import { numberFormation } from '../common.service';

describe('Common Service', () => {
  describe('numberFormation', () => {
    it('should format single digit numbers', () => {
      expect(numberFormation(1)).toBe('001');
      expect(numberFormation(5)).toBe('005');
      expect(numberFormation(9)).toBe('009');
    });

    it('should format double digit numbers', () => {
      expect(numberFormation(10)).toBe('010');
      expect(numberFormation(25)).toBe('025');
      expect(numberFormation(99)).toBe('099');
    });

    it('should format triple digit numbers', () => {
      expect(numberFormation(100)).toBe('100');
      expect(numberFormation(150)).toBe('150');
      expect(numberFormation(999)).toBe('999');
    });

    it('should handle numbers greater than 999', () => {
      expect(numberFormation(1000)).toBe('1000');
      expect(numberFormation(1500)).toBe('1500');
    });

    it('should handle zero', () => {
      expect(numberFormation(0)).toBe('000');
    });
  });
});
