<template>
  <div class="overlay" @click.self="closeSearchPopup">
    <div class="city-search">
      <input v-model="query" @input="fetchCities" placeholder="Buscar ciudad..." class="input" />
      <button @click="searchCity" class="search-btn">Buscar</button>
      <p v-if="error" class="error-message">No se encontraron resultados. Intenta otra ciudad.</p>
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
      error: false,
    };
  },
  methods: {
    async fetchCities() {
      if (this.query.trim().length < 3) {
        this.cities = [];
        this.error = false;
        return;
      }
      const apiKey = "4a62502d1d5736092df5f1cdf72001fa";
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(this.query.trim())}&limit=5&appid=${apiKey}`;
      
      try {
        const response = await axios.get(url);
        if (response.data && response.data.length > 0) {
          this.cities = response.data.map((city) => ({
            id: `${city.lat},${city.lon}`,
            name: city.name,
            country: city.country,
            lat: city.lat,
            lon: city.lon,
          }));
          this.error = false;
        } else {
          this.cities = [];
          this.error = true;
        }
      } catch (error) {
        console.error("Error al buscar ciudades", error);
        this.error = true;
      }
    },
    selectCity(city) {
      this.$emit("city-selected", city);
      this.query = city.name;
      this.cities = [];
      this.error = false;
    },
    searchCity() {
      if (!this.cities.length) {
        this.error = true;
      } else {
        this.error = false;
        this.$emit("city-selected", this.cities[0]);
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
  width: 350px;
    
}

@media (max-width: 768px) {
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

.error-message {
  color: red;
  margin-top: 10px;
  font-size: 14px;
}
</style>
