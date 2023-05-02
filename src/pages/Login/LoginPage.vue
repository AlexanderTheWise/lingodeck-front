<script setup lang="ts">
import CredentialsForm from "@/components/CredentialsForm/CredentialsForm.vue";
import FormEyes from "@/components/FormEyes/FormEyes.vue";
import userServices from "@/services/user/userServices";

const { loginUser } = userServices();
</script>

<template>
  <div class="credentials-page box-column">
    <div class="credentials-page__eyes-form">
      <FormEyes />
      <CredentialsForm @submit="loginUser"> Log in </CredentialsForm>
    </div>
    <span class="credentials-page__redirection"
      >Doesn't have an account? Sign up!</span
    >
  </div>
</template>

<style scoped lang="scss">
.credentials-page {
  gap: 26px;

  &__eyes-form {
    background: linear-gradient(to bottom, #0080ff, #010c80, #ffffff);
  }

  &__redirection {
    font-weight: 700;
    background-color: white;
    text-align: center;
  }
}
</style>
