// sum.test.js
import { describe, expect, test } from 'vitest';
import { sum, addArray } from '../../src/helpers/sum';

describe('Add funciton', () => {
  test('adds 1 + 2 to equal 3', () => {
    // Preparacion
    const a = 1;
    const b = 2;
    // Estimulo
    const result = sum(a, b);
    // Comportamiento esperado
    expect(result).toBe(3);
    expect(result).toBe(a + b);
  });
});
describe('Add array', () => {
  test('Should return 0 if the array is empty', () => {
    //Preparacion
    const arrA = [];
    //Estimulo
    const resultA = addArray(arrA);
    //Comportamiento esperado
    expect(resultA).toBe(0);
  });

  test('Should return the proper value of the array function', () => {
    //Preparacion
    const arrA = [1, 2, 3, 9.3];
    const arrB = [7, 8, 9, 4.2];
    //Estimulo
    const resultA = addArray(arrA);
    const resultB = addArray(arrB);
    //Comportamiento esperado
    expect(resultA).toBe(15.3);
    expect(resultB).toBe(28.2);
  });
});
