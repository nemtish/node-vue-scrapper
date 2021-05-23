<template>
  <button class="button" @click="$emit('clickHandler')">
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    buttonText: String,
  },
  setup(props, context) {},
};
</script>

<style scoped>
.button-wrapper {
  display: inline-block;
}
a.button {
  display: block;
  line-height: 52px;
}
.button {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  width: 100%;
  background-color: #000;
  color: #fff;
  border: none;
  /* height: 55px; */
  padding: 10px 18px;
  font-size: 1rem;
  text-align: center;
  cursor: pointer;
}
</style>
