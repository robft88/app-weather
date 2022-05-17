import { getWeatherFromCoordsOrCity, getNextDaysWeatherFromCoords, setHistorialLocation } from "./js/dataFunctions.js";
import { addActiveCLass, checkCurrentLocation, createErrorMsgFromSearchForm, displayAPIError, displayDataCurrentDay, displayDataNextDays, elementOpacity, setHTMLHistorial, toggleUnitBtn } from "./js/domFunctions.js";
import { capitalize, normalizeText, validateInput } from "./js/helperFunctions.js";
import style from "./css/style.css";
import icon32 from "./assets/img/icon_32.png";
import icon64 from "./assets/img/icon_64.png";
import icon96 from "./assets/img/icon_96.png";
import icon128 from "./assets/img/icon_128.png";
import icon192 from "./assets/img/icon_192.png";
import icon256 from "./assets/img/icon_256.png";
import icon384 from "./assets/img/icon_384.png";
import icon512 from "./assets/img/icon_512.png";

const nextDaysList = document.querySelector('.nextDaysWeather__list'),
    historial = document.querySelector('.historial__list'),
    searchInput = document.querySelector('.search__form'),
    tempHistorial = document.querySelector('.template-historial').content,
    tempNextDays = document.querySelector('.template-nextDays').content,
    domFragment = document.createDocumentFragment();

let searchLocation = {
    id: null,
    lat: null,
    lon: null,
    name: null,
    unit: 'metric'
};

let currentLocation = {
    lat: null,
    lon: null
};

let historialList = [];

function appInit() {

    document.addEventListener('click', (e) => { btnAction(e) });

    searchInput.addEventListener("submit", submitSearchLocation);
    currentGeolocation();

};

function btnAction(e) {
    if (e.target.matches(".btn-geolocation") || e.target.matches(".btn-geolocation *")) {
        currentGeolocation();
        addActiveCLass(e.target);
    };
    if (e.target.matches(".btn-unit") || e.target.matches(".btn-unit *")) {
        changeUnit();
        toggleUnitBtn();
    };
    if (e.target.matches('.historial__name')) {
        setHistorialLocation(searchLocation, e.target);
        loadDataAndDisplayElements(searchLocation, 'coords');
    };
    if (e.target.matches('.historial__btn') || e.target.matches('.historial__btn *')) {
        setHistorialLocation(searchLocation, e.target);
        deleteHistorial(searchLocation);
    };
};

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

function currentGeolocation() {
    if (!navigator.geolocation) return geolocationError();
    navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError);
};

function geolocationSuccess(position) {
    searchLocation.lat = parseFloat(position.coords.latitude.toFixed(4));
    searchLocation.lon = parseFloat(position.coords.longitude.toFixed(4));
    currentLocation.lat = parseFloat(position.coords.latitude.toFixed(4));
    currentLocation.lon = parseFloat(position.coords.longitude.toFixed(4));
    addActiveCLass(document.querySelector('.btn-geolocation *'));
    loadDataAndDisplayElements(searchLocation, 'coords');
};

function geolocationError(error) {
    const msg = error ? `${error.message}` : 'Geolocation not supported';
    displayAPIError(msg);
};

function checkLocalStorage() {
    if (localStorage.getItem('historial')) {
        historialList = JSON.parse(localStorage.getItem('historial'));
    };
    displayDataHistorial();
};

async function loadDataAndDisplayElements(searchLocation, flag) {
    const dataJson = await getWeatherFromCoordsOrCity(searchLocation, flag);

    if (dataJson.cod === 200) {
        searchLocation.lat = dataJson.coord.lat;
        searchLocation.lon = dataJson.coord.lon;
        searchLocation.id = dataJson.id;
        searchLocation.name = `${dataJson.name}, ${dataJson.sys.country}`;
        checkLocalStorage();
        checkCurrentLocation(currentLocation, searchLocation);
        const nextDaysJson = await getNextDaysWeatherFromCoords(searchLocation);
        if (flag === 'q') {
            setHistorial(searchLocation);
        };
        if (nextDaysJson) return displayElements(nextDaysJson, searchLocation);
    } else {
        displayAPIError(capitalize(dataJson.message));
        setTimeout(() => {
            currentGeolocation();
        }, 2000)
    };

};

function displayDataHistorial() {
    localStorage.setItem('historial', JSON.stringify(historialList));
    if (historialList.length === 0) {
        historial.innerHTML = `
        <p>No has realizado búsquedas</p>
        `;
        return;
    };
    historial.innerHTML = '';
    historialList.forEach(historial => {
        const clone = document.importNode(tempHistorial, true);

        setHTMLHistorial(clone, historial);

        domFragment.append(clone);
    });
    historial.appendChild(domFragment);
};

function setHistorial(searchLocation) {
    historialList = historialList.filter(el => searchLocation.lat !== el.lat && searchLocation.lon !== el.lon);
    historialList.unshift(searchLocation);
    historialList = historialList.splice(0, 10);
    displayDataHistorial();
};

async function submitSearchLocation(event) {
    event.preventDefault();
    const inputText = document.querySelector('.search__input');
    const cleanText = normalizeText(inputText.value);
    if (!cleanText.length) {
        inputText.value = '';
        inputText.focus();
        return alert('Debes ingresar una ciudad.');
    };
    searchLocation.name = cleanText;
    loadDataAndDisplayElements(searchLocation, 'q');
    inputText.value = '';
    inputText.blur();
};

function displayElements(dataJson, searchLocation) {
    elementOpacity();
    displayDataCurrentDay(dataJson, searchLocation);
    nextDaysList.innerHTML = '';
    for (let i = 1; i < 4; i++) {
        const clone = document.importNode(tempNextDays, true);
        displayDataNextDays(clone, dataJson, i);
        domFragment.appendChild(clone);
    };
    nextDaysList.appendChild(domFragment);
    elementOpacity();
};

function deleteHistorial(searchLocation) {
    historialList = historialList.filter(el => searchLocation.lat !== el.lat && searchLocation.lon !== el.lon);
    displayDataHistorial();
};

function changeUnit() {
    searchLocation.unit = (searchLocation.unit === 'metric') ? 'imperial' : 'metric';
    loadDataAndDisplayElements(searchLocation, 'coords');
};

document.addEventListener('DOMContentLoaded', () => {
    appInit();
});

document.addEventListener('keyup', (e) => {
    if (e.target.matches('.search__input')) {
        const result = validateInput(e.target.value);
        createErrorMsgFromSearchForm(e.target, result);
    };
});

