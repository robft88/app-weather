export function normalizeText(text) {
    if (typeof text !== 'string') return;
    const inputText = text.trim().replace(/ {2,} /g, ' ');
    return inputText;
};

export function validateInput(text) {
    const regex = /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;
    if (!regex.exec(text) || text.trim() === '') {
        return;
    } else {
    };
    return text;
};

export function capitalize(text) {
    if (typeof text !== 'string') return;
    const result = text.split(' ').map(el => {
        return el.substring(0, 1).toUpperCase() + el.substring(1, el.length);
    });
    return result.join(' ');
};

export function convertDateFromApi(dateMiliseconds, flag) {
    if (typeof dateMiliseconds !== 'number') return;
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const date = new Date(dateMiliseconds);
    if (flag === 'day') {
        return daysOfWeek[date.getDay()];
    };
    const monthsOfYear = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    const d = date.getDate();
    const m = monthsOfYear[date.getMonth()];
    const y = date.getFullYear();
    return `${daysOfWeek[date.getDay()]}, ${d} ${m} ${y}`
};