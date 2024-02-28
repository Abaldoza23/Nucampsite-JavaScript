console.log('javascript connected!');

const carousel = new bootstrap.Carousel('#homeCarousel', {
    interval: 2000,
    pause: false
})

const carouselButton = document.getElementById('carouselButton');
const faIcon = document.getElementById('faButton');

carouselButton.addEventListener('click', function () {
    if (faIcon.classList.contains('fa-pause')) {
        faIcon.classList.remove('fa-pause');
        faIcon.classList.add('fa-play');
        console.log('pausing the carousel');
        carousel.pause();
    } else {
        faIcon.classList.remove('fa-play');
        faIcon.classList.add('fa-pause');
        console.log('cycle the carousel');
        carousel.cycle();
    }
})

async function fetchWeather() {
    const apiKey = process.env.OPEN_WEATHER_API_KEY;
    const city = 'san francisco';

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log('Weather Data:', data);

        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

function displayWeather(data) {
    const weatherIcon = document.createElement("img");
    weatherIcon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

    const iconContainer = document.getElementById("weather-icon");
    iconContainer.innerHTML = " ";
    iconContainer.appendChild(weatherIcon);

    const temperature = document.getElementById("weather-temp");
    temperature.textContent = `${data.main.temp}\u00B0`;

    const description = document.getElementById("weather-description");
    description.textContent = data.weather[0].description;

    const humidity = document.getElementById("weather-humidity");
    humidity.textContent = `Humidity: ${data.main.humidity}%`;

    const windSpeed = document.getElementById("weather-windspeed");
    windSpeed.textContent = `, Wind Speed: ${data.wind.speed} mph`;
}

fetchWeather();
