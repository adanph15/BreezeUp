# BreezeUp

## Description
BreezeUp provides real-time weather information, hourly forecasts, and a 5-day weather outlook for any city worldwide. The app is built using Vue.js and integrates with the OpenWeather API to fetch weather data.

## Features
- **Real-time Weather Data**: Displays current temperature, weather conditions, wind speed, humidity, and visibility.
- **Hourly Forecast**: Provides a 10-hour weather forecast with temperature and weather icons.
- **5-Day Forecast**: Displays daily weather conditions, including minimum and maximum temperatures.
- **Dynamic Background**: Changes background color based on time of day (morning, evening, night).
- **Search Functionality**: Users can search for weather information by city name.

## Technologies Used
- Vue.js 3
- Vue Router
- Swiper.js (for carousel views)
- OpenWeather API
- HTML, CSS, JavaScript

## Installation
### Prerequisites
Make sure you have **Node.js** and **npm** installed on your system.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/breezeup.git
   cd breezeup
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to:
   ```
   http://localhost:5173
   ```

## API Key Setup
This app uses OpenWeather API to fetch weather data. Replace `API_KEY` in `script setup` with your OpenWeather API key.

## Usage
1. Open the app and enter a city name in the search field.
2. Click the search button to fetch weather data.
3. View real-time weather details, hourly forecasts, and 5-day predictions.
4. The app dynamically updates backgrounds based on the time of day.

## License
This project is licensed under the MIT License.

