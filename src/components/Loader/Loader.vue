<script setup lang="ts">
import useUiStore from "@/store/ui/uiStore";

const uiState = useUiStore().ui;
</script>

<template>
  <div
    class="loader-container box-column centered-box"
    v-if="uiState.isLoading"
  >
    <div class="loader"></div>
  </div>
</template>

<style scoped lang="scss">
.loader-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 9999;
}
.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  animation: rotate 1s linear infinite;

  &::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid #0080ff;
    animation: prixClipFix 2s linear infinite;
  }
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes prixClipFix {
  0% {
    clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
  }
  25% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
  }
  50% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
  }
  75% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  }
  100% {
    clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
  }
}
</style>
