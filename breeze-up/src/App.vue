<template>
  <div>
    <HomeView />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import HomeView from './components/HomeView.vue';

onMounted(() => {
  const link = document.querySelector("link[rel='icon']");
  if (link) {
    link.href = "/img/icons/logo.png";
  }
});
</script>
