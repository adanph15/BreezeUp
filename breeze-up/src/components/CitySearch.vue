<template>
  <div class="overlay" @click.self="closeSearchPopup">
    <div class="city-search">
      <input v-model="query" @input="fetchCities" placeholder="Buscar ciudad..." class="input" />
      <button @click="searchCity" class="search-btn">Buscar</button>
      <ul v-if="cities.length" class="results">
        <li v-for="city in cities" :key="city.id" @click="selectCity(city)">
          {{ city.name }}, {{ city.country }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      query: "",
      cities: [],
    };
  },
  methods: {
  async fetchCities() {
    if (this.query.length < 3) {
      this.cities = [];
      return;
    }
    const apiKey = process.env.VUE_APP_API_KEY;
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${this.query}&limit=5&appid=${apiKey}`;

    try {
      const response = await axios.get(url);
      this.cities = response.data.map((city) => ({
        id: city.lat + city.lon,
        name: city.name,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
      }));
    } catch (error) {
      console.error("Error al buscar ciudades", error);
    }
  },
  selectCity(city) {
    this.$emit("city-selected", city);
    this.query = city.name;
    this.cities = [];
  },
  searchCity() {
    if (this.query.trim()) {
      this.$emit("city-selected", { name: this.query });
    }
  },
  closeSearchPopup() {
    this.$emit("close");
  }
}
};
</script>
<style scoped>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 1000;
}

.city-search {
  margin-top: 20vh;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(0, 0, 0, 0.1);
  background-image: linear-gradient(to bottom left, #115e59, #0c4a6e);
  padding: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 85%;
}

.input {
  width: 95%;
  padding: 10px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px; 
}

.search-btn {
  padding: 10px;
  background-color: #4caf99;
  box-shadow: 0px 4px 6px rgba(255, 254, 254, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
  width: 50%;
}

.results {
  background: rgba(255, 255, 255, 0.2);
  width: 95%;
  border: 0px solid #ccc;
  border-top: none;
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 10px;
  max-height: 200px;
  overflow-y: auto;
  border-radius: 10px;
  z-index: 10;
}

.results li {
  padding: 10px;
  cursor: pointer;
}
</style>