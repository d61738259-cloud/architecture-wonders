import mongoose from 'mongoose';

const faqItemSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      required: [true, 'Short description is required'],
      maxlength: [240, 'Short description cannot exceed 240 characters'],
    },
    fullDescription: {
      type: String,
      required: [true, 'Full description is required'],
    },
    benefits: {
      type: [String],
      default: [],
    },
    designConsiderations: {
      type: [String],
      default: [],
    },
    faqs: [faqItemSchema],
    coverImage: {
      type: String,
      default: '',
    },
    iconName: {
      type: String,
      default: 'Home',
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

serviceSchema.index({ displayOrder: 1, isPublished: 1 });

const Service = mongoose.model('Service', serviceSchema);
export default Service;
