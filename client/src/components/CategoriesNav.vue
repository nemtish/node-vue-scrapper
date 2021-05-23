<template>
  <aside>
    <ul>
      <li v-for="(cat, url) in categories" :key="url">
        <span @click="handleClick($event, url)">
          {{ cat }}
        </span>
      </li>
    </ul>
  </aside>
</template>
<script>
import API from "../services/API";

export default {
  emits: ["categoryClicked"],
  async setup(props, context) {
    const resp = await API.get("/economist/categories");
    let categories = resp.payload;

    const handleClick = (e, url) => {
      setActiveElement(e.target);
      context.emit("categoryClicked", url);
    };
    return {
      categories,
      handleClick,
    };
  },
};

function setActiveElement(el) {
  for (let li of el.parentNode.parentNode.children) {
    li.querySelector("span").classList.remove("active");
  }
  el.classList.add("active");
}
</script>
<style scoped>
aside {
  min-width: 300px;
  width: auto;
  display: block;
  text-align: left;
}

aside ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  padding: 2rem 3rem;
  /* position: fixed; */
  background-color: #333;
  color: rgb(255, 255, 255);
}
aside ul li {
  padding: 3px 0;
}

span {
  font-size: 18px;
  line-height: 20px;
  font-weight: 400;
  cursor: pointer;
}
span.active {
  color: red;
}
span:hover {
  text-decoration: underline;
  color: rgb(197, 197, 197);
}
</style>
