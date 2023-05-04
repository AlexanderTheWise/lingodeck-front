<script setup lang="ts">
import { RouterLink } from "vue-router";
import FormEyes from "@/components/FormEyes/FormEyes.vue";
import CredentialsForm from "@/components/CredentialsForm/CredentialsForm.vue";
import userServices from "@/services/user/userServices";

const { registerUser } = userServices();
</script>

<template>
  <div class="credentials-page box-column">
    <div class="credentials-page__eyes-form">
      <FormEyes />
      <CredentialsForm @submit="registerUser">Sign up</CredentialsForm>
    </div>
    <span class="credentials-page__redirection"
      >Already have an account?
      <RouterLink class="credentials-page__link" :to="{ name: 'Log in' }"
        >Log in</RouterLink
      >!</span
    >
  </div>
</template>
