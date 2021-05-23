<template>
  <div class="box">
    <p v-if="errorMessage" class="red">{{ errorMessage }}</p>
    <div class="inner-box">
      <div class="box-card">
        <input-field label="Username" placeholder="Email" v-model="email" />
        <input-field
          label="Password"
          inputType="password"
          placeholder="Password"
          v-model="password"
        />

        <div class="button-box">
          <main-button buttonText="Login" @click-handler="login" />
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
import InputField from "../components/InputField.vue";
import MainButton from "../components/MainButton.vue";

export default {
  components: { InputField, MainButton },
  setup(props) {
    const email = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    const login = async () => {
      try {
        const user = await API.authenticate("/user/login", {
          email: email.value,
          password: password.value,
        });

        router.push("/");
      } catch (e) {
        // not working for some strange reason
        errorMessage.value = e.message;
        alert(e.message);
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
