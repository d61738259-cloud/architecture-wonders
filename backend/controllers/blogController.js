import BlogArticle from '../models/BlogArticle.js';

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

export const getPublicArticles = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 9, tag } = req.query;
    const query = { isPublished: true };

    if (category && category !== 'All') {
      query.category = category;
    }

    if (tag) {
      query.tags = tag;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await BlogArticle.countDocuments(query);
    const articles = await BlogArticle.find(query)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .select('-content');

    res.json({
      success: true,
      count: articles.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      articles,
    });
  } catch (error) {
    next(error);
  }
};

export const getArticleBySlug = async (req, res, next) => {
  try {
    const article = await BlogArticle.findOne({ slug: req.params.slug, isPublished: true });
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }

    // Related articles in same category
    const relatedArticles = await BlogArticle.find({
      category: article.category,
      _id: { $ne: article._id },
      isPublished: true,
    })
      .limit(3)
      .select('title slug summary coverImage readTime publishedAt');

    res.json({
      success: true,
      article,
      relatedArticles,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllArticlesAdmin = async (req, res, next) => {
  try {
    const articles = await BlogArticle.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      count: articles.length,
      articles,
    });
  } catch (error) {
    next(error);
  }
};

export const createArticle = async (req, res, next) => {
  try {
    const data = { ...req.body };
    if (!data.slug) {
      data.slug = slugify(data.title);
    }

    let existing = await BlogArticle.findOne({ slug: data.slug });
    if (existing) {
      data.slug = `${data.slug}-${Date.now()}`;
    }

    const article = await BlogArticle.create(data);
    res.status(201).json({
      success: true,
      message: 'Article created successfully.',
      article,
    });
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    const article = await BlogArticle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    res.json({
      success: true,
      message: 'Article updated successfully.',
      article,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const article = await BlogArticle.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ success: false, message: 'Article not found.' });
    }
    res.json({
      success: true,
      message: 'Article deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
