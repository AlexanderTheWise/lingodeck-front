<script setup lang="ts">
import { RouterView } from "vue-router";
import tokenServices from "./services/token/tokenServices";
import Modal from "./components/Modal/Modal.vue";
import Loader from "./components/Loader/Loader.vue";
import Header from "./components/Header/Header.vue";

const { getToken } = tokenServices;

getToken();
</script>

<template>
  <Modal />
  <Loader />
  <Header />
  <main class="box-column">
    <RouterView class="router-view" />
  </main>
</template>

<style scoped>
.router-view {
  height: 100%;
}

main {
  flex: 1;
  justify-content: center;
}
</style>
