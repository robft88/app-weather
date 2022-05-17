const API_KEY = 'a5aa0925f392e3e2b5f8946d4f7fcd8c';

export async function getWeatherFromCoordsOrCity(userLocation, flagParameter) {

    const { lat, lon, name, unit } = userLocation;
    const flag = (flagParameter === 'coords') ? `lat=${lat}&lon=${lon}` : `q=${name}`;
    const unitFlag = (!unit) ? 'metric' : `${unit}`;
    const url = `https://api.openweathermap.org/data/2.5/weather?${flag}&units=${unitFlag}&appid=${API_KEY}&lang=es`;
    try {
        const weatherResp = await fetch(url);
        const weatherJson = await weatherResp.json();
        return weatherJson;
    } catch (error) {
        console.error(error);
    };
};

export async function getNextDaysWeatherFromCoords(weatherObj) {
    const { lat, lon, unit } = weatherObj;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${unit}&appid=${API_KEY}`;
    try {
        const weatherResp = await fetch(url);
        const weatherJson = await weatherResp.json();
        return weatherJson;
    } catch (error) {
        console.error(error);
    };
};

export function setHistorialLocation(searchLocation, element) {
    searchLocation.lat = parseFloat(element.parentNode.dataset.lat);
    searchLocation.lon = parseFloat(element.parentNode.dataset.lon);
};