const imageMap = {
    "cloudy": "Cloudy.png",
    "sunny": "Sunny.png",
    "rainy": "Rain.png",
    "snowy": "Snowing.jpg",
    "thunderstorm": "Thunderstorm.jpg",
    "partially cloudy": "Partially cloudy.jpg",
    
}

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=us&key=H9JYK849JBHTH5HNDD9PQCHE9&contentType=json`, {mode: 'cors'});
        const cityData = await response.json(); 
        return cityData;
    } catch (error) {
        console.error('Error Fetching weather data;"', error)
        return null;
    }
    

}
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const mainBody = document.querySelector("MainBodyContent");


function generateCityForecast(cityData){


    for(let i = 0; i < 7; i++){
    const currentCityData = cityData.days[i];
    const cityCard = document.createElement('div');
    cityCard.className = ('cityCard');
    
    const cityDetails = document.createElement('div');
    const cityName = document.createElement('h2');
    cityName.textContent = currentCityData.address;
    const cityTimezone = document.createElement('p');
    cityTimezone.textContent = currentCityData.timezone;
    const cityDate = new Date(currentCityData.datetime);
    const dayOfWeek = daysOfWeek[cityDate.getDay()];
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
    weatherIcon.src = imageMap[currentCityData.conditions];
    const weatherHighTemp = document.createElement('p');
    weatherHighTemp.textContent = `High: ${currentCityData.tempmax}°F`;
    const weatherLowTemp = document.createElement('p');
    weatherLowTemp.textContent = `Low: ${currentCityData.tempmin}°F`;
    weatherDetails.appendChild(weatherDescription);
    weatherDetails.appendChild(weatherIcon);
    weatherDetails.appendChild(weatherHighTemp);
    weatherDetails.appendChild(weatherLowTemp);

    
    
cityCard.appendChild(cityDetails);
cityCard.appendChild(weatherDetails);
mainBody.appendChild(cityCard);
}
}

const form = document.querySelector('#cityForm');
const input = document.querySelector('#cityInput');

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = input.value;
    const cityData = await getWeatherData(city);
    generateCityForecast(cityData);
})