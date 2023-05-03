<script setup lang="ts">
import { ref, watch } from "vue";
import ModalClose from "../icons/ModalClose.vue";
import useUiStore from "@/store/ui/uiStore";

const uiStore = useUiStore();
const modal = ref<HTMLDialogElement | null>(null);

watch(uiStore.ui, ({ modal: { isOpened } }) => {
  if (isOpened) {
    modal.value?.close();
    modal.value?.showModal();
  } else {
    modal.value?.close();
  }
});
</script>

<template>
  <dialog
    ref="modal"
    :class="`modal ${uiStore.ui.modal.isError ? 'modal--error' : ''}`"
  >
    <button class="modal__button" @click="uiStore.closeModal">
      <ModalClose />
    </button>
    <h2 class="modal__title">{{ uiStore.ui.modal.title }}</h2>
    <p>{{ uiStore.ui.modal.message }}</p>
  </dialog>
</template>

<style scoped lang="scss">
.modal {
  border: none;
  border-radius: 16px;
  font-weight: 600;
  background-color: #3b9353;
  color: white;
  width: 300px;

  &--error {
    background-color: #c90c00;
  }

  &::backdrop {
    background-color: transparent;
    backdrop-filter: blur(5px);
  }

  &__button {
    position: absolute;
    right: 3%;
  }

  &__title {
    font-size: 20px;
  }
}
</style>
