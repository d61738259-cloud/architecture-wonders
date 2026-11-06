import mongoose from 'mongoose';

const internalNoteSchema = new mongoose.Schema(
  {
    note: { type: String, required: true },
    author: { type: String, default: 'Admin' },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const enquirySchema = new mongoose.Schema(
  {
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    enquiryType: {
      type: String,
      required: true,
      enum: ['calculator_estimate', 'project_enquiry', 'general_contact'],
      default: 'general_contact',
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Customer name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      trim: true,
      default: '',
    },
    // Contextual property & project details
    propertyType: {
      type: String,
      default: '',
    },
    propertyCategory: {
      type: String,
      default: '',
    },
    propertyLocation: {
      type: String,
      default: '',
    },
    propertyAreaSqFt: {
      type: Number,
      default: 0,
    },
    serviceRequired: {
      type: String,
      default: '',
    },
    // Calculator breakdown snapshot
    calculatorBreakdown: {
      baseRatePerSqFt: Number,
      baseCost: Number,
      selectedServices: [
        {
          name: String,
          ratePerSqFt: Number,
          cost: Number,
        },
      ],
      additionalServicesCost: Number,
      estimatedGrandTotal: Number,
      currency: { type: String, default: '₹' },
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'In Progress', 'Converted', 'Rejected'],
      default: 'New',
      index: true,
    },
    internalNotes: [internalNoteSchema],
    notificationSent: {
      type: Boolean,
      default: false,
    },
    clientIp: {
      type: String,
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

enquirySchema.index({ status: 1, createdAt: -1 });
enquirySchema.index({ enquiryType: 1, createdAt: -1 });

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;
