import mongoose from "mongoose";

const ArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    summary: {
      type: String, // Short preview text
      required: true,
    },
    category: {
      type: String,
      enum: [
        "meal_plan",
        "tips",
        "exercise",
        "mental_health",
        "baby_care",
        "nutrition",
        "pregnancy",
        "postpartum",
      ],
      required: true,
    },
    image_url: {
      type: String, // URL to article image
      default: "",
    },
    tags: [
      {
        type: String, // For searching: ["first_trimester", "healthy_eating", etc.]
      },
    ],
    for_stage: {
      type: String,
      enum: ["pregnancy", "postpartum", "both"],
      default: "both",
    },
    is_published: {
      type: Boolean,
      default: true,
    },
    read_time_minutes: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

// Index for searching
ArticleSchema.index({ title: "text", content: "text", tags: "text" });

const Article = mongoose.model("Article", ArticleSchema);

export default Article;
