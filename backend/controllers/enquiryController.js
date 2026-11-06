import Enquiry from '../models/Enquiry.js';
import { calculateInteriorEstimate } from '../services/calculationService.js';
import { notifyAdminViaWhatsApp } from '../services/whatsappService.js';

// Helper to generate unique reference number: AW-YYYYMMDD-XXXX
const generateReferenceNumber = () => {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `AW-${dateStr}-${randomSuffix}`;
};

// @route POST /api/enquiries/submit
export const submitEnquiry = async (req, res, next) => {
  try {
    const {
      enquiryType = 'general_contact',
      name,
      phone,
      email,
      message,
      propertyType,
      propertyCategory,
      propertyLocation,
      propertyAreaSqFt,
      serviceRequired,
      selectedServiceSlugs,
    } = req.body;

    if (!name || !phone || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name, phone number, and email address are required.',
      });
    }

    const referenceNumber = generateReferenceNumber();
    let calculatorBreakdown = null;

    // If enquiry is from the Cost Calculator, calculate pricing on the backend
    if (enquiryType === 'calculator_estimate') {
      const calculation = await calculateInteriorEstimate({
        areaSqFt: propertyAreaSqFt,
        propertyCategory,
        propertyType,
        selectedServiceSlugs: selectedServiceSlugs || [],
      });

      calculatorBreakdown = {
        baseRatePerSqFt: calculation.baseRatePerSqFt,
        baseCost: calculation.baseCost,
        selectedServices: calculation.selectedServices,
        additionalServicesCost: calculation.additionalServicesCost,
        estimatedGrandTotal: calculation.estimatedGrandTotal,
        currency: calculation.currencySymbol,
      };
    }

    const enquiry = await Enquiry.create({
      referenceNumber,
      enquiryType,
      name,
      phone,
      email,
      message,
      propertyType: propertyType || '',
      propertyCategory: propertyCategory || '',
      propertyLocation: propertyLocation || '',
      propertyAreaSqFt: propertyAreaSqFt ? Number(propertyAreaSqFt) : 0,
      serviceRequired: serviceRequired || '',
      calculatorBreakdown,
      clientIp: req.ip || req.headers['x-forwarded-for'] || '',
      userAgent: req.headers['user-agent'] || '',
    });

    // Notify administrator asynchronously (does not block client response)
    notifyAdminViaWhatsApp(enquiry).catch((err) =>
      console.error('[WhatsApp Notification Error]', err.message)
    );

    res.status(201).json({
      success: true,
      message: 'Thank you! Your enquiry has been received. Our architectural team will reach out to you shortly.',
      referenceNumber,
      enquiryId: enquiry._id,
      breakdown: calculatorBreakdown,
    });
  } catch (error) {
    next(error);
  }
};

// Admin Endpoints
export const getEnquiries = async (req, res, next) => {
  try {
    const { status, type, search, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status && status !== 'All') {
      query.status = status;
    }

    if (type && type !== 'All') {
      query.enquiryType = type;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { referenceNumber: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (Number(page) - 1) * Number(limit);
    const total = await Enquiry.countDocuments(query);
    const enquiries = await Enquiry.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      count: enquiries.length,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
      enquiries,
    });
  } catch (error) {
    next(error);
  }
};

export const updateEnquiryStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ['New', 'Contacted', 'In Progress', 'Converted', 'Rejected'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const enquiry = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    res.json({
      success: true,
      message: `Enquiry status updated to ${status}.`,
      enquiry,
    });
  } catch (error) {
    next(error);
  }
};

export const addEnquiryNote = async (req, res, next) => {
  try {
    const { note } = req.body;
    if (!note || !note.trim()) {
      return res.status(400).json({ success: false, message: 'Note text cannot be empty.' });
    }

    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    enquiry.internalNotes.push({
      note: note.trim(),
      author: req.admin?.name || 'Admin',
      createdAt: new Date(),
    });

    await enquiry.save();

    res.json({
      success: true,
      message: 'Internal note added.',
      notes: enquiry.internalNotes,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEnquiry = async (req, res, next) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(req.params.id);
    if (!enquiry) {
      return res.status(404).json({ success: false, message: 'Enquiry not found.' });
    }

    res.json({
      success: true,
      message: 'Enquiry deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
