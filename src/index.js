


async function getWeatherData(city) {
    try {
        const response = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=us&key=H9JYK849JBHTH5HNDD9PQCHE9&contentType=json', {mode: 'cors'});
        const cityData = await response.json(); 
        return cityData;
    } catch (error) {
        console.error('Error Fetching weather data;"', error)
        return null;
    }
    

}
let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const mainBody = document.querySelector("MainBodyContent");

for(let i = 0; i < 7; i++){
    const currentCityData = cityData.days[i];
    const cityCard = document.createElement('div');
    cityCard.className = ('cityCard');
    const cityDetails = document.createElement('div');
    cityDetails.className = ('cityDetails');
    const weatherDetails = document.createElement('div');
    weatherDetails.className = ('weatherDetails');

cityCard.appendChild(cityDetails);
cityCard.appendChild(weatherDetails);
mainBody.appendChild(cityCard);

}