import { describe, it, expect } from 'vitest';
import {
  DEPARTMENT_LABELS,
  DEPARTMENT_COLORS,
  AVAILABILITY_LABELS,
  AVAILABILITY_COLORS,
  CLEARANCE_LABELS,
  STATUS_LABELS,
  ALL_DEPARTMENTS,
} from '../lib/constants';

describe('constants', () => {
  describe('DEPARTMENT_LABELS', () => {
    it('has labels for all 11 departments', () => {
      expect(Object.keys(DEPARTMENT_LABELS)).toHaveLength(11);
    });

    it('maps department keys to readable labels', () => {
      expect(DEPARTMENT_LABELS.C_SUITE).toBe('C-Suite');
      expect(DEPARTMENT_LABELS.MIDDLE_MANAGEMENT).toBe('Middle Management');
      expect(DEPARTMENT_LABELS.HR).toBe('HR');
      expect(DEPARTMENT_LABELS.IT).toBe('IT');
    });
  });

  describe('DEPARTMENT_COLORS', () => {
    it('has colors for all 11 departments', () => {
      expect(Object.keys(DEPARTMENT_COLORS)).toHaveLength(11);
    });

    it('all colors start with bg-dept-', () => {
      Object.values(DEPARTMENT_COLORS).forEach((color) => {
        expect(color).toMatch(/^bg-dept-/);
      });
    });
  });

  describe('AVAILABILITY_LABELS', () => {
    it('has labels for all 4 availability statuses', () => {
      expect(Object.keys(AVAILABILITY_LABELS)).toHaveLength(4);
      expect(AVAILABILITY_LABELS.AVAILABLE).toBe('Available');
      expect(AVAILABILITY_LABELS.EMPLOYED).toBe('Employed');
      expect(AVAILABILITY_LABELS.FREELANCE).toBe('Freelance');
      expect(AVAILABILITY_LABELS.RETIRED).toBe('Retired');
    });
  });

  describe('AVAILABILITY_COLORS', () => {
    it('has colors for all 4 availability statuses', () => {
      expect(Object.keys(AVAILABILITY_COLORS)).toHaveLength(4);
    });
  });

  describe('CLEARANCE_LABELS', () => {
    it('has labels for all 5 clearance levels', () => {
      expect(Object.keys(CLEARANCE_LABELS)).toHaveLength(5);
      expect(CLEARANCE_LABELS.STANDARD).toBe('Standard');
      expect(CLEARANCE_LABELS.COSMIC).toBe('Cosmic');
      expect(CLEARANCE_LABELS.TOP_SECRET).toBe('Top Secret');
    });
  });

  describe('STATUS_LABELS', () => {
    it('has labels for all 3 position statuses', () => {
      expect(Object.keys(STATUS_LABELS)).toHaveLength(3);
      expect(STATUS_LABELS.OPEN).toBe('Open');
      expect(STATUS_LABELS.FILLED).toBe('Filled');
      expect(STATUS_LABELS.ON_HOLD).toBe('On Hold');
    });
  });

  describe('ALL_DEPARTMENTS', () => {
    it('contains all 11 departments', () => {
      expect(ALL_DEPARTMENTS).toHaveLength(11);
    });

    it('matches DEPARTMENT_LABELS keys', () => {
      const labelKeys = Object.keys(DEPARTMENT_LABELS).sort();
      expect([...ALL_DEPARTMENTS].sort()).toEqual(labelKeys);
    });
  });
});
