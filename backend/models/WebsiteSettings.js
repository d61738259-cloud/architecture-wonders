import mongoose from 'mongoose';

const websiteSettingsSchema = new mongoose.Schema(
  {
    heroHeadline: {
      type: String,
      default: 'Sculpting Modern Living Spaces with Architectural Integrity',
    },
    heroSubheadline: {
      type: String,
      default:
        'A multidisciplinary architecture and interior design studio in Zirakpur, delivering bespoke residences across Chandigarh, Mohali, and the tri-city region.',
    },
    heroImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
    },
    studioIntroTitle: {
      type: String,
      default: 'Architecture Wonders — Established 2023',
    },
    studioIntroDescription: {
      type: String,
      default:
        'Founded with a dedication to spatial purity, thoughtful materiality, and client-tailored execution, Architecture Wonders brings over 50+ completed residential interior projects across Zirakpur, Chandigarh, and Mohali. We believe spaces should inspire tranquillity, reflect individuality, and endure through timeless craft.',
    },
    stats: {
      completedProjects: { type: Number, default: 50 },
      establishedYear: { type: Number, default: 2023 },
      satisfactionRate: { type: String, default: '100% Client-Centric' },
    },
    contactPhone: {
      type: String,
      default: '+91 6280 609 005',
    },
    contactWhatsapp: {
      type: String,
      default: '+91 6280 609 005',
    },
    contactEmail: {
      type: String,
      default: 'architecturewonders05@gmail.com',
    },
    contactAddress: {
      type: String,
      default:
        'Shop No. 8, First Floor, Star City Business Plaza, VIP Road, Near VCare Hospital, Zirakpur, Punjab – 140603',
    },
    googleMapsUrl: {
      type: String,
      default:
        'https://www.google.co.in/maps/place/Star+City+Business+Plaza,+Vip+Road+Zirakpur+Distt.+SAS+Nagar(Mohali)/@30.639488,76.8138192,17z/data=!3m1!4b1!4m6!3m5!1s0x390feb8a815f974f:0x50be1e51f848b644!8m2!3d30.639488!4d76.8163941!16s%2Fg%2F11v_26gqqg',
    },
    instagramUrl: {
      type: String,
      default: 'https://www.instagram.com/architecturewonders05/',
    },
    instagramHandle: {
      type: String,
      default: '@architecturewonders05',
    },
    ga4MeasurementId: {
      type: String,
      default: '',
    },
    gscVerificationCode: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

const WebsiteSettings = mongoose.model('WebsiteSettings', websiteSettingsSchema);
export default WebsiteSettings;
