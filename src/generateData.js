import cloudy from '../images/Cloudy.svg';
import sunny from '../images/Sunny.svg';
import rain from '../images/Rain.svg';
import snow from '../images/Snow.svg';
import thunderstorm from '../images/Thunderstorm.svg';
import partlyCloudy from '../images/Partially-cloudy.svg';
import clear from '../images/Clear.svg'


const WEATHER_IMAGE_MAP = {
    "Cloudy": cloudy,
    "Partly-cloudy-day": partlyCloudy,
    "Partly-cloudy-night": partlyCloudy,
    "Clear-day": sunny,
    "Clear": clear,
    "Rain": rain,
    "Snow": snow,
    "Thunderstorm": thunderstorm,
    "Partially cloudy": partlyCloudy,
    "default": cloudy
}

let DAYS_OF_WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const mainBody = document.querySelector(".MainBodyContent");

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=us&key=H9JYK849JBHTH5HNDD9PQCHE9&contentType=json`, {mode: 'cors'});
        const cityData = await response.json(); 
        console.log("API Response:", cityData);
        return cityData;
    } catch (error) {
        console.error('Error Fetching weather data:', error);
        return null;
    }
}

function generateCityForecast(cityData) {
    if (!cityData || !cityData.days) {
        console.error('No weather data available');
        return;
    }

    if (mainBody) {
        mainBody.innerHTML = '';
    } else {
        console.error('MainBodyContent element not found');
        return;
    }

    for(let i = 0; i < 7; i++){
        const currentCityData = cityData.days[i];
        const cityCard = document.createElement('div');
        cityCard.className = ('cityCard');
        
        const cityDetails = document.createElement('div');
        const cityName = document.createElement('h2');
        const arrayCityName = cityData.resolvedAddress.split(',');
        cityName.textContent = arrayCityName[0];
        const cityTimezone = document.createElement('p');
        cityTimezone.textContent = cityData.timezone;
        const cityDate = new Date(currentCityData.datetime);
        const dayOfWeek = DAYS_OF_WEEK[cityDate.getDay()];
        const cityDay = document.createElement('p');
        cityDay.textContent = dayOfWeek;
        cityDetails.className = ('cityDetails');
        cityDetails.appendChild(cityName);
        cityDetails.appendChild(cityTimezone);
        cityDetails.appendChild(cityDay);
    
        
    
    
        const weatherDetails = document.createElement('div');
        weatherDetails.className = ('weatherDetails');
        const weatherDescription = document.createElement('p');
        weatherDescription.textContent = currentCityData.description;
        const weatherIcon = document.createElement('img');
        const cityConditionsArray = currentCityData.conditions.split(',');
        for(let i = 0; i < cityConditionsArray.length; i++){
            if(WEATHER_IMAGE_MAP[cityConditionsArray[i]]){
                weatherIcon.src = WEATHER_IMAGE_MAP[cityConditionsArray[i]];
                break;
            }
        }
        if(!weatherIcon.src){
            weatherIcon.src = WEATHER_IMAGE_MAP["default"];
        }
        console.log(currentCityData.conditions);
        const weatherHighTemp = document.createElement('p');
        weatherHighTemp.textContent = `High: ${currentCityData.tempmax}°F`;
        const weatherLowTemp = document.createElement('p');
        weatherLowTemp.textContent = `Low: ${currentCityData.tempmin}°F`;
        
        const iconWrapper = document.createElement('div');
        iconWrapper.className = 'weather-icon-wrapper';
        iconWrapper.appendChild(weatherIcon);
        weatherDetails.appendChild(iconWrapper);
        weatherDetails.appendChild(weatherDescription);
        weatherDetails.appendChild(weatherHighTemp);
        weatherDetails.appendChild(weatherLowTemp);
    
        
        
    cityCard.appendChild(cityDetails);
    cityCard.appendChild(weatherDetails);
    mainBody.appendChild(cityCard);
    }
}

export {
    getWeatherData,
    generateCityForecast,
    WEATHER_IMAGE_MAP,
    DAYS_OF_WEEK
}