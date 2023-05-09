<script setup lang="ts">
import FlashcardsList from "@/components/FlashcardList/FlashcardsList.vue";
import Previous from "../../components/icons/Previous.vue";
import Counter from "@/components/Counter/Counter.vue";
import Next from "../../components/icons/Next.vue";
import useFlashcards from "@/composables/useFlashcards";
import Filter from "@/components/Filter/Filter.vue";

const { flashcards, language, page } = useFlashcards();

function changeLanguage(selectedLanguage: string) {
  language.value = selectedLanguage;
}
</script>
<template>
  <div class="flashcards-page box-column centered-box">
    <Suspense>
      <Counter />
    </Suspense>

    <Filter @change-language="changeLanguage" />

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
  flex: 1;
  margin-top: 70px;
  text-align: center;
  justify-content: initial;
  gap: 20px;
  &__pagination {
    width: 200px;
    height: 45px;
    border-radius: 50px;
    background-color: #010c80;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    gap: 50px;
  }

  &__counter {
    gap: 10px;
    color: #e01c58;
    font-weight: 700;
    font-size: 24px;
  }
}
</style>
