<template>
  <Suspense>
    <div class="article--info">
      <article-info :article-url="articleUrl" />
    </div>
  </Suspense>
</template>

<script>
import { getArticleInfo } from "../services/economist";
import { ref } from "vue";
import { useRouter } from "vue-router";
import ArticleInfo from "../components/ArticleInfo.vue";

export default {
  components: { ArticleInfo },
  setup() {
    const router = useRouter();
    let articleUrl = ref("");

    let urlParam = router.currentRoute.value.params.articleUrl;
    articleUrl = atob(urlParam);

    return {
      articleUrl,
    };
  },
};
</script>

<style scoped></style>
