<template>
  <div class="articles">
    <article-item
      v-for="(article, index) in articles"
      :category="article.category"
      :description="article.description"
      :headline="article.headline"
      :image="article.image"
      :articleUrl="article.articleUrl"
      :key="index"
      @article-click="handleArticleClick(article.articleUrl)"
    />
  </div>
</template>

<script>
import ArticleItem from "./ArticleItem.vue";
export default {
  emits: ["articleClick"],
  components: { ArticleItem },
  props: {
    articles: Array,
  },
  setup(props, context) {
    const handleArticleClick = (articleUrl) => {
      context.emit("articleClick", articleUrl);
    };

    return {
      handleArticleClick,
    };
  },
};
</script>

<style scoped>
.articles {
  display: flex;
  flex-wrap: wrap;
  padding: 0 10px;
}
.article:first-child {
  width: 60% !important;
  float: left;
}
</style>
