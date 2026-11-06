import Project from '../models/Project.js';
import { isDbConnected, getJsonData, saveJsonData } from '../utils/jsonStore.js';

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

    if (isDbConnected()) {
      const query = { isPublished: true };
      if (category && category !== 'All Projects') query.category = category;
      if (featured === 'true') query.isFeatured = true;
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

      return res.json({
        success: true,
        count: projects.length,
        total,
        page: Number(page),
        totalPages: Math.ceil(total / Number(limit)),
        projects,
      });
    }

    // JSON file store fallback
    let list = getJsonData('projects').filter((p) => p.isPublished !== false);
    if (category && category !== 'All Projects') {
      list = list.filter((p) => p.category === category);
    }
    if (featured === 'true') {
      list = list.filter((p) => p.isFeatured);
    }
    if (search) {
      const s = search.toLowerCase();
      list = list.filter(
        (p) =>
          (p.title || '').toLowerCase().includes(s) ||
          (p.location || '').toLowerCase().includes(s) ||
          (p.overview || '').toLowerCase().includes(s)
      );
    }
    const total = list.length;
    const skip = (Number(page) - 1) * Number(limit);
    const paginated = list.slice(skip, skip + Number(limit));

    res.json({
      success: true,
      count: paginated.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      projects: paginated,
    });
  } catch (error) {
    next(error);
  }
};

// @route GET /api/projects/:slug
export const getProjectBySlug = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const project = await Project.findOne({ slug: req.params.slug, isPublished: true });
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      const relatedProjects = await Project.find({
        category: project.category,
        _id: { $ne: project._id },
        isPublished: true,
      })
        .limit(3)
        .select('title slug coverImage category location yearCompleted');

      return res.json({ success: true, project, relatedProjects });
    }

    const list = getJsonData('projects');
    const project = list.find((p) => p.slug === req.params.slug);
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    const relatedProjects = list
      .filter((p) => p.category === project.category && p.slug !== project.slug)
      .slice(0, 3);

    res.json({ success: true, project, relatedProjects });
  } catch (error) {
    next(error);
  }
};

// Admin Endpoints
export const getAllProjectsAdmin = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const projects = await Project.find().sort({ displayOrder: 1, createdAt: -1 });
      return res.json({ success: true, count: projects.length, projects });
    }

    const projects = getJsonData('projects');
    res.json({ success: true, count: projects.length, projects });
  } catch (error) {
    next(error);
  }
};

export const createProject = async (req, res, next) => {
  try {
    const projectData = { ...req.body };
    if (!projectData.slug) {
      projectData.slug = slugify(projectData.title || 'project');
    }

    if (isDbConnected()) {
      let existing = await Project.findOne({ slug: projectData.slug });
      if (existing) {
        projectData.slug = `${projectData.slug}-${Date.now()}`;
      }
      const project = await Project.create(projectData);
      return res.status(201).json({
        success: true,
        message: 'Project created successfully.',
        project,
      });
    }

    // JSON file store fallback
    const list = getJsonData('projects');
    const newProj = {
      ...projectData,
      _id: 'p_' + Date.now(),
      yearCompleted: Number(projectData.yearCompleted) || new Date().getFullYear(),
      areaSqFt: Number(projectData.areaSqFt) || 1200,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    list.unshift(newProj);
    saveJsonData('projects', list);

    res.status(201).json({
      success: true,
      message: 'Project created successfully.',
      project: newProj,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.json({ success: true, message: 'Project updated successfully.', project });
    }

    const list = getJsonData('projects');
    const idx = list.findIndex((p) => p._id === req.params.id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...req.body, updatedAt: new Date().toISOString() };
      saveJsonData('projects', list);
      return res.json({ success: true, message: 'Project updated successfully.', project: list[idx] });
    }
    res.status(404).json({ success: false, message: 'Project not found' });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    if (isDbConnected()) {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
      return res.json({ success: true, message: 'Project deleted successfully.' });
    }

    let list = getJsonData('projects');
    list = list.filter((p) => p._id !== req.params.id);
    saveJsonData('projects', list);
    res.json({ success: true, message: 'Project deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
