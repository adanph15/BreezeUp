<!-- 





<script setup>
import { ref } from "vue";

const API_KEY = "4a62502d1d5736092df5f1cdf72001fa"; 
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

const city = ref("Madrid");
const weatherData = ref(null);
const forecastData = ref(null);
const loading = ref(false);
const error = ref(null);

const fetchWeather = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch(`${WEATHER_URL}?q=${city.value}&appid=${API_KEY}&units=metric&lang=es`);
    if (!response.ok) throw new Error("No se encontró la ciudad");
    const data = await response.json();
    
    weatherData.value = {
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg,
      wind_gust: data.wind.gust,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      visibility: (data.visibility / 1000).toFixed(1),
    };
    
    fetchForecast(data.coord.lat, data.coord.lon);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const fetchForecast = async (lat, lon) => {
  try {
    const response = await fetch(`${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es&exclude=minutely,hourly,alerts`);
    if (!response.ok) throw new Error("No se pudo obtener la previsión");
    const data = await response.json();
    forecastData.value = data.list.slice(1, 8).map(day => ({
      date: new Date(day.dt * 1000).toLocaleDateString(),
      temp: day.main.temp,
      description: day.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`
    }));
  } catch (err) {
    error.value = err.message;
  }
};
</script>

<template>
  <div class="weather-container">
    <h1>Aplicación del Tiempo</h1>
    <input v-model="city" placeholder="Introduce una ciudad" />
    <button @click="fetchWeather">Buscar</button>

    <p v-if="loading">Cargando...</p>
    <p v-if="error" style="color: red">{{ error }}</p>

    <div v-if="weatherData" class="weather-info">
      <h2>{{ city }}</h2>
      <p><img :src="weatherData.icon" alt="icono clima" /></p>
      <p>🌡️ {{ weatherData.temp }}°C (Sensación térmica: {{ weatherData.feels_like }}°C)</p>
      <p>🔽 Mín: {{ weatherData.temp_min }}°C | 🔼 Máx: {{ weatherData.temp_max }}°C</p>
      <p>☁️ {{ weatherData.description }}</p>
      <p>💧 Humedad: {{ weatherData.humidity }}%</p>
      <p>🔽 Presión: {{ weatherData.pressure }} hPa</p>
      <p>💨 Viento: {{ weatherData.wind_speed }} m/s (Dirección: {{ weatherData.wind_deg }}°)</p>
      <p v-if="weatherData.wind_gust">💨 Ráfagas: {{ weatherData.wind_gust }} m/s</p>
      <p>🌅 Amanecer: {{ weatherData.sunrise }}</p>
      <p>🌇 Atardecer: {{ weatherData.sunset }}</p>
      <p>🌫️ Visibilidad: {{ weatherData.visibility }} km</p>
    </div>
    
    <div v-if="forecastData" class="forecast">
      <h2>Previsión para los próximos 7 días</h2>
      <div v-for="(day, index) in forecastData" :key="index" class="forecast-day">
        <p>{{ day.date }}</p>
        <p><img :src="day.icon" alt="icono clima" /></p>
        <p>🌡️ {{ day.temp }}°C</p>
        <p>☁️ {{ day.description }}</p>
      </div>
    </div>
  </div>
</template>




<style scoped>
  .weather-container {
    text-align: center;
    font-family: Arial, sans-serif;
  }
  .weather-info, .forecast {
    background-color: darkblue;
    border-radius: 10%;
    
    margin-top: 20px;
  }
  .forecast-day {
    border: 1px solid #ccc;
    padding: 10px;
    margin: 5px;
    display: inline-block;
  }
  input {
    margin: 10px;
    padding: 5px;
  }
  button {
    padding: 5px 10px;
    cursor: pointer;
  }
</style> -->

<!-- <script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API_KEY = ""; 
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

const city = ref("Madrid");
const weatherData = ref(null);
const forecastData = ref(null);
const hourlyForecast = ref(null);
const loading = ref(false);
const error = ref(null);

const fetchWeather = async () => {
  loading.value = true;
  error.value = null;
  try {
    const response = await fetch(`${WEATHER_URL}?q=${city.value}&appid=${API_KEY}&units=metric&lang=es`);
    if (!response.ok) throw new Error("No se encontró la ciudad");
    const data = await response.json();
    
    weatherData.value = {
      description: data.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
      temp: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      wind_speed: data.wind.speed,
      wind_deg: data.wind.deg,
      wind_gust: data.wind.gust,
      sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
      sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      visibility: (data.visibility / 1000).toFixed(1),
    };
    
    fetchForecast(data.coord.lat, data.coord.lon);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

const fetchForecast = async (lat, lon) => {
  try {
    const response = await fetch(`${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=es`);
    if (!response.ok) throw new Error("No se pudo obtener la previsión");
    const data = await response.json();

    forecastData.value = data.list.filter((item, index) => index % 8 === 0).map(day => ({
      date: new Date(day.dt * 1000).toLocaleDateString(),
      temp: day.main.temp,
      description: day.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`
    }));

    // Previsión por horas (próximas 10 horas)
    hourlyForecast.value = data.list.slice(0, 10).map(hour => ({
      time: new Date(hour.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      temp: hour.main.temp,
      description: hour.weather[0].description,
      icon: `https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`
    }));

  } catch (err) {
    error.value = err.message;
  }
};
</script> -->
<template>
  <div class="weather-container">

    <!-- <input v-model="city" placeholder="Introduce una ciudad" />
    <button @click="fetchWeather">Buscar</button>

    <p v-if="loading">Cargando...</p>
    <p v-if="error" style="color: red">{{ error }}</p> -->
    <div v-if="weatherData" class="weather-info">
      <h1 class="city-title">{{ city }}</h1>
      <h2 class="temperature-title">{{ weatherData.temp }}°C</h2>
      <p>Mín: {{ weatherData.temp_min }}°C<span class="invisible">__</span> Máx: {{ weatherData.temp_max }}°C</p>
      <p class="weather-description">{{ weatherData.description }}</p>

    </div>

    <!-- Forecast de las próximas 10 horas -->
    <div v-if="hourlyForecast" class="hourly-forecast">
      <h3 class="hour-title">PREVISIÓN DE 10 HORAS</h3>
      <swiper :modules="[Navigation, Pagination]" :slides-per-view="6" :space-between="10" class="swiper-container"
        autoplay="true">
        <swiper-slide v-for="(hour, index) in hourlyForecast" :key="index" class="hour-card">
          <p>{{ hour.time }}</p>
          <img :src="hour.icon" alt="Weather icon" />
          <p>{{ hour.temp }}°C</p>

        </swiper-slide>
      </swiper>
    </div>

    <!-- Forecast para los próximos 7 días -->
    <div v-if="forecastData" class="forecast">
      <h2>Previsión para los próximos 7 días</h2>
      <div v-for="(day, index) in forecastData" :key="index" class="forecast-day">
        <p class="forecast-date">{{ day.date }}</p>
        <img :src="day.icon" alt="icono clima" class="forecast-icon" />
        <p class="forecast-temp">🌡️ {{ day.temp }}°C</p>
        <p class="forecast-description">☁️ {{ day.description }}</p>
      </div>
    </div>
  </div>
  <p>🌡️ {{ weatherData.temp }}°C (Sensación térmica: {{ weatherData.feels_like }}°C)</p>
  <p>💧 Humedad: {{ weatherData.humidity }}%</p>
  <p>🔽 Presión: {{ weatherData.pressure }} hPa</p>
  <p>💨 Viento: {{ weatherData.wind_speed }} m/s (Dirección: {{ weatherData.wind_deg }}°)</p>
  <p v-if="weatherData.wind_gust">💨 Ráfagas: {{ weatherData.wind_gust }} m/s</p>
  <p>🌅 Amanecer: {{ weatherData.sunrise }}</p>
  <p>🌇 Atardecer: {{ weatherData.sunset }}</p>
  <p>🌫️ Visibilidad: {{ weatherData.visibility }} km</p>
</template>

<script setup>
import { ref } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const city = ref("Madrid");

const weatherData = ref({
  description: "Cielo despejado",
  icon: "https://openweathermap.org/img/wn/01d.png",
  temp: 26,
  feels_like: 25,
  temp_min: 22,
  temp_max: 28,
  humidity: 55,
  pressure: 1015,
  wind_speed: 4.2,
  wind_deg: 180,
  wind_gust: 5.8,
  sunrise: "07:15 AM",
  sunset: "06:45 PM",
  visibility: 10,
});

const hourlyForecast = ref([
  { time: "12:00", temp: 26, description: "Soleado", icon: "https://openweathermap.org/img/wn/01d.png" },
  { time: "13:00", temp: 27, description: "Pocas nubes", icon: "https://openweathermap.org/img/wn/02d.png" },
  { time: "14:00", temp: 28, description: "Despejado", icon: "https://openweathermap.org/img/wn/01d.png" },
  { time: "15:00", temp: 27, description: "Soleado", icon: "https://openweathermap.org/img/wn/01d.png" },
  { time: "16:00", temp: 26, description: "Algo nublado", icon: "https://openweathermap.org/img/wn/02d.png" },
  { time: "17:00", temp: 25, description: "Soleado", icon: "https://openweathermap.org/img/wn/01d.png" },
  { time: "18:00", temp: 24, description: "Cielo despejado", icon: "https://openweathermap.org/img/wn/01n.png" },
  { time: "19:00", temp: 23, description: "Cielo despejado", icon: "https://openweathermap.org/img/wn/01n.png" },
  { time: "20:00", temp: 22, description: "Despejado", icon: "https://openweathermap.org/img/wn/01n.png" },
  { time: "21:00", temp: 21, description: "Noche clara", icon: "https://openweathermap.org/img/wn/01n.png" },
]);

const forecastData = ref([
  { date: "LUN", temp: 25, description: "Soleado", icon: "https://openweathermap.org/img/wn/01d.png" },
  { date: "MAR", temp: 23, description: "Parcialmente nublado", icon: "https://openweathermap.org/img/wn/02d.png" },
  { date: "MIE", temp: 22, description: "Lluvias ligeras", icon: "https://openweathermap.org/img/wn/10d.png" },
  { date: "JUE", temp: 24, description: "Soleado", icon: "https://openweathermap.org/img/wn/01d.png" },
  { date: "VIE", temp: 27, description: "Soleado", icon: "https://openweathermap.org/img/wn/01d.png" },
  { date: "SAB", temp: 26, description: "Nublado", icon: "https://openweathermap.org/img/wn/04d.png" },
  { date: "DOM", temp: 28, description: "Soleado", icon: "https://openweathermap.org/img/wn/01d.png" },
]);

// Control del carrusel
</script>

<style>
body {
  margin: 0;
  padding: 0;
}


.forecast {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1), 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.forecast-day {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.forecast-date {
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.forecast-icon {
  width: 50px;
  height: 50px;
  margin: 5px 0;
}

.forecast-temp {
  font-size: 1.25rem;
  margin: 5px 0;
}

.forecast-description {
  font-size: 1rem;
  color: hsl(211, 73%, 78%);
  font-weight: bold;
  margin-top: 5px;
}

.weather-container {
  text-align: center;
  font-family: Arial, sans-serif;
  /* background: linear-gradient(to bottom, #95ddfa, #60a5fa, #4f46e5); */
  background: linear-gradient(to bottom, #006f8e, #3b82f6, #4f46e5);
  color: white;
  padding: 0;
  margin: 0;
  overflow: hidden;
  border: none;
  /* Sin borde */
  outline: none;
  /* Sin contorno */
  box-shadow: none;
  /* Sin sombra */
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.invisible {
  opacity: 0;
}

.city-title {
  font-size: 3rem;
  font-weight: 100;

}

.temperature-title {
  font-size: 2.25rem;
  margin-top: -25px;
  font-weight: 700;

}

.weather-description {
  font-size: 1.25rem;
  color: hsl(211, 73%, 78%);

  font-weight: bold;
  margin-top: -15px;
}

.weather-info,
.forecast {
  border-radius: 10px;
  /* box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.1); */
  width: 95vw;
  margin-bottom: 40px;

}

.hourly-forecast {
  width: 95vw;
  overflow: hidden;
  margin-top: 20px;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
  border-radius: 10PX;
  backdrop-filter: blur(4px);

}

.swiper-container {
  width: 100%;
  padding: 10px 0px;

}

.hour-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.1);

  padding: 5px;
  border-radius: 10px;
  max-height: 150px;


  box-sizing: border-box;
}

.forecast-day {
  padding: 10px;
  margin: 5px;
  display: inline-block;

}

input {
  margin: 10px;
  padding: 5px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}

h1 {
  color: white;
  font-size: 3rem;
}

h2 {
  font-size: 1.25rem;
}

p {
  font-size: 1rem;
}
</style>
