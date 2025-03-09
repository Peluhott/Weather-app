


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