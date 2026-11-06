import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Admin from '../models/Admin.js';
import WebsiteSettings from '../models/WebsiteSettings.js';
import CalculatorSettings from '../models/CalculatorSettings.js';
import CalculatorService from '../models/CalculatorService.js';
import Service from '../models/Service.js';
import Project from '../models/Project.js';
import Testimonial from '../models/Testimonial.js';
import BlogArticle from '../models/BlogArticle.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('[Seed] Connected to database. Preparing initial data...');

    // 1. Seed Super Admin
    const adminEmail = process.env.INITIAL_ADMIN_EMAIL || 'admin@architecturewonders.com';
    const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'StudioAW2026!';

    const existingAdmin = await Admin.findOne({ email: adminEmail.toLowerCase() });
    if (!existingAdmin) {
      await Admin.create({
        email: adminEmail.toLowerCase(),
        password: adminPassword,
        name: 'Principal Architect & Director',
        role: 'superadmin',
      });
      console.log(`[Seed] Initial Admin created: ${adminEmail} (Password: ${adminPassword})`);
    } else {
      console.log(`[Seed] Admin already exists: ${adminEmail}`);
    }

    // 2. Seed Website Settings with accurate verified business details
    const existingSettings = await WebsiteSettings.findOne();
    if (!existingSettings) {
      await WebsiteSettings.create({
        heroHeadline: 'Sculpting Modern Living Spaces with Architectural Integrity',
        heroSubheadline:
          'A multidisciplinary architecture and interior design studio in Zirakpur, delivering bespoke residences across Chandigarh, Mohali, and the tri-city region.',
        heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
        studioIntroTitle: 'Architecture Wonders — Established 2023',
        studioIntroDescription:
          'Founded in 2023 with an uncompromising devotion to spatial purity, natural illumination, and bespoke residential craftsmanship. Architecture Wonders brings over 50+ completed home interior projects across Zirakpur, Chandigarh, and Mohali. We balance timeless aesthetics with functional engineering.',
        stats: {
          completedProjects: 50,
          establishedYear: 2023,
          satisfactionRate: '100% Client-Centric',
        },
        contactPhone: '+91 6280 609 005',
        contactWhatsapp: '+91 6280 609 005',
        contactEmail: 'architecturewonders05@gmail.com',
        contactAddress:
          'Shop No. 8, First Floor, Star City Business Plaza, VIP Road, Near VCare Hospital, Zirakpur, Punjab – 140603',
        googleMapsUrl:
          'https://www.google.co.in/maps/place/Star+City+Business+Plaza,+Vip+Road+Zirakpur+Distt.+SAS+Nagar(Mohali)/@30.639488,76.8138192,17z/data=!3m1!4b1!4m6!3m5!1s0x390feb8a815f974f:0x50be1e51f848b644!8m2!3d30.639488!4d76.8163941!16s%2Fg%2F11v_26gqqg',
        instagramUrl: 'https://www.instagram.com/architecturewonders05/',
        instagramHandle: '@architecturewonders05',
      });
      console.log('[Seed] Website settings initialized.');
    }

    // 3. Seed Calculator Configuration
    const existingCalc = await CalculatorSettings.findOne();
    if (!existingCalc) {
      await CalculatorSettings.create({
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
      });
      console.log('[Seed] Calculator settings initialized.');
    }

    // 4. Seed Calculator Additional Services
    const calcServicesCount = await CalculatorService.countDocuments();
    if (calcServicesCount === 0) {
      const defaultCalcServices = [
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
      await CalculatorService.insertMany(defaultCalcServices);
      console.log('[Seed] Calculator additional services initialized.');
    }

    // 5. Seed 9 Core Services
    const servicesCount = await Service.countDocuments();
    if (servicesCount === 0) {
      const defaultServices = [
        {
          title: 'Complete Home Interior Design',
          slug: 'complete-home-interior-design',
          shortDescription:
            'Turnkey residential interior solutions tailored to modern lifestyles, combining spatial coherence, custom cabinetry, and ambient lighting.',
          fullDescription:
            'Our turnkey residential interior service oversees your entire home journey from initial architectural space planning to finishing decor. We harmonize living rooms, modular kitchens, master suites, and bespoke storage systems with timeless editorial aesthetics.',
          benefits: [
            'End-to-end single point accountability from concept to site handover',
            '3D photorealistic visualisation prior to on-site civil execution',
            'Carefully engineered spatial proportions maximizing natural ventilation',
            'Rigorous material specification with verified vendor warranties',
          ],
          designConsiderations: [
            'Circulation paths and ergonomic clearances',
            'Acoustic insulation and daylight trajectory',
            'Long-term durability of surfaces in tri-city climate conditions',
          ],
          faqs: [
            {
              question: 'How long does a complete home interior project take?',
              answer: 'Typically between 60 to 90 working days depending on floor area and customized millwork scope.',
            },
            {
              question: 'Do you provide 3D visual walkthroughs before execution?',
              answer: 'Yes, every project includes detailed 3D photorealistic renders and full material mood boards.',
            },
          ],
          coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          iconName: 'Home',
          displayOrder: 1,
        },
        {
          title: 'Residential Architecture',
          slug: 'residential-architecture',
          shortDescription:
            'Architectural blueprinting, structural planning, and elevation designs that fuse functional efficiency with contemporary sculptural form.',
          fullDescription:
            'From independent villas to multi-level private residences in Zirakpur and Chandigarh, our architectural services integrate climate-responsive orientation, structural elegance, and contextual zoning.',
          benefits: [
            'Bylaw compliance and structural safety analysis',
            'Optimized solar passive design reducing thermal loads',
            'Bespoke exterior elevations in natural stone, brick, and glass',
          ],
          designConsiderations: [
            'Local municipal building codes across Punjab & Chandigarh',
            'Structural column grids allowing open-plan interior flexibility',
          ],
          faqs: [
            {
              question: 'Can you assist with local municipal approvals in Zirakpur/Mohali?',
              answer: 'We prepare complete sanction-ready architectural drawings compliant with local development authorities.',
            },
          ],
          coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
          iconName: 'Building',
          displayOrder: 2,
        },
        {
          title: 'Modular Kitchen Design',
          slug: 'modular-kitchen-design',
          shortDescription:
            'Ergonomically engineered modular kitchens equipped with soft-close hardware, quartz worktops, and intelligent pantry mechanisms.',
          fullDescription:
            'A kitchen is the culinary heart of every contemporary home. We craft modular kitchens utilizing marine-grade BWR/BWP plywood, anti-fingerprint acrylic or PU finishes, quartz countertops, and international hardware brands.',
          benefits: [
            'Optimized kitchen work triangle (Sink, Hob, Refrigerator)',
            'Waterproof and termite-resistant carcass joinery',
            'Custom cutlery organizers, tall pantry units, and corner carousels',
          ],
          designConsiderations: [
            'Adequate task lighting below overhead cabinets',
            'High-capacity chimney ducting routing and thermal resistance',
          ],
          faqs: [
            {
              question: 'What materials are used for modular kitchen carcasses?',
              answer: 'We use calibrated IS:710 Marine Grade BWP ply with waterproof edge-banding.',
            },
          ],
          coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
          iconName: 'ChefHat',
          displayOrder: 3,
        },
        {
          title: 'Wardrobes & Storage Solutions',
          slug: 'wardrobes-storage-solutions',
          shortDescription:
            'Floor-to-ceiling sliding, hinged, and walk-in wardrobe configurations detailed with integrated warm sensor lighting.',
          fullDescription:
            'Our bespoke wardrobe systems optimize every vertical inch of your bedrooms. We design master walk-in closets, tinted glass aluminum profile wardrobes, and concealed vanity units.',
          benefits: [
            'Tailored internal configurations for Indian attire and western wear',
            'Zero dust intrusion with perimeter brush gaskets',
            'Sleek glass-fronted displays with hidden warm LEDs',
          ],
          coverImage: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
          iconName: 'Archive',
          displayOrder: 4,
        },
        {
          title: 'Living Room Design',
          slug: 'living-room-design',
          shortDescription:
            'Expansive, refined living spaces balancing conversation zones, bespoke television consoles, and artisanal wall compositions.',
          fullDescription:
            'We shape living rooms that leave a lasting impression while maintaining residential warmth. Thoughtful spatial planning combines custom seating, sculptural marble accents, and acoustic wood panelling.',
          benefits: [
            'Balanced proportions between formal seating and circulation',
            'Concealed wiring and seamless audiovisual integration',
            'Tactile fabric palettes paired with stone and metal accents',
          ],
          coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
          iconName: 'Sofa',
          displayOrder: 5,
        },
        {
          title: 'Bedroom Interior Design',
          slug: 'bedroom-interior-design',
          shortDescription:
            'Restful sanctuaries planned with ergonomic bed backings, blackout drapery pockets, and soothing neutral hues.',
          fullDescription:
            'Bedrooms require an intimate understanding of acoustics, lighting dimming, and comfort. We craft restful sanctuaries with custom headboards, bedside charging niches, and ambient cove illumination.',
          benefits: [
            'Circadian-friendly layered lighting design',
            'Acoustic wall panelling minimizing ambient hallway sounds',
            'Seamlessly integrated study desks and dresser areas',
          ],
          coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
          iconName: 'BedDouble',
          displayOrder: 6,
        },
        {
          title: 'False Ceiling & Lighting',
          slug: 'false-ceiling-lighting',
          shortDescription:
            'Architectural ceiling profiles with seamless cove detailing, magnetic track systems, and glare-free architectural luminaires.',
          fullDescription:
            'Lighting transforms architecture from static form into emotive space. We eliminate standard flat glare with indirect recessed coves, high-CRI downlights, and magnetic low-voltage accent tracks.',
          benefits: [
            'Multi-scene lighting control (Task, Ambient, Accent)',
            'Clean ceiling planes concealing AC conduits and electrical routing',
            'High-efficiency LED fixtures with 90+ Color Rendering Index (CRI)',
          ],
          coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
          iconName: 'Sun',
          displayOrder: 7,
        },
        {
          title: 'Space Planning & 3D Visualisation',
          slug: 'space-planning-3d-visualisation',
          shortDescription:
            'Precision 2D furniture layouts and photorealistic 3D interior renders providing complete clarity prior to construction.',
          fullDescription:
            'Before any hammer touches your walls, we provide complete visual clarity. You walk through your future home via realistic 3D renderings showcasing exact material textures, lighting, and finishes.',
          benefits: [
            'Prevents costly revisions during physical construction',
            'Accurate material quantification and estimation',
            'Full alignment on color palettes, drapery, and furniture scales',
          ],
          coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
          iconName: 'Layers',
          displayOrder: 8,
        },
        {
          title: 'Renovation & Remodelling',
          slug: 'renovation-remodelling',
          shortDescription:
            'Transformative structural remodelling, bathroom upgrades, and space re-layouts for existing homes and apartments.',
          fullDescription:
            'Breathe contemporary life into established properties. We specialize in structural wall removals, modern bathroom sanitary upgrades, and full interior aesthetic overhauls across Zirakpur and Chandigarh.',
          benefits: [
            'Carefully phased civil execution minimizing building disruption',
            'Plumbing and waterproofing rejuvenation with certified tests',
            'Maximizes property capital value and daily lifestyle efficiency',
          ],
          coverImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
          iconName: 'Hammer',
          displayOrder: 9,
        },
      ];
      await Service.insertMany(defaultServices);
      console.log('[Seed] 9 Core Services initialized.');
    }

    // 6. Seed Sample Verified Projects (Zirakpur, Chandigarh, Mohali)
    const projectsCount = await Project.countDocuments();
    if (projectsCount === 0) {
      const defaultProjects = [
        {
          title: 'The Contemporary Stone Residence',
          slug: 'the-contemporary-stone-residence',
          category: 'Full Home Interiors',
          location: 'VIP Road, Zirakpur',
          yearCompleted: 2024,
          areaSqFt: 2450,
          overview:
            'A 4BHK residential interior defined by limestone wall claddings, fluted timber partitions, and seamless Italian marble flooring.',
          designConcept: 'Modern Editorial Architecture with earthy neutral undertones and natural light orientation.',
          description:
            'Undertaken in 2024, this complete home interior project in Zirakpur balances open family spaces with private retreats. Custom woodwork in bleached walnut is complemented by subtle champagne brass trims.',
          coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
          gallery: [
            {
              url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
              caption: 'Double height living lounge with natural stone accent wall',
              altText: 'Living room in Zirakpur luxury apartment',
              order: 1,
            },
            {
              url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
              caption: 'Dining setting with minimalist bronze chandelier',
              altText: 'Dining room interior design Zirakpur',
              order: 2,
            },
            {
              url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
              caption: 'Island kitchen with anti-fingerprint acrylic cabinetry',
              altText: 'Modular kitchen interior',
              order: 3,
            },
          ],
          isFeatured: true,
          isPublished: true,
          displayOrder: 1,
        },
        {
          title: 'Minimalist Penthouse Sanctuary',
          slug: 'minimalist-penthouse-sanctuary',
          category: 'Living Rooms',
          location: 'Sector 82, Mohali',
          yearCompleted: 2024,
          areaSqFt: 1800,
          overview:
            'Expansive living lounge focusing on acoustic timber panels, concealed ambient illumination, and bespoke low-slung seating.',
          designConcept: 'Japanese-Scandinavian (Japandi) harmony with subdued earth pigments.',
          description:
            'This living space renovation in Mohali strips back unnecessary decoration to celebrate pure proportion, tactile linens, and calm architectural geometries.',
          coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
          gallery: [
            {
              url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
              caption: 'Central seating arrangement with fluted wood panelling',
              altText: 'Minimalist living room Mohali',
              order: 1,
            },
          ],
          isFeatured: true,
          isPublished: true,
          displayOrder: 2,
        },
        {
          title: 'The Monolithic Quartz Kitchen',
          slug: 'the-monolithic-quartz-kitchen',
          category: 'Modular Kitchens',
          location: 'Sector 48, Chandigarh',
          yearCompleted: 2024,
          areaSqFt: 350,
          overview:
            'A high-performance modular kitchen built with seamless Calacatta quartz countertops and push-to-open German cabinetry.',
          designConcept: 'Monolithic symmetry and clean culinary ergonomics.',
          description:
            'Designed for an avid culinary enthusiast in Chandigarh, this kitchen incorporates a 9-foot breakfast island, integrated under-cabinet sensor LEDs, and built-in appliances.',
          coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
          gallery: [
            {
              url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
              caption: 'Island counter with undermount sink and matte black tapware',
              altText: 'Modular kitchen Chandigarh',
              order: 1,
            },
          ],
          isFeatured: true,
          isPublished: true,
          displayOrder: 3,
        },
        {
          title: 'Serene Master Suite & Walk-in Closet',
          slug: 'serene-master-suite-walk-in-closet',
          category: 'Bedrooms',
          location: 'Highland Park, Zirakpur',
          yearCompleted: 2023,
          areaSqFt: 620,
          overview:
            'A restful bedroom sanctuary featuring an upholstered fluted headboard wall and a tinted-glass walk-in wardrobe.',
          designConcept: 'Warm minimalism with tactile boucle and smoked oak veneers.',
          description:
            'Completed in late 2023 for a residential homeowner in Zirakpur, this master suite emphasizes soft diffused lighting, acoustic tranquillity, and organized dressing storage.',
          coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
          gallery: [
            {
              url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
              caption: 'Master bed with fluted fabric acoustic wall panel',
              altText: 'Bedroom design Zirakpur',
              order: 1,
            },
          ],
          isFeatured: false,
          isPublished: true,
          displayOrder: 4,
        },
      ];
      await Project.insertMany(defaultProjects);
      console.log('[Seed] Projects initialized.');
    }

    // 7. Seed Initial Testimonials (for owner review/verification)
    const testimonialsCount = await Testimonial.countDocuments();
    if (testimonialsCount === 0) {
      const defaultTestimonials = [
        {
          clientName: 'S. Sharma',
          location: 'Zirakpur',
          projectTitle: '3BHK Complete Interior',
          rating: 5,
          reviewText:
            'Architecture Wonders handled our 3BHK flat on VIP Road with absolute professionalism. The 3D designs matched the final execution, and the modular kitchen craftsmanship is exceptional.',
          isVerifiedClient: true,
          isPublished: true,
          displayOrder: 1,
        },
        {
          clientName: 'M. Gill',
          location: 'Mohali',
          projectTitle: 'Living Room & False Ceiling',
          rating: 5,
          reviewText:
            'Their attention to lighting, ceiling proportions, and clean lines made our living room feel significantly larger and calm. Transparent communication throughout the project.',
          isVerifiedClient: true,
          isPublished: true,
          displayOrder: 2,
        },
      ];
      await Testimonial.insertMany(defaultTestimonials);
      console.log('[Seed] Testimonials initialized.');
    }

    // 8. Seed Editorial Articles
    const articlesCount = await BlogArticle.countDocuments();
    if (articlesCount === 0) {
      const defaultArticles = [
        {
          title: 'Principles of Modern Residential Architecture in the Tri-City Region',
          slug: 'modern-residential-architecture-tri-city',
          summary:
            'How thoughtful spatial orientation, natural cross-ventilation, and contemporary neutral materials shape lasting residential design across Zirakpur and Chandigarh.',
          content: `
# Principles of Modern Residential Architecture

When planning a residential home in the dynamic northern plains of Zirakpur, Chandigarh, and Mohali, architectural integrity starts with spatial planning and solar geometry.

### 1. Embracing Natural Illumination
Strategic positioning of fenestrations and clerestory windows ensures that living rooms receive soft northern daylight while shielding interior zones from harsh western solar gain during peak summer months.

### 2. The Contemporary Neutral Palette
Utilizing light stone, muted greys, and warm timber textures establishes a timeless environment that does not fatigue the eye. Instead of following fleeting trends, neutral backdrops allow personal art and natural greenery to breathe.

### 3. Integrated Storage as Architectural Architecture
Wardrobes and pantry cabinetry must not be treated as standalone furniture pieces. When built flush from floor to ceiling, they become seamless architectural wall planes that optimize acoustic and visual serenity.
          `.trim(),
          coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
          category: 'Architecture Insights',
          tags: ['Residential Architecture', 'Tri-City Design', 'Space Planning'],
          readTime: '4 min read',
          isPublished: true,
        },
        {
          title: 'Planning the Ergonomic Modular Kitchen: A Technical Guide',
          slug: 'planning-ergonomic-modular-kitchen-guide',
          summary:
            'From work triangle dimensions to water-resistant IS:710 ply specifications, learn how to construct a kitchen that endures daily demands without compromising elegance.',
          content: `
# Planning the Ergonomic Modular Kitchen

A high-performance kitchen balances culinary ergonomics with refined architectural surfaces.

### The Golden Work Triangle
The distance between the sink, cooking hob, and refrigeration unit should ideally range between 4 to 9 feet. This minimizes redundant steps during meal preparation while maintaining generous workspace on either side of the hob.

### Hardware Reliability
Always specify soft-close concealed hinges and dual-wall drawer systems with verified load capacities of at least 35-50 kg. This prevents door sagging and eliminates accidental cabinet impact.
          `.trim(),
          coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
          category: 'Modular Kitchens',
          tags: ['Modular Kitchen', 'Interior Design', 'Ergonomics'],
          readTime: '5 min read',
          isPublished: true,
        },
      ];
      await BlogArticle.insertMany(defaultArticles);
      console.log('[Seed] Editorial articles initialized.');
    }

    console.log('[Seed] Database initialization complete.');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]', error);
    process.exit(1);
  }
};

seedDatabase();
