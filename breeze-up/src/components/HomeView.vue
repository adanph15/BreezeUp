<template>
    <div class="app-container">
        <div class="weather-container">
            <div class="search-container">
                <button @click="openSearchPopup" class="search-button">
                    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" class="white-icon">
                        <g data-name="Layer 32" id="Layer_32" fill="white">
                            <path
                                d="M60,7a1,1,0,0,0-1-1H13V2a1,1,0,0,0-1-1H8A7.008,7.008,0,0,0,1,8V50a7.008,7.008,0,0,0,7,7H31.622A17.978,17.978,0,0,0,60,35.072ZM49,27.464V19h9V32.584A17.971,17.971,0,0,0,49,27.464ZM27.464,41h-3.2l5.547-16H43v2.118A18.028,18.028,0,0,0,27.464,41ZM44,23H29.1a1,1,0,0,0-.945.672l-6.24,18A1,1,0,0,0,22.86,43h4.258A18.1,18.1,0,0,0,27,45H21.47a1,1,0,0,0-.945.672L17.288,55H14.406l7.569-21.812a1,1,0,0,0-.471-1.209L13,27.4V24.674l9.016,4.856a1,1,0,0,0,.474.12,1,1,0,0,0,.945-.672L30.712,8H33.6l-4.05,11.672A1,1,0,0,0,30.49,21H44a1,1,0,0,0,1-1V8h2v6a1,1,0,0,0,1,1H58v2H48a1,1,0,0,0-1,1v9.118A18.1,18.1,0,0,0,45,27V24A1,1,0,0,0,44,23ZM35.712,8H43V19H31.9ZM58,13H49V8h9ZM28.6,8,21.93,27.212,13,22.4V8ZM3,8A5.006,5.006,0,0,1,8,3h3V43H8a6.977,6.977,0,0,0-5,2.11ZM3,50a5.006,5.006,0,0,1,5-5h4a1,1,0,0,0,1-1V29.674l6.806,3.663L12.289,55H8A5.006,5.006,0,0,1,3,50Zm16.405,5,2.776-8h4.937a17.878,17.878,0,0,0,2.926,8ZM45,61A16,16,0,1,1,61,45,16.019,16.019,0,0,1,45,61Z" />
                            <path
                                d="M49.412,45A8.015,8.015,0,1,0,45,49.412l5.674,5.674a3.121,3.121,0,0,0,4.414-4.414ZM36,42a6,6,0,1,1,6,6A6.006,6.006,0,0,1,36,42ZM52.879,54a1.117,1.117,0,0,1-.793-.328L46.8,48.385A8,8,0,0,0,48.385,46.8l5.287,5.287A1.121,1.121,0,0,1,52.879,54Z" />
                        </g>
                    </svg>
                </button>
            </div>
            <CitySearch v-if="showSearchPopup" @city-selected="handleCitySelected" @close="closeSearchPopup" />

            <div v-if="weatherData" class="weather-info">
                <h1
                    :class="{ 'city-title': true, 'small-title': city.length > 9, 'extra-small-title': city.length > 14, 'tiny-title': city.length > 20 }">
                    {{ city }}</h1>
                <h2 class="temperature-title">{{ weatherData.temp }}°C</h2>
                <p class="weather-temp">Mín: {{ weatherData.temp_min }}°C<span class="invisible">__</span> Máx: {{
                    weatherData.temp_max }}°C</p>
                <p class="weather-description">{{ weatherData.description }}</p>
            </div>


            <div v-if="hourlyForecast" class="hourly">
                <div class="hourly-title-container">
                    <h3 class="hourly-title">PREVISIÓN - 10 HORAS</h3>
                </div>
                <swiper :modules="[Navigation, Pagination]" :slides-per-view="5" :space-between="10"
                    class="swiper-container" :autoplay="true">
                    <swiper-slide v-for="(hour, index) in hourlyForecast" :key="index" class="hour-card">
                        <p class="hour-time">{{ hour.time }}</p>
                        <img class="hour-icon" :src="hour.icon" alt="Weather icon" />
                        <p class="hour-temp">{{ hour.temp }}°C</p>

                    </swiper-slide>
                </swiper>
            </div>

            <div v-if="forecastData" class="forecast">
                <div class="forecast-title-container">
                    <h3 class="forecast-title">Previsión - 5 DÍAS</h3>
                </div>
                <div v-for="(day, index) in forecastData" :key="index" class="forecast-day">
                    <div class="forecast-date-container">
                        <p class="forecast-date">{{ day.date }}</p>
                        <img :src="day.icon" alt="icono clima" class="forecast-icon" />
                    </div>
                    <p class="forecast-description">Mín - {{ day.temp_min }}°</p>
                    <p class="forecast-temp">Máx - {{ day.temp_max }}°</p>
                </div>
            </div>

            <div v-if="forecastData" class="info">
                <div class="info-title-container">
                    <h3 class="info-title">INFORMACIÓN ADICIONAL</h3>
                </div>
                <div class="info-container">
                    <div class="info-item">
                        <p class="info-name">Viento</p>
                        <p class="info-wind-data">Velocidad {{ weatherData.wind_speed }} m/s</p>
                        <p class="info-wind-data"> Dirección {{ getWindDirection(weatherData.wind_deg) }}</p>
                    </div>
                    <div class="info-item">
                        <p class="info-name">Humedad</p>
                        <p class="info-data">{{ weatherData.humidity }}%</p>
                    </div>
                    <div class="info-item">
                        <p class="info-name">Presión</p>
                        <p class="info-data">{{ weatherData.pressure }} hPa</p>
                    </div>
                    <div class="info-item">
                        <p class="info-name">Visibilidad</p>
                        <p class="info-data">{{ weatherData.visibility }} km</p>
                    </div>
                    <div class="info-item">
                        <p class="info-name">Sensación</p>
                        <p class="info-data">{{ weatherData.feels_like }}°C</p>
                    </div>
                    <div class="info-item">
                        <p class="info-name">Atardecer</p>
                        <p class="info-data">{{ weatherData.sunset }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CitySearch from "./CitySearch.vue";

const city = ref("Madrid");
const API_KEY = process.env.API_KEY;
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";
const weatherData = ref(null);
const forecastData = ref(null);
const hourlyForecast = ref(null);
const loading = ref(false);
const error = ref(null);
const showSearchPopup = ref(false);

const openSearchPopup = () => {
    showSearchPopup.value = true;
};

const closeSearchPopup = () => {
    showSearchPopup.value = false;
};

const handleCitySelected = (selectedCity) => {
    city.value = selectedCity.name;
    closeSearchPopup();
    fetchWeather();
};

const fetchWeather = async () => {
    loading.value = true;
    error.value = null;
    try {
        const response = await fetch(`${WEATHER_URL}?q=${city.value}&appid=${API_KEY}&units=metric&lang=es`);
        if (!response.ok) throw new Error("No se encontró la ciudad");
        const data = await response.json();
        const lat = data.coord.lat;
        const lon = data.coord.lon;

        weatherData.value = {
            description: data.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
            temp: Math.round(data.main.temp),
            feels_like: Math.round(data.main.feels_like),
            temp_min: Math.round(data.main.temp_min),
            temp_max: Math.round(data.main.temp_max),
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind_speed: data.wind.speed,
            wind_deg: data.wind.deg,
            wind_gust: data.wind.gust,
            sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
            sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            sunriseRaw: data.sys.sunrise,
            sunsetRaw: data.sys.sunset,
            visibility: Math.round((data.visibility / 1000).toFixed(1)),
        };
        updateBackground(weatherData);
        fetchForecast(lat, lon);
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

function getWindDirection(degrees) {
    if (degrees >= 0 && degrees < 45 || degrees >= 315 && degrees < 360) return 'N ▲';
    if (degrees >= 45 && degrees < 135) return 'E ▶';
    if (degrees >= 135 && degrees < 225) return 'S ▼';
    if (degrees >= 225 && degrees < 315) return 'O ◀';
    return '';
}

function updateBackground(weatherData) {
    if (!weatherData || !weatherData.value) {
        console.error("weatherData no está disponible aún.");
        return;
    }

    const now = new Date();
    const sunriseTimestamp = weatherData.value.sunriseRaw * 1000;
    const sunsetTimestamp = weatherData.value.sunsetRaw * 1000;
    
    if (!sunriseTimestamp || !sunsetTimestamp) {
        console.error("Los datos de amanecer y atardecer no están disponibles.");
        return;
    }

    const sunrise = new Date(sunriseTimestamp);
    const sunset = new Date(sunsetTimestamp);
    const twoHoursAfterSunrise = new Date(sunrise.getTime() + 2 * 60 * 60 * 1000);
    const oneHourBeforeSunset = new Date(sunset.getTime() - 1 * 60 * 60 * 1000);

    const container = document.querySelector(".weather-container");
    if (!container) {
        console.error("No se encontró el elemento con clase .weather-container");
        return;
    }

    container.className = "weather-container";

    if (now < sunrise || now > sunset) {
        container.classList.add("night");
    } else if (now >= oneHourBeforeSunset && now < sunset) {
        container.classList.add("evening");
    } else if (now >= sunrise && now < twoHoursAfterSunrise) {
        container.classList.add("morning");
    } else {
        container.classList.add("day");
    }
}



const fetchForecast = async (lat, lon) => {
    try {
        const response = await fetch(`${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`);
        if (!response.ok) throw new Error("No se pudo obtener la previsión");
        const data = await response.json();
        const today = new Date();
        forecastData.value = data.list.filter((item, index) => index % 8 === 0).map(day => {
            const forecastDate = new Date(day.dt * 1000);
            const isToday = forecastDate.toLocaleDateString('es-ES') === today.toLocaleDateString('es-ES');

            return {
                date: isToday ? "HOY" : forecastDate.toLocaleDateString('es-ES', { weekday: 'short' }).toUpperCase(),
                temp_min: Math.round(day.main.temp_min),
                temp_max: Math.round(day.main.temp_max),
                icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`
            };
        });

        hourlyForecast.value = data.list.slice(0, 10).map(hour => ({
            time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            temp: Math.round(hour.main.temp),
            description: hour.weather[0].description,
            icon: `https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`
        }));

    } catch (err) {
        error.value = err.message;
    }
};

fetchWeather();
</script>

<style>
.app-container {
    width: 400px;
    height: 932px;
    max-height: 90vh;
    margin: auto;
    border: 12px solid black;
    border-radius: 40px;
    z-index: 100;
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.4);
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: white;
    overflow: hidden;
    margin-top: 2.5vh;
}

@media (max-width: 768px) {
    .app-container {
        margin-top: 0;
        height: 100%;
        max-height: 100%;
        border: none;
        box-shadow: none;
        border-radius: 0;
    }

    .weather-container {
        text-align: center;
        font-family: Arial, sans-serif;
        color: white;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        width: 100%;
        height: 100%;
    }
}

body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #374151;
}

.weather-container {
    text-align: center;
    font-family: Arial, sans-serif;
    color: white;
    padding: 0;
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    background: linear-gradient(to bottom, #006f8e, #3b82f6, #4f46e5);
    overflow: auto;
    max-height: 100%;
}

.weather-container::-webkit-scrollbar {
    display: none;
}

.weather-container {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.weather-container.morning {
    background: linear-gradient(to bottom, #006f8e, #3b82f6, #4f46e5);
}

.weather-container.night {
    background: linear-gradient(to top, #374151, #18181b);
}

.weather-container.evening {
    background: linear-gradient(to bottom left, #c2410c, #db2777);
}

.weather-temp {
    margin-top: -20px;
}

.forecast,
.info,
.hourly {
    z-index: 2;
    width: 85%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: inset 0 1px 2px rgba(255, 255, 255, 0.1), 0px 4px 6px rgba(255, 255, 255, 0.1);
}

.hourly {
    margin-top: 0px;
}

.info {
    margin-bottom: 80px;
}

.info-item {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    height: 35px;
}

.info-name {
    text-transform: uppercase;
    text-align: start;
    font-weight: bold;
    font-size: 1rem;
    font-weight: 600;
    width: 90%;
}

.info-wind-data {
    padding-left: 30px;
}

.info-data {
    text-align: end;
    font-size: 1.25rem;
    font-weight: 500;
    width: 100%;
}

.info-container {
    width: 95%;
    margin: 10px;
    margin-top: -10px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.forecast-day {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin: 10px;
    padding: 10px;
    border-radius: 10px;
    width: 95%;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    height: 25px;
}

.forecast-date-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: calc(100% / 3);
}


.forecast-icon {
    width: 50px;
    height: 50px;
}

.forecast-title-container,
.hourly-title-container,
.info-title-container {
    display: flex;
    flex-direction: row;
    border-radius: 10px;
    width: 100%;
    margin-top: -10px;
}

.forecast-title,
.hourly-title,
.info-title {
    text-transform: uppercase;
    font-size: 0.875rem;
    color: hsl(211, 73%, 78%);
    margin-left: 5px;
}

.invisible {
    opacity: 0;
}

.city-title {
    text-transform: capitalize;
    font-size: 3rem;
    font-weight: 100;
}

.small-title {
    font-size: 2rem;
}

.extra-small-title {
    font-size: 2rem;
    margin-right: 2em;
    margin-top: 1em;
}

.tiny-title {
    font-size: 1.5rem;
    margin-right: 2em;
    margin-top: 2em;
}

.temperature-title {
    font-size: 2.25rem;
    margin-top: -25px;
    font-weight: 700;
}

.weather-description {
    font-size: 1.25rem;
    color: hsl(211, 73%, 78%);
    text-transform: capitalize;
    font-weight: bold;
    margin-top: -20px;
}

.weather-info {
    border-radius: 10px;
    width: 95vw;
    margin-bottom: 40px;
    margin-top: -10px;
    z-index: 2;
}

#wind-arrow {
    fill: white;
    transition: transform 0.5s ease;
}

.hour-icon {
    margin-top: -20px;
}

.hour-temp {
    margin-top: -5px;
}

.swiper-container {
    width: 100%;
    padding: 10px 0px;
}

.hour-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: start;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.2);
    padding: 5px;
    border-radius: 10px;
    max-height: 110px;
    box-sizing: border-box;
    z-index: 2;
}


.search-container {
    position: relative;
    justify-content: flex-end;
    width: 100%;
    z-index: 100;
    display: flex;
    margin-right: 3em;
    margin-top: 60px;
    background-color: transparent;
}


.search-button {
    position: absolute;
    display: inline-block;
    padding: 10px;
    cursor: pointer;
    border: 0px;
    margin-top: 15px;
    transition: transform 0.3s ease;
    background-color: transparent;
}


.white-icon {
    fill: #FFFFFF;
    width: 50px;
    height: 50px;
}
</style>
