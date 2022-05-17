const { convertDateFromApi } = require('./for-test.js');

describe('convertDateFromApi-test', () => {
    test('recibe formato de fecha diferente a Number', () => {
        const expected = undefined;
        const result = convertDateFromApi('asdasd', 'day');
        expect(expected).toBe(result);
    });

    test('si recibe la fecha de hoy y el flag === day, muestra el nombre completo del día de hoy', () => {
        const expected = 'Martes';
        const result = convertDateFromApi(new Date().getTime(), 'day');
        expect(expected).toBe(result);
    });

    test('si recibe la fecha de hoy y el flag !== day, muestra el nombre completo del día de hoy', () => {
        const expected = 'Martes, 17 Mayo 2022';
        const result = convertDateFromApi(new Date().getTime(), 'fullDate');
        expect(expected).toBe(result);
    });
})