import mongoose from 'mongoose';
import CalculatorSettings from '../models/CalculatorSettings.js';
import CalculatorService from '../models/CalculatorService.js';
import { calculateInteriorEstimate } from '../services/calculationService.js';

// Default Studio Config Fallback
const DEFAULT_SETTINGS = {
  baseRatePerSqFt: 1250,
  currency: 'INR',
  currencySymbol: '₹',
  minAreaSqFt: 300,
  maxAreaSqFt: 25000,
  propertyTypes: [
    'Luxury Residential Apartment',
    'Independent Villa / Kothi',
    'Duplex / Penthouse',
    'Builder Floor',
    'Studio Apartment',
  ],
  propertyCategories: [
    { id: '1bhk', label: '1 BHK', typicalAreaSqFt: 650, multiplier: 1.0, isActive: true },
    { id: '2bhk', label: '2 BHK', typicalAreaSqFt: 1150, multiplier: 1.0, isActive: true },
    { id: '3bhk', label: '3 BHK', typicalAreaSqFt: 1750, multiplier: 1.0, isActive: true },
    { id: '4bhk', label: '4 BHK / 4+ BHK', typicalAreaSqFt: 2500, multiplier: 1.05, isActive: true },
  ],
  disclaimerText:
    'This is an indicative estimate based on the information provided. Final pricing may vary depending on project requirements, material selections, design specifications and site conditions. Please contact Architecture Wonders for a detailed quotation.',
};

const DEFAULT_SERVICES = [
  {
    name: 'Modular Kitchen with German Hardware',
    slug: 'modular-kitchen',
    ratePerSqFt: 450,
    description: 'Custom soft-close cabinetry, quartz countertops, pantry pullouts, and branded fittings.',
    iconName: 'ChefHat',
    isDefaultSelected: true,
    isActive: true,
    displayOrder: 1,
  },
  {
    name: 'Floor-to-Ceiling Wardrobes & Storage',
    slug: 'wardrobes-storage',
    ratePerSqFt: 380,
    description: 'Bespoke master walk-in and sliding wardrobes with integrated sensor profile lighting.',
    iconName: 'Archive',
    isDefaultSelected: true,
    isActive: true,
    displayOrder: 2,
  },
  {
    name: 'False Ceiling & Architectural Lighting',
    slug: 'false-ceiling-lighting',
    ratePerSqFt: 220,
    description: 'Minimalist gypsum coffered ceilings, magnetic track lights, COB ambient downlights.',
    iconName: 'Sun',
    isDefaultSelected: true,
    isActive: true,
    displayOrder: 3,
  },
  {
    name: 'Premium Flooring & Surface Finishes',
    slug: 'flooring-finishes',
    ratePerSqFt: 320,
    description: 'Large-format glazed vitrified tiles or engineered wooden flooring installation.',
    iconName: 'Grid',
    isDefaultSelected: false,
    isActive: true,
    displayOrder: 4,
  },
  {
    name: 'Luxury Wall Emulsions & Fluted Panelling',
    slug: 'painting-panelling',
    ratePerSqFt: 180,
    description: 'Anti-fungal royal luxury paints, PU-coated wood accents, and acoustic fluted panels.',
    iconName: 'Palette',
    isDefaultSelected: false,
    isActive: true,
    displayOrder: 5,
  },
];

// @route GET /api/calculator/settings
export const getCalculatorSettings = async (req, res, next) => {
  try {
    let settings = null;
    let services = [];

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        settings = await CalculatorSettings.findOne();
        services = await CalculatorService.find({ isActive: true }).sort({ displayOrder: 1 });
      } catch (e) {
        console.warn('[Calculator Controller] Using fallback settings');
      }
    }

    if (!settings) {
      settings = DEFAULT_SETTINGS;
    }

    if (!services || services.length === 0) {
      services = DEFAULT_SERVICES;
    }

    res.json({
      success: true,
      settings: {
        baseRatePerSqFt: settings.baseRatePerSqFt,
        currency: settings.currency || 'INR',
        currencySymbol: settings.currencySymbol || '₹',
        minAreaSqFt: settings.minAreaSqFt || 300,
        maxAreaSqFt: settings.maxAreaSqFt || 25000,
        propertyTypes: settings.propertyTypes || DEFAULT_SETTINGS.propertyTypes,
        propertyCategories: (settings.propertyCategories || DEFAULT_SETTINGS.propertyCategories).filter(
          (c) => c.isActive !== false
        ),
        disclaimerText: settings.disclaimerText || DEFAULT_SETTINGS.disclaimerText,
      },
      additionalServices: services.map((s) => ({
        id: s._id || s.slug,
        name: s.name,
        slug: s.slug,
        ratePerSqFt: s.ratePerSqFt,
        description: s.description,
        iconName: s.iconName,
        isDefaultSelected: s.isDefaultSelected,
      })),
    });
  } catch (error) {
    next(error);
  }
};

// @route POST /api/calculator/calculate
export const calculateEstimate = async (req, res, next) => {
  try {
    const { areaSqFt, propertyCategory, propertyType, selectedServiceSlugs } = req.body;

    const estimate = await calculateInteriorEstimate({
      areaSqFt,
      propertyCategory,
      propertyType,
      selectedServiceSlugs,
    });

    res.json({
      success: true,
      estimate,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Admin Endpoints
export const getAdminCalculatorConfig = async (req, res, next) => {
  try {
    let settings = null;
    let services = [];

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      settings = await CalculatorSettings.findOne();
      services = await CalculatorService.find().sort({ displayOrder: 1 });
    }

    if (!settings) settings = DEFAULT_SETTINGS;
    if (services.length === 0) services = DEFAULT_SERVICES;

    res.json({
      success: true,
      settings,
      services,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCalculatorSettings = async (req, res, next) => {
  try {
    let settings = await CalculatorSettings.findOne();
    if (!settings) {
      settings = new CalculatorSettings();
    }

    Object.assign(settings, req.body);
    await settings.save();

    res.json({
      success: true,
      message: 'Calculator configuration updated successfully.',
      settings,
    });
  } catch (error) {
    next(error);
  }
};

export const createCalculatorService = async (req, res, next) => {
  try {
    const { name, ratePerSqFt, description, iconName, isDefaultSelected, isActive, displayOrder } = req.body;
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');

    const service = await CalculatorService.create({
      name,
      slug,
      ratePerSqFt,
      description,
      iconName,
      isDefaultSelected,
      isActive,
      displayOrder,
    });

    res.status(201).json({
      success: true,
      message: 'Additional service created.',
      service,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCalculatorService = async (req, res, next) => {
  try {
    const service = await CalculatorService.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).json({ success: false, message: 'Calculator service not found.' });
    }

    res.json({
      success: true,
      message: 'Calculator service updated.',
      service,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCalculatorService = async (req, res, next) => {
  try {
    const service = await CalculatorService.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ success: false, message: 'Calculator service not found.' });
    }

    res.json({
      success: true,
      message: 'Calculator service removed.',
    });
  } catch (error) {
    next(error);
  }
};
