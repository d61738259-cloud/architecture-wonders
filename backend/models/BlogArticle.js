import mongoose from 'mongoose';

const blogArticleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Article title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    summary: {
      type: String,
      required: [true, 'Summary is required'],
      maxlength: [300, 'Summary cannot exceed 300 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    coverImage: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      default: 'Architecture Wonders Editorial Team',
    },
    category: {
      type: String,
      required: true,
      default: 'Interior Design Insights',
    },
    tags: {
      type: [String],
      default: [],
    },
    readTime: {
      type: String,
      default: '5 min read',
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    publishedAt: {
      type: Date,
      default: Date.now,
    },
    metaTitle: {
      type: String,
      default: '',
    },
    metaDescription: {
      type: String,
      default: '',
    },
    canonicalUrl: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

blogArticleSchema.index({ isPublished: 1, publishedAt: -1 });

const BlogArticle = mongoose.model('BlogArticle', blogArticleSchema);
export default BlogArticle;
