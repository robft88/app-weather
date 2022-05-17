const { normalizeText } = require('./for-test.js');

describe('normalizeText-test', () => {
    test('si se le pasa un texto con espacios entre medio y a los extremos', () => {
        const expected = 'hola como estas';
        const result = normalizeText('     hola    como      estas ');
        expect(expected).toBe(result);
    })
    test('si se le pasa algo diferente a un string', () => {
        const expected = undefined;
        const result = normalizeText(12312);
        expect(expected).toBe(result);
    })
    test('si se le pasa un texto que cumple', () => {
        const expected = 'hola como estas';
        const result = normalizeText('hola como estas');
        expect(expected).toBe(result);
    })
})