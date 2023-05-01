<script setup lang="ts">
import useEyes from "../../composables/useEyes";

useEyes();
</script>

<template>
  <div class="box-row">
    <div class="eye"></div>
    <div class="eye"></div>
  </div>
</template>

<style scoped>
.box-row {
  gap: 100px;
}
.eye {
  width: 100px;
  height: 100px;
}
</style>
