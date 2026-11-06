import WebsiteSettings from '../models/WebsiteSettings.js';
import Project from '../models/Project.js';
import Enquiry from '../models/Enquiry.js';
import Service from '../models/Service.js';
import BlogArticle from '../models/BlogArticle.js';
import Testimonial from '../models/Testimonial.js';

export const getWebsiteSettings = async (req, res, next) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create({});
    }
    res.json({
      success: true,
      settings,
    });
  } catch (error) {
    next(error);
  }
};

export const updateWebsiteSettings = async (req, res, next) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = new WebsiteSettings();
    }
    Object.assign(settings, req.body);
    await settings.save();

    res.json({
      success: true,
      message: 'Website content updated successfully.',
      settings,
    });
  } catch (error) {
    next(error);
  }
};

export const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProjects,
      publishedProjects,
      totalEnquiries,
      newEnquiries,
      convertedEnquiries,
      totalBlogArticles,
      publishedTestimonials,
      totalServices,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ isPublished: true }),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'New' }),
      Enquiry.countDocuments({ status: 'Converted' }),
      BlogArticle.countDocuments({ isPublished: true }),
      Testimonial.countDocuments({ isPublished: true }),
      Service.countDocuments({ isPublished: true }),
    ]);

    // Recent 5 enquiries for quick dashboard actions
    const recentEnquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('referenceNumber name phone email enquiryType status createdAt calculatorBreakdown');

    res.json({
      success: true,
      stats: {
        totalProjects,
        publishedProjects,
        totalEnquiries,
        newEnquiries,
        convertedEnquiries,
        totalBlogArticles,
        publishedTestimonials,
        totalServices,
      },
      recentEnquiries,
    });
  } catch (error) {
    next(error);
  }
};
