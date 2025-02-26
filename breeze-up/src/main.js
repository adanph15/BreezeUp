import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);


app.config.errorHandler = (err, vm, info) => {
  console.error(`Error: ${err.toString()}\nInfo: ${info}`);
};
app.mount('#app');
