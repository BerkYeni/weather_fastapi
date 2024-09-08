async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const weatherResult = document.getElementById('weatherResult');
    const city = cityInput.value;

    if (!city) {
        weatherResult.innerHTML = 'Please enter a city name';
        return;
    }

    try {
        const response = await fetch(`http://localhost:8000/weather/${city}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.cod === 200) {
            weatherResult.innerHTML = `
                <h2 class="text-xl font-semibold">${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
            `;
        } else {
            weatherResult.innerHTML = `Error: ${data.message}`;
        }
    } catch (error) {
        console.error('Error:', error);
        weatherResult.innerHTML = 'An error occurred while fetching the weather data';
    }
}