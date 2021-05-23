<template>
  <div id="nav" v-if="route.name !== 'Login' && route.name !== 'Signup'">
    <logo />
    <div class="links">
      <!-- <router-link to="/logout" >Logout</router-link> -->
      <main-button buttonText="Logout" @click-handler="logout" />
    </div>
    <!-- <router-link to="/">Home</router-link> | -->
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import Logo from "./Logo.vue";
import MainButton from "./MainButton.vue";
export default {
  components: { Logo, MainButton },
  setup() {
    const router = useRouter();
    const route = useRoute();
    console.log(route.name);
    const logout = () => {
      console.log("logout");
      localStorage.clear();
      router.push({ name: "Login" });
    };

    return {
      logout,
      route,
    };
  },
};
</script>
