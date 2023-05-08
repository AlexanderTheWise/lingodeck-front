<script setup lang="ts">
import Filter from "../Filter/Filter.vue";
import { RouterLink } from "vue-router";
import useFlashcardsForm from "../../composables/useFlashcardsForm";
import { type NewOrModifiedCard } from "../../types";

defineEmits<{
  (event: "submit", flashcard: NewOrModifiedCard): void;
}>();

const { changeFile, changeLanguage, newFlashcard, areCorrect } =
  useFlashcardsForm();
</script>

<template>
  <form
    class="flashcards-form box-column"
    @submit.prevent="$emit('submit', newFlashcard)"
  >
    <fieldset class="flashcards-form__fields box-column centered-box">
      <label>
        <span>Front</span>
        <input
          type="text"
          class="flashcards-form__entry"
          placeholder="Add a word"
          v-model="newFlashcard.front"
          maxlength="24"
        />
      </label>
      <label>
        <span>Back</span>
        <input
          type="text"
          class="flashcards-form__entry"
          placeholder="Add a translation"
          v-model="newFlashcard.back"
          maxlength="24"
        />
      </label>
      <label @click.prevent>
        <span>Language</span>

        <Filter @change-language="changeLanguage" />
      </label>
      <label class="image-label">
        <span>Select an image</span>
        <input
          type="file"
          class="flashcards-form__entry image-entry"
          onchange="this.previousSibling.textContent = this.files[0].name"
          @change="changeFile"
        />
      </label>
    </fieldset>

    <div class="centered-box box-row">
      <button class="flashcards-form__action action" :disabled="!areCorrect">
        <slot></slot>
      </button>
      <RouterLink
        class="flashcards-form__action link box-column centered-box"
        :to="{ name: 'Flashcards' }"
        >Cancel</RouterLink
      >
    </div>
  </form>
</template>

<style scoped lang="scss">
label span {
  font-weight: 600;
}
div.centered-box {
  justify-content: space-around;
}
.flashcards-form {
  width: 293px;
  padding: 20px 27px;
  border-style: solid;
  border-width: 2px 0px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  gap: 20px;

  &__entry {
    justify-content: space-between;
    margin-top: 0.61rem;
    padding-left: 1rem;
    padding-right: 1rem;

    width: 239px;
    height: 2.556rem;

    border: 2px solid #0080ff;
    border-radius: 0.556rem;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }

  &__fields {
    gap: 20px;
  }

  &__action {
    color: white;
    width: 5.94rem;
    height: 2.22rem;
    font-weight: 700;
    border-radius: 40px;
    cursor: pointer;

    &:hover {
      filter: brightness(80%);
    }
  }
}

.image-label {
  color: white;
  background: #0ae8cd;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
}
.image-entry {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.link {
  text-align: center;
  background-color: #4353ff;
}

.action {
  background-color: #e01c58;

  &:disabled {
    background-color: #de8ca5;
    cursor: not-allowed;
  }
}

@media (min-width: 700px) {
  .flashcards-form {
    width: 617px;

    &__entry {
      text-align: center;
    }

    &__fields {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 30px;

      label {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
      }
    }
  }
}
</style>
