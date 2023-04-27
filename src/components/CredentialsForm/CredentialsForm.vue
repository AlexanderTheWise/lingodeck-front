<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import EyeOpen from "../icons/EyeOpen.vue";
import EyeClosed from "../icons/EyeClosed.vue";
import type { UserCredentials } from "../../types";

defineEmits<{ (e: "submit", user: UserCredentials): void }>();

const commonAttributes = {
  maxLength: 24,
  pattern: "^[a-zA-Z0-9]{8,24}$",
};

const credentials = reactive<UserCredentials>({
  username: "",
  password: "",
});

const isVisible = ref(false);
const areCorrect = computed(() =>
  Object.values(credentials).every((value) => /^[a-zA-Z0-9]{8,24}$/.test(value))
);
</script>

<template>
  <form
    class="credentials box-column"
    @submit.prevent="$emit('submit', credentials)"
  >
    <fieldset class="credentials__set box-column">
      <legend class="credentials__title">
        <slot name="purpose"></slot> To Continue
      </legend>
      <label>
        Username
        <input
          type="text"
          class="credentials__entry"
          placeholder="Enter username"
          v-bind="commonAttributes"
          v-model="credentials.username"
        />
      </label>

      <label>
        Password
        <div class="credentials__entry box-row">
          <input
            :type="isVisible ? 'text' : 'password'"
            placeholder="Enter password"
            v-bind="commonAttributes"
            v-model="credentials.password"
          />

          <button
            type="button"
            class="credentials__eye-toggle box-column"
            @click.stop="isVisible = !isVisible"
          >
            <EyeOpen v-if="isVisible" />
            <EyeClosed v-else />
          </button>
        </div>
      </label>
    </fieldset>
    <button class="credentials__button" :disabled="!areCorrect">
      <slot name="purpose"></slot>
    </button>
  </form>
</template>

<style scoped lang="scss">
.credentials {
  gap: 1.6rem;
  text-align: center;
  align-items: center;

  &__title {
    font-size: 1.7777777777777777rem;
    font-weight: 800;
    margin-bottom: 1.44rem;
  }

  &__set {
    align-items: center;
    gap: inherit;
    font-weight: 600;
  }

  &__entry {
    justify-content: space-between;
    margin-top: 0.61rem;
    padding-left: 1rem;
    padding-right: 1rem;

    width: 13.278rem;
    height: 2.556rem;

    border: 2px solid #0080ff;
    border-radius: 0.556rem;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

    input[type="text"],
    input[type="password"] {
      border: none;
      width: 80%;
      height: 100%;
    }
  }

  &__button {
    width: 5.94rem;
    height: 2.22rem;
    font-weight: 700;
    color: white;
    background-color: #4353ff;
    border-radius: 2.22rem;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: #9099ff;
    }

    &:hover {
      background-color: #1024ff;
    }
  }

  &__eye-toggle {
    justify-content: center;
  }
}
</style>
