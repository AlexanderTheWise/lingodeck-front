<script setup lang="ts">
import { RouterLink } from "vue-router";
import Logo from "../icons/Logo.vue";
import useUserStore from "@/store/user/userStore";
import CardsKanji from "../icons/CardsKanji.vue";
import Plus from "../icons/Plus.vue";
import Logout from "../icons/Logout.vue";
import userServices from "@/services/user/userServices";

const { logoutUser } = userServices();
const userStore = useUserStore();
</script>

<template>
  <header class="header box-column centered-box">
    <Logo />
    <nav class="header__navigation" v-if="userStore.user.isLogged">
      <ul class="header__links box-row centered-box">
        <li>
          <RouterLink
            :to="{ name: 'Flashcards' }"
            class="box-column centered-box"
          >
            <CardsKanji />
            <span class="header__link-text">Flashcards</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'Create' }" class="box-column centered-box">
            <Plus />
            <span class="header__link-text">Create card</span>
          </RouterLink>
        </li>
        <li>
          <button class="box-column centered-box" @click="logoutUser">
            <Logout />
            <span class="header__link-text">Log out</span>
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped lang="scss">
.header {
  justify-content: space-around;
  padding: 20px;
  box-shadow: 0px 8px 4px #7c80a9;

  &__link-text {
    display: none;
  }

  &__navigation {
    flex: 1;
  }

  &__links {
    justify-content: space-evenly;
  }
}

@media (min-width: 600px) {
  .header {
    flex-direction: row;

    &__link-text {
      display: inline;
    }
  }
}
</style>
