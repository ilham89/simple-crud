<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
</script>
<template>
  <h1>Oops.., page not found</h1>
  <el-button type="primary" @click="router.push('/')">Back home</el-button>
</template>
