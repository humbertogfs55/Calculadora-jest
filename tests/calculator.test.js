const { add, subtract, divide, multiply } = require('../src/calculator');

// Teste da função de adição
test('adds 2 + 3 to equal 5', () => {
    expect(add(2, 3)).toBe(5);
});

// Teste falha da função de adição
test('adds 2 + 3 to not equal 4', () => {
    expect(add(2, 3)).not.toBe(4);
});

// Teste para função de subtração
test('subtracts 7 - 3 to equal 4', () => {
    expect(subtract(7, 3)).toBe(4);
});

// Falha da função de subtração
test('subtracts 7 - 3 to not equal 5', () => {
    expect(subtract(7, 3)).not.toBe(5);
});

// Teste da função de divisão
test('divides 10 / 2 to equal 5', () => {
    expect(divide(10, 2)).toBe(5);
});

// Teste da falha da função de divisão
test('divides 10 / 2 to not equal 4', () => {
    expect(divide(10, 2)).not.toBe(4);
});

// Teste de divisão que resulta em decimal
test('divides 7 / 2 to equal 3.5', () => {
    expect(divide(7, 2)).toBe(3.5);
});

// Teste de divisão entre números negativos
test('divides -6 / 3 to equal -2', () => {
    expect(divide(-6, 3)).toBe(-2);
});

// Teste da divisão por zero
test('divides by zero to throw error', () => {
    expect(() => divide(5, 0)).toThrow("Cannot divide by zero");
});

// Teste da função de multiplicação
test('multiplies 10 * 2 to equal 20', () => {
    expect(multiply(10, 2)).toBe(20);
});

// Teste de falha da função de multiplicação
test('multiplies 10 * 2 to equal 20', () => {
    expect(multiply(10, 2)).not.toBe(190);
});