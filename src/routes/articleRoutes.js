import { Router } from "express";
import {
  getAllArticles,
  getArticleById,
  getArticlesByCategory,
  getCategories,
  getFeaturedArticles,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../controllers/articleController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const articleRoutes = Router();

// Public routes (no auth needed - mothers can browse freely)
articleRoutes.get("/", getAllArticles);
articleRoutes.get("/featured", getFeaturedArticles);
articleRoutes.get("/categories", getCategories);
articleRoutes.get("/category/:category", getArticlesByCategory);
articleRoutes.get("/:id", getArticleById);

// Admin routes (protected) - for API-based creation if needed
// Main article creation will be via AdminJS panel
articleRoutes.post("/", authenticateToken, createArticle);
articleRoutes.put("/:id", authenticateToken, updateArticle);
articleRoutes.delete("/:id", authenticateToken, deleteArticle);

export default articleRoutes;
