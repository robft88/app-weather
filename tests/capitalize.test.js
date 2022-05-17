const { capitalize } = require('./for-test.js');

describe('capitalize-test', () => {
    test('si se le pasa un valor diferente a un string', () => {
        const expected = undefined;
        const result = capitalize(12312);
        expect(expected).toBe(result);
    })

    test('si se le pasa un string', () => {
        const expected = 'Error 404: City Not Found';
        const result = capitalize('error 404: city not found');
        expect(expected).toBe(result);
    })
})