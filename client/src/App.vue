<template>
  <div>
    <navigation />
    <router-view></router-view>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";

export default {
  components: { Navigation },
  setup() {
    const authUser = localStorage.getItem("authToken");
    return {
      authUser,
    };
  },
};
</script>

<style>
html,
body {
  margin: 0px;
  height: 100%;
  font-family: "Telex", sans-serif;
}
p {
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
}
h1,
h2 {
  margin: 0;
  font-size: 30px;
}
.article__info {
  padding: 0 2rem;
  max-width: 60%;
}
.article__subheadline {
  color: #e3120b;
  font-weight: 400;
  display: inline-block;
  margin-bottom: 0.5rem;
}
.article__description {
  margin-top: 2.18rem;
}
.red {
  color: #e3120b;
}

img {
  width: 100%;
  height: auto;
}
.links {
  float: right;
}
.links a {
  color: black;
  text-decoration: none;
}
</style>
