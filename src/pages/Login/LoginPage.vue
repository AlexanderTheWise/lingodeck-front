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
      <CredentialsForm @submit="loginUser">Log in</CredentialsForm>
    </div>
    <span class="credentials-page__redirection"
      >Doesn't have an account?
      <RouterLink class="credentials-page__link" :to="{ name: 'Register' }"
        >Sign up</RouterLink
      >!</span
    >
  </div>
</template>
