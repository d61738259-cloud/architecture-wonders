import mongoose from 'mongoose';

const propertyCategorySchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    label: { type: String, required: true },
    typicalAreaSqFt: { type: Number, default: 1200 },
    multiplier: { type: Number, default: 1.0 },
    isActive: { type: Boolean, default: true },
  },
  { _id: false }
);

const calculatorSettingsSchema = new mongoose.Schema(
  {
    baseRatePerSqFt: {
      type: Number,
      required: true,
      default: 1250, // Base interior design & civil shell execution rate (₹/sq.ft)
      min: [100, 'Base rate must be positive'],
    },
    currency: {
      type: String,
      default: 'INR',
    },
    currencySymbol: {
      type: String,
      default: '₹',
    },
    minAreaSqFt: {
      type: Number,
      default: 300,
    },
    maxAreaSqFt: {
      type: Number,
      default: 25000,
    },
    propertyTypes: {
      type: [String],
      default: [
        'Luxury Residential Apartment',
        'Independent Villa / Kothi',
        'Duplex / Penthouse',
        'Builder Floor',
        'Studio Apartment',
      ],
    },
    propertyCategories: {
      type: [propertyCategorySchema],
      default: [
        { id: '1bhk', label: '1 BHK', typicalAreaSqFt: 650, multiplier: 1.0, isActive: true },
        { id: '2bhk', label: '2 BHK', typicalAreaSqFt: 1150, multiplier: 1.0, isActive: true },
        { id: '3bhk', label: '3 BHK', typicalAreaSqFt: 1750, multiplier: 1.0, isActive: true },
        { id: '4bhk', label: '4 BHK / 4+ BHK', typicalAreaSqFt: 2500, multiplier: 1.05, isActive: true },
      ],
    },
    disclaimerText: {
      type: String,
      default:
        'This is an indicative estimate based on the information provided. Final pricing may vary depending on project requirements, material selections, design specifications and site conditions. Please contact Architecture Wonders for a detailed quotation.',
    },
  },
  {
    timestamps: true,
  }
);

const CalculatorSettings = mongoose.model('CalculatorSettings', calculatorSettingsSchema);
export default CalculatorSettings;
