import FlashcardsPage from "@/pages/Flashcards/FlashcardsPage.vue";
import LoginPage from "@/pages/Login/LoginPage.vue";
import ModifyPage from "@/pages/Modify/ModifyPage.vue";
import CreatePage from "@/pages/Create/CreatePage.vue";
import RegisterPage from "@/pages/Register/RegisterPage.vue";
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

const routes: readonly RouteRecordRaw[] = [
  {
    path: "/",
    name: "Log in",
    component: () => Promise.resolve(LoginPage),
  },
  {
    path: "/register",
    name: "Register",
    component: () => Promise.resolve(RegisterPage),
  },
  {
    path: "/flashcards",
    name: "Flashcards",
    component: () => Promise.resolve(FlashcardsPage),
  },
  {
    path: "/modify/:id",
    name: "Modify",
    component: () => Promise.resolve(ModifyPage),
  },
  {
    path: "/create",
    name: "Create",
    component: () => Promise.resolve(CreatePage),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
