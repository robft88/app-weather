import { capitalize, convertDateFromApi } from "./helperFunctions.js";

const currentTitle = document.querySelector('.currentWeather__title'),
    currentTemp = document.querySelector('.currentWeather__temp'),
    currentIcon = document.querySelector('.currentWeather__icon i'),
    currentDesc = document.querySelector('.currentWeather__desc'),
    currentDay = document.querySelector('.currentWeather__day'),
    currentMaxTemp = document.querySelector('.currentWeather__maxTemp'),
    currentMinTemp = document.querySelector('.currentWeather__minTemp'),
    currentHumidity = document.querySelector('.currentWeather__humidity'),
    currentLinkMore = document.querySelector('.currentWeather__more a'),
    pAccessResult = document.querySelector('p.outscreen');


export function elementOpacity() {
    const currentWeatherSection = document.querySelector('.currentWeather');
    toggleOpacity(currentWeatherSection);
    const nextDaysWeatherSection = document.querySelector('.nextDaysWeather');
    toggleOpacity(nextDaysWeatherSection);
};

export function toggleUnitBtn() {
    document.querySelector('.celsius').classList.toggle('none');
    document.querySelector('.fahrenheit').classList.toggle('none');
};

export function displayDataCurrentDay(dataJson, searchLocation) {
    let unidad = (searchLocation.unit === 'metric') ? 'Celsius' : 'Fahrenheit'
    currentTitle.textContent = searchLocation.name;
    currentTemp.textContent = `${Math.round(dataJson.current.temp)}°`;
    loadImage(dataJson.current.weather[0].icon, currentIcon);
    currentIcon.alt = dataJson.current.weather[0].description;
    currentDesc.textContent = capitalize(dataJson.current.weather[0].description);
    currentDay.textContent = `${convertDateFromApi(dataJson.daily[0].dt * 1000, 'fullDate')}`;
    currentMaxTemp.textContent = `Max ${Math.round(dataJson.daily[0].temp.max)}°`;
    currentMinTemp.textContent = `Min ${Math.round(dataJson.daily[0].temp.min)}°`;
    currentHumidity.textContent = `Humedad: ${Math.round(dataJson.current.humidity)}%`;
    currentLinkMore.href = `https://openweathermap.org/city/${searchLocation.id}`;
    currentLinkMore.rel = 'noopener noreferrer';
    currentLinkMore.target = '_blank';
    currentLinkMore.textContent = `Ver más...`;
    pAccessResult.textContent = `El clima para ${convertDateFromApi(dataJson.daily[0].dt * 1000, 'fullDate')} es de ${Math.round(dataJson.current.temp)} ° ${unidad} en la ciudad de ${searchLocation.name}`;
};

export function displayDataNextDays(element, dataJson, i) {
    const nDIcon = element.querySelector('.nextDaysWeather__icon i');
    element.querySelector('.nextDaysWeather__day').textContent = convertDateFromApi(dataJson.daily[i].dt * 1000, 'day');
    loadImage(dataJson.daily[i].weather[0].icon, nDIcon);
    element.querySelector('.nextDaysWeather__maxTemp').textContent = `${Math.round(dataJson.daily[i].temp.max)}°`;
    element.querySelector('.nextDaysWeather__minTemp').textContent = `${Math.round(dataJson.daily[i].temp.min)}°`;
    return element;
};

export function setHTMLHistorial(element, history) {
    element.querySelector('.historial__item').dataset.lat = history.lat;
    element.querySelector('.historial__item').dataset.lon = history.lon;
    element.querySelector('.historial__name').textContent = history.name;
    element.querySelector('.historial__btn').dataset.lat = history.lat;
    element.querySelector('.historial__btn').dataset.lon = history.lon;
    return element;
};

export function addActiveCLass(element) {
    element.classList.add('active');
    if (!element.matches('.btn-geolocation')) {
        element.parentNode.classList.add('active');
    }
    if (element.matches('.btn-geolocation')) {
        document.querySelector('.fa-location-crosshairs').classList.toggle('active');
    };
};

export function checkCurrentLocation(currentLocation, searchLocation) {
    if (currentLocation.lat !== searchLocation.lat || currentLocation.lon !== searchLocation.lon) {
        document.querySelector('.btn-geolocation').classList.remove('active');
        document.querySelector('.btn-geolocation *').classList.remove('active');
    } else {
        document.querySelector('.btn-geolocation').classList.add('active');
        document.querySelector('.btn-geolocation *').classList.add('active');
    };
};

export function createErrorMsgFromSearchForm(element, result) {
    const spanVerif = document.querySelector(`#${element.name}`),
        elementExist = document.body.contains(spanVerif);
    if (!elementExist) {
        const span = document.createElement('span'),
            form = document.querySelector('.search__form');
        span.id = element.name;
        span.textContent = 'Ingresa un nombre válido. Por ejemplo, Madrid o Madrid, ES';
        span.classList.add('search-error', 'none');
        form.insertAdjacentElement("afterend", span);
    }
    displaySearchError(result);
};

export function displayAPIError(errorMsg) {
    const h2 = document.querySelector('.currentWeather__title');
    h2.textContent = `Error: ${errorMsg}`;
};

function displaySearchError(result) {
    const btnSubmit = document.querySelector('.btn-search');
    if (result === undefined) {
        btnSubmit.disabled = true;
        document.querySelector('.search-error').classList.add('is-active');
    } else {
        document.querySelector('.search-error').classList.remove('is-active');
        btnSubmit.disabled = false;
    }
};

function toggleOpacity(element) {
    element.classList.toggle('fade-out');
    element.classList.toggle('fade-in');
};

function loadImage(icon, element) {
    const numericPart = icon.substr(0, 2),
        lastChar = icon.substr(2, icon.length);
    element.removeAttribute("class");
    switch (numericPart) {
        case '01':
            if (lastChar === 'd') {
                element.classList.add('icon', 'fa-solid', 'fa-sun');
            } else {
                element.classList.add('icon', 'fa-solid', 'fa-moon');
            }
            break;
        case '02':
            if (lastChar === 'd') {
                element.classList.add('icon', 'fa-solid', 'fa-cloud-sun');
            } else {
                element.classList.add('icon', 'fa-solid', 'fa-cloud-moon');
            }
            break;
        case '03':
            element.classList.add('icon', 'fa-solid', 'fa-cloud');
            break;
        case '04':
            element.classList.add('icon', 'fa-solid', 'fa-cloud');
            break;
        case '09':
            element.classList.add('icon', 'fa-solid', 'fa-cloud-showers-heavy');
            break;
        case '10':
            if (lastChar === 'd') {
                element.classList.add('icon', 'fa-solid', 'fa-cloud-sun-rain');
            } else {
                element.classList.add('icon', 'fa-solid', 'fa-cloud-moon-rain');
            }
            break;
        case '11':
            element.classList.add('icon', 'fa-solid', 'fa-cloud-bolt');
            break;
        case '13':
            element.classList.add('icon', 'fa-solid', 'fa-snowflake');
            break;
        case '50':
            element.classList.add('icon', 'fa-solid', 'fa-smog');
            break;
        default:
            element.classList.add('icon', 'fa-solid', 'fa-circle-question');
            break;
    }
    return element;
}