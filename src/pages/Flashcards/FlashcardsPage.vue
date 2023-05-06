<script setup lang="ts">
import FlashcardsList from "@/components/FlashcardList/FlashcardsList.vue";
import Previous from "../../components/icons/Previous.vue";
import Counter from "@/components/Counter/Counter.vue";
import Next from "../../components/icons/Next.vue";
import languages from "../../assets/languages.json";
import useFlashcards from "@/composables/useFlashcards";

const { flashcards, language, page } = useFlashcards();
</script>
<template>
  <div class="flashcards-page box-column centered-box">
    <Suspense>
      <Counter />
    </Suspense>

    <select class="flashcards-page__filter" v-model="language">
      <option v-for="{ id, name } in languages" :key="id" :value="name">
        {{ name }}
      </option>
    </select>

    <FlashcardsList :flashcards="flashcards" />

    <div class="flashcards-page__pagination box-row centered-box">
      <button
        class="flashcards-page__previous"
        @click.stop="page -= page === 1 ? 0 : 1"
      >
        <Previous v-once />
      </button>
      <span>{{ page }}</span>
      <button class="flashcards-page__next" @click.stop="page++">
        <Next v-once />
      </button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flashcards-page {
  gap: 30px;

  &__filter {
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
    background: url("../../assets/dropdown.svg") no-repeat 80%;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  &__pagination {
    width: 200px;
    height: 45px;
    border-radius: 50px;
    background-color: #010c80;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    gap: 50px;
  }

  &__counter {
    justify-content: initial;
    gap: 10px;
    color: #e01c58;
    font-weight: 700;
    font-size: 24px;
  }
}
</style>
