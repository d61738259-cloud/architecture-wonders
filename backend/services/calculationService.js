import mongoose from 'mongoose';
import CalculatorSettings from '../models/CalculatorSettings.js';
import CalculatorService from '../models/CalculatorService.js';

/**
 * Calculates estimated interior cost strictly using current server-side rates.
 * @param {Object} params
 * @param {number} params.areaSqFt - Total carpet/super area in square feet
 * @param {string} params.propertyCategory - e.g. '1bhk', '2bhk', '3bhk', '4bhk'
 * @param {string} params.propertyType - e.g. 'Luxury Residential Apartment'
 * @param {Array<string>} params.selectedServiceSlugs - Array of service slugs/names selected
 */
export const calculateInteriorEstimate = async ({
  areaSqFt,
  propertyCategory,
  propertyType,
  selectedServiceSlugs = [],
}) => {
  // Validate and parse area
  const parsedArea = Number(areaSqFt);
  if (!parsedArea || isNaN(parsedArea) || parsedArea <= 0) {
    throw new Error('Valid positive square footage area is required.');
  }

  // Fetch current active calculator settings if DB connected, otherwise use fallback defaults
  let settings = null;
  if (mongoose.connection && mongoose.connection.readyState === 1) {
    try {
      settings = await CalculatorSettings.findOne();
    } catch (e) {
      console.warn('[Calculation Service] Failed fetching DB settings, using defaults');
    }
  }

  if (!settings) {
    // Default verified studio rates
    settings = {
      baseRatePerSqFt: 1250,
      currency: 'INR',
      currencySymbol: '₹',
      propertyCategories: [
        { id: '1bhk', multiplier: 1.0 },
        { id: '2bhk', multiplier: 1.0 },
        { id: '3bhk', multiplier: 1.0 },
        { id: '4bhk', multiplier: 1.05 },
      ],
      disclaimerText:
        'This is an indicative estimate based on the information provided. Final pricing may vary depending on project requirements, material selections, design specifications and site conditions. Please contact Architecture Wonders for a detailed quotation.',
    };
  }

  // Find category multiplier if any
  const categoryConfig = settings.propertyCategories?.find(
    (c) => c.id === propertyCategory?.toLowerCase()
  );
  const multiplier = categoryConfig && categoryConfig.multiplier ? categoryConfig.multiplier : 1.0;

  // Base calculation
  const effectiveBaseRate = Math.round(settings.baseRatePerSqFt * multiplier);
  const baseCost = Math.round(parsedArea * effectiveBaseRate);

  // Fetch selected additional active services
  let additionalServices = [];
  let additionalServicesRateSum = 0;

  if (Array.isArray(selectedServiceSlugs) && selectedServiceSlugs.length > 0) {
    let activeServices = [];
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        activeServices = await CalculatorService.find({
          isActive: true,
          $or: [
            { slug: { $in: selectedServiceSlugs } },
            { name: { $in: selectedServiceSlugs } },
          ],
        });
      } catch (e) {
        console.warn('[Calculation Service] Failed querying additional services from DB');
      }
    }

    // Default static mapping if DB unavailable or during offline testing
    if (activeServices.length === 0) {
      const defaultRates = {
        'modular-kitchen': { name: 'Modular Kitchen with German Hardware', rate: 450 },
        'wardrobes-storage': { name: 'Floor-to-Ceiling Wardrobes & Storage', rate: 380 },
        'false-ceiling-lighting': { name: 'False Ceiling & Architectural Lighting', rate: 220 },
        'flooring-finishes': { name: 'Premium Flooring & Surface Finishes', rate: 320 },
        'painting-panelling': { name: 'Luxury Wall Emulsions & Fluted Panelling', rate: 180 },
      };
      selectedServiceSlugs.forEach((slug) => {
        if (defaultRates[slug]) {
          activeServices.push({
            name: defaultRates[slug].name,
            slug,
            ratePerSqFt: defaultRates[slug].rate,
          });
        }
      });
    }

    additionalServices = activeServices.map((svc) => {
      const svcCost = Math.round(parsedArea * svc.ratePerSqFt);
      additionalServicesRateSum += svc.ratePerSqFt;
      return {
        name: svc.name,
        slug: svc.slug,
        ratePerSqFt: svc.ratePerSqFt,
        cost: svcCost,
      };
    });
  }

  const additionalServicesCost = Math.round(parsedArea * additionalServicesRateSum);
  const estimatedGrandTotal = baseCost + additionalServicesCost;

  return {
    areaSqFt: parsedArea,
    propertyCategory: propertyCategory || 'Custom',
    propertyType: propertyType || 'Residential',
    baseRatePerSqFt: effectiveBaseRate,
    baseCost,
    selectedServices: additionalServices,
    additionalServicesCost,
    estimatedGrandTotal,
    currency: settings.currency || 'INR',
    currencySymbol: settings.currencySymbol || '₹',
    disclaimer: settings.disclaimerText,
  };
};
