import API from "./API";

export async function getArticlesByCategory(category) {
  return API.get("/economist/articles", { category });
}

export async function getFeaturedArticles() {
  return API.get("/economist/featured-articles");
}

export async function getArticleInfo(articleUrl) {
  return API.get("/economist/article", { articleUrl });
}
