<template>
  <div>
    <input
      type="email"
      placeholder="Email"
      autocomplete="off"
      v-model="input"
      @keyup="validate"
      @blur="validate"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <div>{{ errors.email }}</div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useFormValidation from "../modules/useFormValidation";

export default {
  emits: ["update:modelValue"],
  setup() {
    let input = ref(null);
    let { validateEmailField, errors } = useFormValidation();
    const validate = () => {
      validateEmailField("email", input.value);
      console.log("validate", errors.email);
    };

    return { validate, input, errors };
  },
};
</script>

<style scoped>
input {
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  box-sizing: border-box;
  padding: 1rem;
}
input::placeholder {
  color: #b30000;
}
span {
  position: abolute;
  display: inline-block;
  color: #b30000;
}
</style>
