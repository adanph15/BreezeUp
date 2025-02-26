<template>
  <div>
    <HomeView />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import HomeView from './HomeView.vue';

// Cambiar el favicon cuando el componente se monte
onMounted(() => {
  const link = document.querySelector("link[rel='icon']");
  if (link) {
    link.href = "/img/icons/logo.png";  // Ruta absoluta del favicon
  }
});
</script>
