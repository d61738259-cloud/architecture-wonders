import test from 'node:test';
import assert from 'node:assert';
import { calculateInteriorEstimate } from '../services/calculationService.js';

test('Cost Calculator pricing engine unit tests', async (t) => {
  await t.test('calculates correct base cost for 1000 sq ft at default rate', async () => {
    const result = await calculateInteriorEstimate({
      areaSqFt: 1000,
      propertyCategory: '2bhk',
      propertyType: 'Luxury Residential Apartment',
      selectedServiceSlugs: [],
    });

    assert.strictEqual(result.areaSqFt, 1000);
    assert.strictEqual(result.baseCost, 1250000); // 1000 * 1250
    assert.strictEqual(result.additionalServicesCost, 0);
    assert.strictEqual(result.estimatedGrandTotal, 1250000);
  });

  await t.test('applies 4BHK 1.05 multiplier correctly', async () => {
    const result = await calculateInteriorEstimate({
      areaSqFt: 2000,
      propertyCategory: '4bhk',
      propertyType: 'Independent Villa',
      selectedServiceSlugs: [],
    });

    const expectedRate = Math.round(1250 * 1.05); // 1313
    assert.strictEqual(result.baseRatePerSqFt, expectedRate);
    assert.strictEqual(result.baseCost, 2000 * expectedRate);
    assert.strictEqual(result.estimatedGrandTotal, 2000 * expectedRate);
  });

  await t.test('calculates multiple selected additional services accurately', async () => {
    // Selected: modular-kitchen (450) + false-ceiling-lighting (220) = 670/sqft
    const result = await calculateInteriorEstimate({
      areaSqFt: 1500,
      propertyCategory: '3bhk',
      propertyType: 'Luxury Residential Apartment',
      selectedServiceSlugs: ['modular-kitchen', 'false-ceiling-lighting'],
    });

    const expectedBase = 1500 * 1250; // 1,875,000
    const expectedAdditional = 1500 * (450 + 220); // 1500 * 670 = 1,005,000
    const expectedTotal = expectedBase + expectedAdditional; // 2,880,000

    assert.strictEqual(result.baseCost, expectedBase);
    assert.strictEqual(result.additionalServicesCost, expectedAdditional);
    assert.strictEqual(result.estimatedGrandTotal, expectedTotal);
    assert.strictEqual(result.selectedServices.length, 2);
  });

  await t.test('handles decimal square footage cleanly with proper rounding', async () => {
    const result = await calculateInteriorEstimate({
      areaSqFt: 1450.5,
      propertyCategory: '3bhk',
      selectedServiceSlugs: [],
    });

    const expectedBase = Math.round(1450.5 * 1250);
    assert.strictEqual(result.baseCost, expectedBase);
    assert.strictEqual(result.estimatedGrandTotal, expectedBase);
  });

  await t.test('rejects zero or negative square footage with validation error', async () => {
    await assert.rejects(
      async () => {
        await calculateInteriorEstimate({
          areaSqFt: 0,
          propertyCategory: '2bhk',
        });
      },
      {
        message: 'Valid positive square footage area is required.',
      }
    );

    await assert.rejects(
      async () => {
        await calculateInteriorEstimate({
          areaSqFt: -500,
          propertyCategory: '2bhk',
        });
      },
      {
        message: 'Valid positive square footage area is required.',
      }
    );
  });
});
