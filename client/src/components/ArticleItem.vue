<template>
  <div
    :class="{ right: !image, article: true }"
    @click="$emit('articleClick', articleUrl)"
  >
    <span class="article__subheadline" v-if="category">{{ category }} </span>
    <img v-if="image" :src="image" alt="articleImage" />
    <h2>{{ headline }}</h2>
    <p v-if="description" class="description">{{ description }}</p>
  </div>
</template>

<script>
export default {
  emits: ["articleClick"],
  props: {
    articleUrl: String,
    image: String,
    headline: String,
    description: String,
    category: String,
  },
  setup() {},
};
</script>
<style scoped>
.article {
  display: block;
  width: 30%;
  margin: 10px;
  cursor: pointer;
  -webkit-column-break-inside: avoid;
  page-break-inside: avoid; /* Firefox is dumb */
  break-inside: avoid;
}
.article img {
  width: 100%;
  height: auto;
}
</style>
