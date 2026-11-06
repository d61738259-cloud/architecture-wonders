import Project from '../models/Project.js';

// Generate slug from title
const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');

// @route GET /api/projects
export const getProjects = async (req, res, next) => {
  try {
    const { category, featured, page = 1, limit = 12, search } = req.query;
    const query = { isPublished: true };

    if (category && category !== 'All Projects') {
      query.category = category;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { overview: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Project.countDocuments(query);
    const projects = await Project.find(query)
      .sort({ displayOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      count: projects.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      projects,
    });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/projects/:slug
export const getProjectBySlug = async (req, res, next) => {
  try {
    const project = await Project.findOne({ slug: req.params.slug, isPublished: true });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    // Related projects within the same category
    const relatedProjects = await Project.find({
      category: project.category,
      _id: { $ne: project._id },
      isPublished: true,
    })
      .limit(3)
      .select('title slug coverImage category location yearCompleted');

    res.json({
      success: true,
      project,
      relatedProjects,
    });
  } catch (error) {
    next(error);
  }
};

// Admin Endpoints
export const getAllProjectsAdmin = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({
      success: true,
      count: projects.length,
      projects,
    });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const projectData = { ...req.body };
    if (!projectData.slug) {
      projectData.slug = slugify(projectData.title);
    }

    // Ensure unique slug
    let existing = await Project.findOne({ slug: projectData.slug });
    if (existing) {
      projectData.slug = `${projectData.slug}-${Date.now()}`;
    }

    const project = await Project.create(projectData);
    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully.',
      project,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found.',
      });
    }

    res.json({
      success: true,
      message: 'Project deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
