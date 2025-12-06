import Article from "../models/Article.js";

// Get all published articles (for mothers to browse)
export const getAllArticles = async (req, res) => {
  try {
    const { category, stage, search } = req.query;

    // Build filter
    const filter = { is_published: true };

    if (category) {
      filter.category = category;
    }

    if (stage && stage !== "both") {
      filter.for_stage = { $in: [stage, "both"] };
    }

    // If search query provided
    if (search) {
      filter.$text = { $search: search };
    }

    const articles = await Article.find(filter)
      .sort({ createdAt: -1 })
      .select("-content"); // Don't send full content in list

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single article by ID (full content)
export const getArticleById = async (req, res) => {
  try {
    const article = await Article.findOne({
      _id: req.params.id,
      is_published: true,
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get articles by category
export const getArticlesByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const articles = await Article.find({
      category,
      is_published: true,
    })
      .sort({ createdAt: -1 })
      .select("-content");

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all categories with article count
export const getCategories = async (req, res) => {
  try {
    const categories = await Article.aggregate([
      { $match: { is_published: true } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // Add friendly names
    const categoryNames = {
      meal_plan: "Meal Plans",
      tips: "Tips & Tricks",
      exercise: "Exercise",
      mental_health: "Mental Health",
      baby_care: "Baby Care",
      nutrition: "Nutrition",
      pregnancy: "Pregnancy",
      postpartum: "After Delivery",
    };

    const result = categories.map((cat) => ({
      id: cat._id,
      name: categoryNames[cat._id] || cat._id,
      count: cat.count,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get featured/recent articles for home screen
export const getFeaturedArticles = async (req, res) => {
  try {
    const articles = await Article.find({ is_published: true })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("-content");

    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ---- ADMIN ONLY (for creating via API if needed) ----

// Create article (Admin)
export const createArticle = async (req, res) => {
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update article (Admin)
export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json(article);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete article (Admin)
export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.status(200).json({ message: "Article deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
