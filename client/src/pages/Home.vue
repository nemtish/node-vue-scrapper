<template>
  <div>
    <section>
      <Suspense>
        <categories-nav @category-clicked="getArticles" />
      </Suspense>
      <Suspense>
        <article-list
          v-if="showArticleList"
          :articles="articles"
          @article-click="handleArticleClick"
        />
      </Suspense>
    </section>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import CategoriesNav from "../components/CategoriesNav.vue";
import ArticleList from "../components/ArticleList.vue";
import {
  getArticlesByCategory,
  getFeaturedArticles,
} from "../services/economist";

export default {
  components: { CategoriesNav, ArticleList },
  setup() {
    const router = useRouter();
    let showArticleList = ref(true);
    let articles = ref([]);

    onMounted(async () => {
      const featured = await getFeaturedArticles();
      articles.value = featured.payload;
    });

    const getArticles = async (category) => {
      showArticleList.value = false;
      const resp = await getArticlesByCategory(category);
      articles.value = resp.payload;
      showArticleList.value = true;
    };

    const handleArticleClick = (articleUrl) => {
      let cleanedUrl = btoa(articleUrl);
      router.push(`/article/${cleanedUrl}`);
    };

    return {
      getArticles,
      handleArticleClick,
      articles,
      showArticleList,
    };
  },
};
</script>

<style scoped>
section {
  display: flex;
}
</style>
