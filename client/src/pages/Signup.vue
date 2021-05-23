<template>
  <div class="box">
    <div class="inner-box">
      <div class="box-card">
        <email-field v-model="user.email" />
        <password-field v-model="user.password" />
        <main-button buttonText="Sign up" @click-handler="signup" />
        <span v-if="test">{{ test }} </span>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import API from "../services/API";
import EmailField from "../components/EmailField.vue";
import PasswordField from "../components/PasswordField.vue";
import InputField from "../components/InputField.vue";
import MainButton from "../components/MainButton.vue";
export default {
  components: { EmailField, PasswordField, InputField, MainButton },
  setup() {
    const router = useRouter();
    let test = ref("");
    const user = reactive({
      email: "",
      password: "",
      confirmPassword: "",
    });

    const signup = async () => {
      try {
        const savedUser = await API.post("/user/register", {
          email: user.email,
          password: user.password,
        });
        router.push({ name: "Login" });
        r;
      } catch (e) {
        console.error(e.message);
      }
    };

    return {
      user,
      signup,
      test,
    };
  },
};
</script>
<style scoped>
.box-card {
  margin-top: 50%;
}
.box {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inner-box {
  width: 50%;
}
</style>
