<script setup lang="ts">
import Loader from "./components/Loader/Loader.vue";
import Modal from "./components/Modal/Modal.vue";
import LoginPage from "./pages/Login/LoginPage.vue";
</script>

<template>
  <Modal />
  <Loader />
  <main class="box-column">
    <LoginPage />
  </main>
</template>
