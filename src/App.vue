<script setup lang="ts">
import { RouterView } from "vue-router";
import Loader from "./components/Loader/Loader.vue";
import Modal from "./components/Modal/Modal.vue";
</script>

<template>
  <Modal />
  <Loader />
  <main class="box-column">
    <RouterView />
  </main>
</template>
