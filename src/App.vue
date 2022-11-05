<script setup lang="ts">
import { onMounted } from "vue";
import { useQueryProvider } from "vue-query";

onMounted(() => {
  useQueryProvider();
});
</script>

<template>
  <div class="app">
    <router-view />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}
</style>
