<template>
  <div class="box">
    <div class="inner-box">
      <div class="box-card">
        <span v-if="errorMessage" class="red">{{ errorMessage }}</span>
        <email-field v-model="user.email" />
        <password-field v-model="user.password" />
        <main-button buttonText="Sign up" @click-handler="signup" />
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
import MainButton from "../components/MainButton.vue";
import useFormValidation from "../modules/useFormValidation";
export default {
  components: { EmailField, PasswordField, MainButton },
  setup() {
    const router = useRouter();
    const { errors } = useFormValidation();
    const errorMessage = ref("");
    const user = reactive({
      email: "",
      password: "",
    });

    const signup = async () => {
      try {
        if (errors && (errors.email || errors.password)) return;

        await API.post("/user/register", {
          email: user.email,
          password: user.password,
        });
        router.push({ name: "Login" });
      } catch (e) {
        errorMessage.value = e;
      }
    };

    return {
      user,
      signup,
      errorMessage,
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
