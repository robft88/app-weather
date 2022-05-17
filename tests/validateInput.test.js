const { validateInput } = require('./for-test.js');

describe('validateInput-test', () => {
    test('si se le pasa un valor diferente a string', () => {
        const expected = undefined;
        const result = validateInput(123123);
        expect(expected).toBe(result);
    })
    test('si se le pasa un string con números', () => {
        const expected = undefined;
        const result = validateInput('madrid123');
        expect(expected).toBe(result);
    })
    test('si se le pasa un string válido', () => {
        const expected = 'madrid';
        const result = validateInput('madrid');
        expect(expected).toBe(result);
    })
})