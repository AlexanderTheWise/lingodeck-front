import LoginPage from "@/pages/Login/LoginPage.vue";
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
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
