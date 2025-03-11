import './styles.css';
import { getWeatherData, generateCityForecast, imageMap, daysOfWeek, mainBody } from './generateData.js';

const form = document.querySelector('#cityForm');
const input = document.querySelector('#cityInput');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = input.value;
    const cityData = await getWeatherData(city);
    generateCityForecast(cityData);
})