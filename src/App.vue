<script setup lang="ts">
import { RouterView } from "vue-router";
import tokenServices from "./services/token/tokenServices";
import Modal from "./components/Modal/Modal.vue";
import Loader from "./components/Loader/Loader.vue";

const { getToken } = tokenServices;

getToken();
</script>

<template>
  <Modal />
  <Loader />
  <main class="box-column">
    <RouterView />
  </main>
</template>
