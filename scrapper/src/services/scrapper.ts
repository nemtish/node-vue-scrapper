import cheerio from "cheerio";
import https from "https";
import debug from "debug";

const debugLog: debug.IDebugger = debug("economist.controller");
const siteUrl = "https://www.economist.com";

export default (() => {
  const fetchCategories = () => {
    return new Promise((resolve, reject) => {
      https.get(siteUrl, (resp) => {
        let webPage = "";
        let categories: { [key: string]: string } = {};

        resp.on("data", (chunk) => (webPage += chunk.toString()));
        resp.on("end", () => {
          const $ = cheerio.load(webPage);
          const $body = $("body");
          const $li = $body
            .find(".ds-navigation-list-items--section")
            .children();

          $li.each((i, el) => {
            let category = $(el).find(".ds-navigation-link").text();
            let categoryUrl = $(el).find(".ds-navigation-link").attr("href");
            categoryUrl = categoryUrl!.substring(
              categoryUrl!.lastIndexOf("/") + 1
            );
            categories[categoryUrl] = category;
          });

          resolve(categories);
        });
      });
    });
  };

  const fetchFeaturedArticles = () => {
    return new Promise((resolve, reject) => {
      https.get(siteUrl, (resp) => {
        let rawData = "";
        resp.on("data", (chunk) => (rawData += chunk.toString()));
        resp.on("end", () => {
          const $ = cheerio.load(rawData);
          const $body = $("body");
          const articles: object[] = [];

          const $teasers = $body.find("div[data-test-id='Article Teaser']");
          $teasers.each((i, el) => {
            let category = $(el).find(".section-fly");
            let headline = $(el).find(".headline-link");
            articles.push({
              category: category.text(),
              articleUrl: headline.attr("href"),
              headline: headline.text(),
              image: $(el).find("img").attr("src"),
              description: $(el).find("[data-test-id='Description']").text(),
            });
          });
          resolve(articles);
        });
      });
    });
  };

  const fetchArticlesByCategory = (category: string) => {
    const teasersUrl = `${siteUrl}/${category}`;

    return new Promise((resolve, reject) => {
      https.get(teasersUrl, (resp) => {
        let rawData = "";
        resp.on("data", (chunk) => (rawData += chunk.toString()));
        resp.on("end", () => {
          const $ = cheerio.load(rawData);
          const $body = $("body");
          const articles: object[] = [];

          const $teasers = $body.find(".teaser--section-collection");
          $teasers.each((i, el) => {
            articles.push({
              articleUrl: $(el).find(".headline-link").attr("href"),
              headline: $(el).find(".teaser__headline").text(),
              category: $(el).find(".teaser__subheadline").text(),
              image: $(el).find("img").attr("src"),
              description: $(el).find("[data-test-id='Description']").text(),
            });
          });

          resolve(articles);
        });
      });
    });
  };

  const fetchArticleInfo = (articleUrl: string) => {
    const url = `${siteUrl}${articleUrl}`;
    return new Promise((resolve, reject) => {
      https.get(url, (resp) => {
        let rawData = "";
        resp.on("data", (chunk) => (rawData += chunk.toString()));
        resp.on("end", () => {
          const $ = cheerio.load(rawData);
          const $body = $("body");
          const $articleSubheadline = $body
            .find(".article__subheadline")
            .text();
          const $articleHeadline = $body.find(".article__headline").text();
          const $articleDescription = $body
            .find(".article__description")
            .text();
          const $articleImage = $body
            .find(".article__lead-image")
            .find("img")
            .attr("src");
          let $articleBodyText = "";

          let articleText = $body.find(".article__body-text");
          articleText.each((i, el) => {
            $articleBodyText += $(el).text();
          });

          resolve({
            headline: $articleHeadline,
            subHeadline: $articleSubheadline,
            description: $articleDescription,
            image: $articleImage,
            text: $articleBodyText,
          });
        });
      });
    });
  };

  return {
    fetchCategories,
    fetchFeaturedArticles,
    fetchArticlesByCategory,
    fetchArticleInfo,
  };
})();
