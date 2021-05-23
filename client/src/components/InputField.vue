<template>
  <div class="input-text">
    <input
      :id="`input-${label.toLowerCase()}`"
      :type="inputType"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  emits: ["update:modelValue"],
  props: {
    modelValue: String,
    inputType: {
      type: String,
      default: "text",
    },
    placeholder: String,
    label: String,
  },
  setup() {},
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
</style>
