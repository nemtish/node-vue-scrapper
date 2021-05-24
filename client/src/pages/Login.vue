<template>
  <div class="box">
    <div class="inner-box">
      <div class="box-card">
        <span v-if="errorMessage" class="red">{{ errorMessage }}</span>
        <email-field v-model="email" />
        <password-field v-model="password" />

        <div class="button-box">
          <main-button
            buttonText="Login"
            @click-handler="login"
            :disabled="!email || !password"
          />
          <main-button
            buttonText="Sign up"
            @click-handler.native="router.push({ name: 'Signup' })"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import API from "../services/API";
import EmailField from "../components/EmailField.vue";
import PasswordField from "../components/PasswordField.vue";
import MainButton from "../components/MainButton.vue";
import useFormValidation from "../modules/useFormValidation";

export default {
  components: { EmailField, PasswordField, MainButton },
  setup() {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();
    const { errors } = useFormValidation();

    const login = async () => {
      if (errors && (errors.email || errors.password)) return;
      try {
        await API.authenticate("/user/login", {
          email: email.value,
          password: password.value,
        });

        router.push("/");
      } catch (e) {
        errorMessage.value = e;
      }
    };

    return {
      email,
      password,
      login,
      router,
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
.button-box {
  display: flex;
  justify-content: space-between;

  /* padding: 10px; */
}
button {
  width: 48% !important;
}
</style>
