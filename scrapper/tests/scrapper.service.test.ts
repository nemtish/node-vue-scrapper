const scrapperService = require("../src/services/scrapper.service");

describe("Test scrapper service", () => {
  it("should return categories", async () => {
    const categories = await scrapperService.default.fetchCategories();
    expect(categories).toBeDefined();
    expect(Object.keys(categories).length).toBeGreaterThanOrEqual(27);
  });

  it("should return featured articles", async () => {
    const articles = await scrapperService.default.fetchFeaturedArticles();
    expect(articles.length).toBeGreaterThan(0);
  });

  it("should return articles for specific category", async () => {
    const articles = await scrapperService.default.fetchArticlesByCategory(
      "asia"
    );
    expect(articles.length).toBeGreaterThan(0);
    expect(articles[0]).toHaveProperty("articleUrl");
    expect(articles[0]).toHaveProperty("headline");
    expect(articles[0]).toHaveProperty("category");
    expect(articles[0]).toHaveProperty("image");
    expect(articles[0]).toHaveProperty("description");
  });

  it("should return specific article by url", async () => {
    const articles = await scrapperService.default.fetchArticlesByCategory(
      "asia"
    );
    const articleTeaser = articles[0];
    const articleInfo = await scrapperService.default.fetchArticleInfo(
      articleTeaser.articleUrl
    );

    expect(articleInfo).toBeDefined();
    expect(articleInfo).toHaveProperty("headline");
    expect(articleInfo).toHaveProperty("subHeadline");
    expect(articleInfo).toHaveProperty("image");
    expect(articleInfo).toHaveProperty("description");
    expect(articleInfo).toHaveProperty("text");
  });
});
