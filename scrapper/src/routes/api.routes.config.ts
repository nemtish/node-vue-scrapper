import express from "express";
import { verifyToken } from "../middlewares/auth";
import userController from "../controllers/user.controller";
import economistController from "../controllers/economist.controller";

const apiRouter = () => {
  const router = express.Router();
  const users = userController();
  const economist = economistController();

  router.route("/user/register").post(users.register);
  router.route("/user/login").post(users.login);
  router.route("/user/auth").get(verifyToken, users.authenticate);

  router
    .route("/economist/categories")
    .get(verifyToken, economist.getCategories);
  router
    .route("/economist/featured-articles")
    .get(verifyToken, economist.getFeaturedArticles);
  router
    .route("/economist/articles")
    .get(verifyToken, economist.getArticlesByCategory);

  router.route("/economist/article").get(verifyToken, economist.getArticleInfo);

  return router;
};

export default apiRouter;
