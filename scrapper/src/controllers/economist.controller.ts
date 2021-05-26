import express from "express";
import debug from "debug";
import scrapper from "../services/scrapper.service";

const debugLog: debug.IDebugger = debug("economist.controller");

export default () => {
  const getCategories = async (req: express.Request, res: express.Response) => {
    const categories = await scrapper.fetchCategories();
    res.status(200).json({
      success: true,
      message: "Economist categories",
      payload: categories,
    });
  };

  const getFeaturedArticles = async (
    req: express.Request,
    res: express.Response
  ) => {
    const articles = await scrapper.fetchFeaturedArticles();
    res.status(200).json({
      success: true,
      message: "Featured Articles",
      payload: articles,
    });
  };

  const getArticlesByCategory = async (
    req: express.Request,
    res: express.Response
  ) => {
    const category = req.query.category;
    debugLog(category);
    const articles = await scrapper.fetchArticlesByCategory(<string>category);
    res.status(200).json({
      success: true,
      message: `${category} articles`,
      payload: articles,
    });
  };

  const getArticleInfo = async (
    req: express.Request,
    res: express.Response
  ) => {
    const { articleUrl } = req.query;
    debugLog(articleUrl);
    const article = await scrapper.fetchArticleInfo(<string>articleUrl);
    res.status(200).json({
      success: true,
      message: "Article info",
      payload: article,
    });
  };

  return {
    getCategories,
    getFeaturedArticles,
    getArticlesByCategory,
    getArticleInfo,
  };
};
