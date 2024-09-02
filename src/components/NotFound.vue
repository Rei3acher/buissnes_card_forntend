<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";

const router = useRouter();
const route = useRoute();

onMounted(() => {
  router.replace("/404");
});
</script>

<template>
  <v-container class="align-content-center header">
    <p>404</p>
  </v-container>
</template>

<style scoped></style>
