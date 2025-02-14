<!-- 





<script setup>
import { ref } from "vue";

const API_KEY = "4a62502d1d5736092df5f1cdf72001fa"; // Reemplaza con tu API Key
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



<template>
  <div class="weather-container">
    <h1>Aplicación del Tiempo</h1>

    <div class="weather-info">
      <h2>{{ ciudad }}</h2>
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
    <div class="container-info">
      <div class="info">
        <div class="mini-info">
          <h3>👁️Visibilidad</h3>
          <p>{{ weatherData.visibility }} km</p>
        </div>
      </div>
      <div class="info">
        <div class="mini-info">
          <h3 class="title-info">💧Humedad</h3>
          <div class="prueba">
            <p class="ol">{{ weatherData.humidity }}%</p>
            <p>Humedad</p>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="mini-info">
          <h3 class="title-info">👁️Visibilidad</h3>
          <div class="prueba">
            <p class="ol">{{ weatherData.visibility }} km</p>
            <p>Visibilidad</p>
          </div>
        </div>
      </div>
      <div class="info">
        <div class="mini-info">
          <h3 class="title-info">💨Viento</h3>
          <div class="prueba">
            <p class="ol">{{ weatherData.wind_speed }} m/s</p>
            <p>Dirección: {{ weatherData.wind_deg }}°</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="forecast">
      <h2>Previsión para los próximos 7 días</h2>
      <div v-for="(day, index) in forecastData" :key="index" class="forecast-day">
        <p>{{ day.date }}</p>
        <p>🌡️ {{ day.temp }}°C</p>
        <p>☁️ {{ day.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const ciudad = ref("Madrid");

const weatherData = ref({
  temp: 24,
  feels_like: 22,
  temp_min: 19,
  temp_max: 27,
  description: "Soleado",
  humidity: 60,
  pressure: 1012,
  wind_speed: 3.5,
  wind_deg: 270,
  wind_gust: 4.1,
  sunrise: "07:30 AM",
  sunset: "06:00 PM",
  visibility: 10,
});

const forecastData = ref([
  {
    date: "LUN",
    temp: 25,
    description: "Soleado",
  },
  {
    date: "MAR",
    temp: 23,
    description: "Parcialmente nublado",
  },
  {
    date: "MIE",
    temp: 22,
    description: "Lluvias ligeras",
  },
  {
    date: "JUE",
    temp: 24,
    description: "Soleado",
  },
  {
    date: "VIE",
    temp: 27,
    description: "Soleado",
  },
  {
    date: "SAB",
    temp: 26,
    description: "Nublado",
  },
  {
    date: "DOM",
    temp: 28,
    description: "Soleado",
  },
]);
</script>

<style scoped>

.container-info {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; 
  width: 95%;
}

.info {
  width: 140px; 
  height: 140px; 
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightblue;
  margin: 5px; 
  text-align: center;
  border-radius: 10%;
  /* box-shadow: 0 4px 6px rgba(0, 255, 255, 0.5), 
              /* Sombra interna con color índigo 
              inset 0 4px 6px rgba(75, 0, 130, 0.5);  */
}

.title-info{
  font-size:  1.125rem ;
  color: #555;
  margin-top: 0%;
  height: 0;
}
.ol{
  font-size:  1.5rem;
}
.mini-info{
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: self-start;
  margin-left: 8px;
  width: 100%;
  height: 100%;
}
.prueba{
  margin-top: 0%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: self-start;

}

 h3{
  
 }


.weather-container {
  text-align: center;
  font-family: Arial, sans-serif;
  background-color: #1a1a2e;
  color: white;
  padding: 20px;
}

.weather-info, .forecast {
  background-color: #333;
  border-radius: 10px;
  padding: 20px;
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

button:hover {
  background-color: #555;
}

h1 {
  color: #ff6347;
}

h2 {
  font-size: 1.25rem;
}

p {
  font-size: 1rem;

}
</style>
