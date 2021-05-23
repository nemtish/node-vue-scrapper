<template>
  <div class="article__info">
    <div class="article__header">
      <span class="article__subheadline">{{ article.subHeadline }}</span>
      <h1>{{ article.headline }}</h1>
      <p class="description">{{ article.description }}</p>
    </div>
    <img :src="article.image" alt="" />
    <p>{{ article.text }}</p>
  </div>
</template>
<script>
import { ref } from "@vue/reactivity";
import { getArticleInfo } from "../services/economist";

export default {
  props: {
    articleUrl: String,
  },
  async setup(props) {
    let article = ref({});
    const resp = await getArticleInfo(props.articleUrl);
    article.value = resp.payload;

    return {
      article,
    };
  },
};
</script>

<style scoped></style>
