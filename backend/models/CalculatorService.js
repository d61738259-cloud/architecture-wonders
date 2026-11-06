import mongoose from 'mongoose';

const calculatorServiceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    ratePerSqFt: {
      type: Number,
      required: [true, 'Rate per square foot is required'],
      min: [0, 'Rate cannot be negative'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    iconName: {
      type: String,
      default: 'Layers',
    },
    isDefaultSelected: {
      type: Boolean,
      default: false,
    },
    isActive: {
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

calculatorServiceSchema.index({ displayOrder: 1, isActive: 1 });

const CalculatorService = mongoose.model('CalculatorService', calculatorServiceSchema);
export default CalculatorService;
