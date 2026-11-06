import React, { useEffect, useState } from 'react';
import { Save, Check, Globe, Phone, Mail, MapPin, Instagram, Sparkles } from 'lucide-react';
import { api } from '../services/api';

export default function ContentManager() {
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: '', type: '' });

  const [form, setForm] = useState({
    heroHeadline: '',
    heroSubheadline: '',
    heroImage: '',
    studioIntroTitle: '',
    studioIntroDescription: '',
    contactPhone: '+91 6280 609 005',
    contactWhatsapp: '+91 6280 609 005',
    contactEmail: 'architecturewonders05@gmail.com',
    contactAddress: 'Shop No. 8, First Floor, Star City Business Plaza, VIP Road, Near VCare Hospital, Zirakpur, Punjab – 140603',
    googleMapsUrl: '',
    instagramUrl: '',
    instagramHandle: '@architecturewonders05',
    ga4MeasurementId: '',
    gscVerificationCode: '',
  });

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await api.getSettings();
        if (res?.settings) {
          setForm({
            heroHeadline: res.settings.heroHeadline || '',
            heroSubheadline: res.settings.heroSubheadline || '',
            heroImage: res.settings.heroImage || '',
            studioIntroTitle: res.settings.studioIntroTitle || '',
            studioIntroDescription: res.settings.studioIntroDescription || '',
            contactPhone: res.settings.contactPhone || '+91 6280 609 005',
            contactWhatsapp: res.settings.contactWhatsapp || '+91 6280 609 005',
            contactEmail: res.settings.contactEmail || 'architecturewonders05@gmail.com',
            contactAddress: res.settings.contactAddress || 'Shop No. 8, First Floor, Star City Business Plaza, VIP Road, Near VCare Hospital, Zirakpur, Punjab – 140603',
            googleMapsUrl: res.settings.googleMapsUrl || '',
            instagramUrl: res.settings.instagramUrl || '',
            instagramHandle: res.settings.instagramHandle || '@architecturewonders05',
            ga4MeasurementId: res.settings.ga4MeasurementId || '',
            gscVerificationCode: res.settings.gscVerificationCode || '',
          });
        }
      } catch (e) {
        console.warn('Failed loading content settings');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });
    try {
      const res = await api.updateWebsiteSettings(form);
      if (res.success) {
        setMsg({ text: 'Website content and coordinates successfully updated.', type: 'success' });
      } else {
        setMsg({ text: 'Error updating content.', type: 'error' });
      }
    } catch (e) {
      setMsg({ text: 'Communication error with backend.', type: 'error' });
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl font-serif font-bold text-studio-charcoal">
          Website Content, Brand & SEO Settings
        </h1>
        <p className="text-xs text-studio-muted mt-1">
          Update homepage editorial copy, official contact coordinates, and analytics integration keys.
        </p>
      </div>

      {msg.text && (
        <div
          className={`p-3 text-xs flex items-center space-x-2 ${
            msg.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
          }`}
        >
          <span>{msg.text}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8 text-xs">
        {/* Homepage Hero Section */}
        <div className="bg-white border border-studio-border p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-serif font-semibold text-studio-charcoal flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-studio-teal" />
            <span>Homepage Hero Section</span>
          </h2>

          <div>
            <label className="block uppercase font-semibold text-studio-charcoal mb-1">
              Main Editorial Headline
            </label>
            <input
              type="text"
              value={form.heroHeadline}
              onChange={(e) => setForm({ ...form, heroHeadline: e.target.value })}
              className="w-full p-2.5 border border-studio-border text-sm outline-none focus:border-studio-teal"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold text-studio-charcoal mb-1">
              Hero Supporting Description
            </label>
            <textarea
              rows="2"
              value={form.heroSubheadline}
              onChange={(e) => setForm({ ...form, heroSubheadline: e.target.value })}
              className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold text-studio-charcoal mb-1">
              Hero Architectural Image URL
            </label>
            <input
              type="text"
              value={form.heroImage}
              onChange={(e) => setForm({ ...form, heroImage: e.target.value })}
              className="w-full p-2.5 border border-studio-border text-sm outline-none focus:border-studio-teal"
            />
          </div>
        </div>

        {/* Studio Introduction */}
        <div className="bg-white border border-studio-border p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-serif font-semibold text-studio-charcoal">
            Studio Introduction & Pedigree
          </h2>

          <div>
            <label className="block uppercase font-semibold text-studio-charcoal mb-1">
              Studio Introduction Heading
            </label>
            <input
              type="text"
              value={form.studioIntroTitle}
              onChange={(e) => setForm({ ...form, studioIntroTitle: e.target.value })}
              className="w-full p-2.5 border border-studio-border text-sm outline-none focus:border-studio-teal"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold text-studio-charcoal mb-1">
              Studio Narrative (Verified 2023 Establishment & 50+ Projects)
            </label>
            <textarea
              rows="4"
              value={form.studioIntroDescription}
              onChange={(e) => setForm({ ...form, studioIntroDescription: e.target.value })}
              className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
            />
          </div>
        </div>

        {/* Verified Business Contact Info */}
        <div className="bg-white border border-studio-border p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-serif font-semibold text-studio-charcoal flex items-center space-x-2">
            <Phone className="w-4 h-4 text-studio-teal" />
            <span>Verified Business Coordinates</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                Studio Phone Number
              </label>
              <input
                type="text"
                value={form.contactPhone}
                onChange={(e) => setForm({ ...form, contactPhone: e.target.value })}
                className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                WhatsApp Business Number
              </label>
              <input
                type="text"
                value={form.contactWhatsapp}
                onChange={(e) => setForm({ ...form, contactWhatsapp: e.target.value })}
                className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={form.contactEmail}
                onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
                className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                Instagram Handle
              </label>
              <input
                type="text"
                value={form.instagramHandle}
                onChange={(e) => setForm({ ...form, instagramHandle: e.target.value })}
                className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase font-semibold text-studio-charcoal mb-1">
              Studio Address
            </label>
            <input
              type="text"
              value={form.contactAddress}
              onChange={(e) => setForm({ ...form, contactAddress: e.target.value })}
              className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
            />
          </div>

          <div>
            <label className="block uppercase font-semibold text-studio-charcoal mb-1">
              Google Maps URL
            </label>
            <input
              type="text"
              value={form.googleMapsUrl}
              onChange={(e) => setForm({ ...form, googleMapsUrl: e.target.value })}
              className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
            />
          </div>
        </div>

        {/* Analytics & SEO */}
        <div className="bg-white border border-studio-border p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-serif font-semibold text-studio-charcoal flex items-center space-x-2">
            <Globe className="w-4 h-4 text-studio-teal" />
            <span>Search & Analytics Verification</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                Google Analytics 4 Measurement ID
              </label>
              <input
                type="text"
                placeholder="G-XXXXXXXXXX"
                value={form.ga4MeasurementId}
                onChange={(e) => setForm({ ...form, ga4MeasurementId: e.target.value })}
                className="w-full p-2.5 border border-studio-border font-mono outline-none focus:border-studio-teal"
              />
            </div>
            <div>
              <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                Google Search Console Token
              </label>
              <input
                type="text"
                placeholder="google-site-verification token"
                value={form.gscVerificationCode}
                onChange={(e) => setForm({ ...form, gscVerificationCode: e.target.value })}
                className="w-full p-2.5 border border-studio-border font-mono outline-none focus:border-studio-teal"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex items-center space-x-2 px-7 py-3 bg-studio-charcoal text-white uppercase tracking-widest font-semibold hover:bg-studio-teal transition-all"
        >
          <Save className="w-4 h-4" />
          <span>Save Studio Settings</span>
        </button>
      </form>
    </div>
  );
}
