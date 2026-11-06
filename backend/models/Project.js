import mongoose from 'mongoose';

const projectImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, default: '' },
    caption: { type: String, default: '' },
    altText: { type: String, default: '' },
    isCover: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { _id: false }
);

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [160, 'Title cannot exceed 160 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'Full Home Interiors',
        'Living Rooms',
        'Bedrooms',
        'Modular Kitchens',
        'Wardrobes',
        'Residential Architecture',
        'Renovation Projects',
      ],
      index: true,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
      // Verified geographic focus: Zirakpur, Chandigarh, Mohali & surrounding tri-city area
    },
    yearCompleted: {
      type: Number,
      default: 2024,
    },
    areaSqFt: {
      type: Number,
      min: [50, 'Area must be at least 50 sq ft'],
    },
    overview: {
      type: String,
      required: [true, 'Overview is required'],
      trim: true,
    },
    designConcept: {
      type: String,
      trim: true,
      default: '',
    },
    description: {
      type: String,
      required: [true, 'Detailed project description is required'],
      trim: true,
    },
    materialsAndFinishes: {
      type: [String],
      default: [],
    },
    coverImage: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    gallery: [projectImageSchema],
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

projectSchema.index({ category: 1, isPublished: 1 });
projectSchema.index({ isFeatured: 1, isPublished: 1 });

const Project = mongoose.model('Project', projectSchema);
export default Project;
