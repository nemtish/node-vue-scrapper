import { createWebHashHistory, createRouter } from "vue-router";
import Home from "./../pages/Home.vue";
import Login from "./../pages/Login.vue";
import Signup from "./../pages/Signup.vue";
import Article from "./../pages/Article.vue";
import isAuthenticated from "./../services/user";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/article/:articleUrl",
    name: "Article",
    component: Article,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  let routeAllowed = to.name !== "Login" && to.name !== "Signup";
  if (routeAllowed && !isAuthenticated()) next({ name: "Login" });
  else next();
});

export default router;
