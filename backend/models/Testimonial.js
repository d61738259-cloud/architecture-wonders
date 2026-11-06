import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: [true, 'Client name is required'],
      trim: true,
    },
    location: {
      type: String,
      trim: true,
      default: 'Zirakpur',
    },
    projectTitle: {
      type: String,
      trim: true,
      default: 'Residential Interior Project',
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 5,
    },
    reviewText: {
      type: String,
      required: [true, 'Review text is required'],
      trim: true,
    },
    clientAvatar: {
      type: String,
      default: '',
    },
    isVerifiedClient: {
      type: Boolean,
      default: true,
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

testimonialSchema.index({ isPublished: 1, displayOrder: 1 });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);
export default Testimonial;
