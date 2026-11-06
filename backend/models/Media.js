import mongoose from 'mongoose';

const mediaSchema = new mongoose.Schema(
  {
    originalFilename: { type: String, required: true },
    url: { type: String, required: true },
    secureUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    format: { type: String, default: 'jpg' },
    bytes: { type: Number, default: 0 },
    width: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    folder: { type: String, default: 'architecture-wonders' },
    altText: { type: String, default: '' },
    tags: [String],
  },
  {
    timestamps: true,
  }
);

mediaSchema.index({ createdAt: -1 });

const Media = mongoose.model('Media', mediaSchema);
export default Media;
