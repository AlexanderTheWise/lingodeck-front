<script setup lang="ts">
import languages from "../../assets/languages.json";

defineEmits<{
  (event: "changeLanguage", language: string): void;
}>();
</script>

<template>
  <select
    class="filter"
    @change="
      $emit('changeLanguage', ($event.target as HTMLSelectElement).value)
    "
    onblur="this.size = 1"
    onfocus="this.size = 5;"
  >
    <option
      v-for="{ id, name } in languages"
      :key="id"
      :value="name"
      onclick="this.parentNode.blur()"
    >
      {{ name }}
    </option>
  </select>
</template>

<style scoped lang="scss">
.filter {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  font-size: 20px;
  font-weight: 500;
  width: 190px;
  padding: 10px;
  padding-left: 40px;
  border: none;
  border-radius: 20px;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 1px 4px 4px rgba(0, 0, 0, 0.25);
  background-image: url("../../assets/dropdown.svg") no-repeat 80%;

  &::-webkit-scrollbar {
    display: none;
  }

  &:focus {
    background: none;
  }
}
</style>
