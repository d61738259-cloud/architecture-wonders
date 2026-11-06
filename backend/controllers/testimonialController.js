import Testimonial from '../models/Testimonial.js';

export const getPublicTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find({ isPublished: true }).sort({
      displayOrder: 1,
      createdAt: -1,
    });
    res.json({
      success: true,
      count: testimonials.length,
      testimonials,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllTestimonialsAdmin = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.find().sort({ displayOrder: 1, createdAt: -1 });
    res.json({
      success: true,
      count: testimonials.length,
      testimonials,
    });
  } catch (error) {
    next(error);
  }
};

export const createTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Testimonial added successfully.',
      testimonial,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }
    res.json({
      success: true,
      message: 'Testimonial updated successfully.',
      testimonial,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTestimonial = async (req, res, next) => {
  try {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
      return res.status(404).json({ success: false, message: 'Testimonial not found.' });
    }
    res.json({
      success: true,
      message: 'Testimonial removed successfully.',
    });
  } catch (error) {
    next(error);
  }
};
