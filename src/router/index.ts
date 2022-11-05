import { createWebHistory, createRouter } from "vue-router";
import Login from "../views/login.vue";
import Home from "../views/home.vue";
import Register from "../views/register.vue";
import Detail from "../views/detail.vue";
import PageNotFound from "../views/notFound.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/users/:id",
    name: "Detail",
    component: Detail,
  },
  { path: "/:pathMatch(.*)*", component: PageNotFound },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
