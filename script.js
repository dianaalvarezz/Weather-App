/**
* Fetches current weather and forecast data for a specified city from the OpenWeatherMap API and
* displays the data using the displayWeather and displayHourlyForecast functions. Alerts the user
* if the city field is empty or if there is an error fetching the data.
*/
function getWeather() {
    const apiKey = ''; // Replace with your actual API key
    const city = document.getElementById('city').value; // Retrieves the city name from the input field

    // Alert and return if no city is entered
    if (!city) {
        alert('Please enter a city');
        return;
    }

    // Construct API URLS for current weather and forecast
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`; 

    // Fetch current weather data
    fetch(currentWeatherUrl)
        .then(response => response.json()) 
        .then(data => {
            displayWeather(data); // Display current weather data
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    // Fetch hourly forecast data
    fetch(forecastUrl) 
        .then(response => response.json()) 
        .then(data => {
            displayHourlyForecast(data.list); // Display hourly forecast data
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}


/**
* Displays the current weather data on the webpage.
* Clears previous weather data and displays new data including the city name, temperature, weather 
* description, and weather icon.
*
* @param {Object} data - The current weather data object from the OpenWeatherMap API 
*/
function displayWeather(data) {
    // Element retrieval 
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');

    // Initial clearing 
    weatherInfoDiv.innerHTML = '';
    hourlyForecastDiv.innerHTML = '';
    tempDivInfo.innerHTML = '';

    // Error checking 
    if (data.cod === '404') {
        // Display error message if city is not found
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`; 
    } else {
        // Extract and display weather detai;s
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`; 
    
        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p> 
        `;

        tempDivInfo.innerHTML = temperatureHTML;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displayHourlyForecast(hourlyData) {
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    const next24Hours = hourlyData.slice(0, 8);
    
    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`; 
        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span> 
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}
