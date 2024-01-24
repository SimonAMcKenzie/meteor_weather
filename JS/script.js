// Store the API key in a variable (Replace with your actual API key)
const apiKey = "cbc3f07c8da16c48fc5c1d34a8198cfa";

// Function to convert Kelvin to Celsius
const convertToCelsius = kelvin => kelvin - 273.15;

// Function to fetch weather data from OpenWeatherMap API
const getWeather = async city => {
    try {
        // Construct the query URL
        const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
        
        // Make the API call using Fetch API
        const response = await fetch(queryURL);
        
        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        // Parse the JSON response
        const data = await response.json();
        
        // Handle the API response
        displayWeather(data);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
};

// Function to display weather information on the page
const displayWeather = data => {
    // Extract relevant data from the API response
    const { name: city } = data.city;
    const currentDate = dayjs().format('DD/MM/YYYY');
    const { icon } = data.list[0].weather[0];
    const temperature = data.list[0].main.temp;
    const humidity = data.list[0].main.humidity;
    const windSpeed = data.list[0].wind.speed;
    const temperatureCelsius = convertToCelsius(temperature);

    // Display current weather information
    const currentWeatherHTML = `
        <div class="card">
          <div class="card-body">
            <h2>${city} (${currentDate}) <img src="http://openweathermap.org/img/w/${icon}.png" alt="Weather icon"></h2>
            <p>Temperature: ${temperatureCelsius.toFixed(2)} °C</p>
            <p>Humidity: ${humidity}%</p>
            <p>Wind Speed: ${windSpeed} MPH</p>
          </div>
        </div>
    `;

    $('#today').html(currentWeatherHTML);

    // Display 5-day forecast
    const forecastHTML = data.list.filter(entry => entry.dt_txt.includes('12:00:00')).map(forecast => {
        const date = dayjs(forecast.dt_txt).format('DD/MM/YYYY');
        const forecastIcon = forecast.weather[0].icon;
        const forecastTemperatureCelsius = convertToCelsius(forecast.main.temp);
        const forecastHumidity = forecast.main.humidity;

        return `
            <div class="col-md-2">
                <div class="card">
                    <div class="card-body">
                        <h5>${date}</h5>
                        <img src="http://openweathermap.org/img/w/${forecastIcon}.png" alt="Weather icon">
                        <p>Temp: ${forecastTemperatureCelsius.toFixed(2)} °C</p>
                        <p>Humidity: ${forecastHumidity}%</p>
                    </div>
                </div>
            </div>
        `;
    });

    $('#forecast').html(forecastHTML);
};

// Event listener for the search form
$('#search-form').on('submit', event => {
    event.preventDefault();

    // Get the value from the search input
    const city = $('#search-input').val().trim();

    if (city) {
        // Call the getWeather function with the city
        getWeather(city);

        // Add the city to the search history
        addToHistory(city);

        // Clear the search input
        $('#search-input').val('');
    }
});

// Function to add a city to the search history
const addToHistory = city => {
    // Check if the city is already in the history
    if (!$(`[data-city="${city}"]`).length) {
        const historyItem = `<button class="list-group-item" data-city="${city}">${city}</button>`;
        $('#history').prepend(historyItem);

        // Add click event to history items
        $(`[data-city="${city}"]`).on('click', () => {
            // Get the city from the data attribute and call getWeather
            const selectedCity = $(this).data('city');
            getWeather(selectedCity);
        });
    }
};
