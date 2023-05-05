<script setup lang="ts">
import { ref, toRefs } from "vue";
import FlashcardDelete from "../icons/FlashcardDelete.vue";
import FlashcardModify from "../icons/FlashcardModify.vue";
import type { Flashcard } from "@/types";

const props = defineProps<{
  flashcard: Flashcard;
}>();

const { back, front, imageInfo, dueDate, language } = toRefs(props.flashcard);

const isFlipped = ref(false);
</script>

<template>
  <article class="card" @click.stop="isFlipped = !isFlipped">
    <div :class="['card__inner', isFlipped ? 'card__inner--flipped' : '']">
      <div
        :class="`card__${n == 1 ? 'front' : 'back'}`"
        v-for="n in 2"
        :key="n"
      >
        <span class="card__language">{{ language }}</span>
        <button class="card__delete">
          <FlashcardDelete />
        </button>
        <img
          :alt="n == 1 ? front : back"
          width="293"
          height="144"
          class="card__image"
          :src="imageInfo.imageBackup"
        />
        <div class="card__content box-column">
          <span class="card__due-date"
            >Due date:
            {{ new Date(dueDate).toLocaleString("es").split(",")[0] }}</span
          >
          <p>{{ n === 1 ? front : back }}</p>
          <a class="card__link-modify"><FlashcardModify /></a>
        </div>
      </div>
    </div>
  </article>
</template>

<style scoped lang="scss">
.card {
  width: 293px;
  height: 288px;
  position: relative;
  perspective: 800px;
  margin: 10px;

  &__inner {
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    cursor: pointer;

    .card__back,
    .card__front {
      height: 100%;
      width: 100%;
      position: absolute;
      backface-visibility: hidden;
      background-color: white;
    }

    &--flipped {
      transform: rotateY(180deg);
    }
  }

  &__back {
    transform: rotateY(180deg);
  }

  &__image {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
  }

  &__content {
    height: 50%;
    justify-content: center;
    align-items: center;
  }

  &__link-modify {
    position: absolute;
    left: 1%;
    bottom: 0%;
  }

  &__delete {
    position: absolute;
    right: 2.05%;
    top: 2.08%;
  }

  &__due-date {
    position: absolute;
    bottom: 40%;
    left: 5%;
    color: #e01c58;
    font-weight: 800;
  }

  &__language {
    position: absolute;
    padding: 8px;
    background-color: grey;
    opacity: 0.6;
    font-weight: 600;
    border-bottom-right-radius: 20px;
  }
}
</style>
