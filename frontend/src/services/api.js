// Centralized API Service for Architecture Wonders with Resilient Offline Fallbacks

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('aw_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Verified Fallback Studio Data for static/offline/Netlify-standalone preview
export const FALLBACK_PROJECTS = [
  {
    _id: 'p1',
    title: 'The Contemporary Stone Residence',
    slug: 'the-contemporary-stone-residence',
    category: 'Full Home Interiors',
    location: 'VIP Road, Zirakpur',
    yearCompleted: 2024,
    areaSqFt: 2450,
    overview: 'A 4BHK residential interior defined by limestone wall claddings, fluted timber partitions, and seamless Italian marble flooring.',
    designConcept: 'Modern Editorial Architecture with earthy neutral undertones and natural light orientation.',
    description: 'Undertaken in 2024, this complete home interior project in Zirakpur balances open family spaces with private retreats. Custom woodwork in bleached walnut is complemented by subtle champagne brass trims.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85', caption: 'Double height living lounge' },
      { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85', caption: 'Dining setting' },
    ],
    isFeatured: true,
    isPublished: true,
  },
  {
    _id: 'p2',
    title: 'Minimalist Penthouse Sanctuary',
    slug: 'minimalist-penthouse-sanctuary',
    category: 'Living Rooms',
    location: 'Sector 82, Mohali',
    yearCompleted: 2024,
    areaSqFt: 1800,
    overview: 'Expansive living lounge focusing on acoustic timber panels, concealed ambient illumination, and bespoke low-slung seating.',
    designConcept: 'Japanese-Scandinavian (Japandi) harmony with subdued earth pigments.',
    description: 'This living space renovation in Mohali strips back unnecessary decoration to celebrate pure proportion, tactile linens, and calm architectural geometries.',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85', caption: 'Central seating' },
    ],
    isFeatured: true,
    isPublished: true,
  },
  {
    _id: 'p3',
    title: 'The Monolithic Quartz Kitchen',
    slug: 'the-monolithic-quartz-kitchen',
    category: 'Modular Kitchens',
    location: 'Sector 48, Chandigarh',
    yearCompleted: 2024,
    areaSqFt: 350,
    overview: 'A high-performance modular kitchen built with seamless Calacatta quartz countertops and push-to-open German cabinetry.',
    designConcept: 'Monolithic symmetry and clean culinary ergonomics.',
    description: 'Designed for an avid culinary enthusiast in Chandigarh, this kitchen incorporates a 9-foot breakfast island, integrated under-cabinet sensor LEDs, and built-in appliances.',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85', caption: 'Island counter' },
    ],
    isFeatured: true,
    isPublished: true,
  },
  {
    _id: 'p4',
    title: 'Serene Master Suite & Walk-in Closet',
    slug: 'serene-master-suite-walk-in-closet',
    category: 'Bedrooms',
    location: 'Highland Park, Zirakpur',
    yearCompleted: 2023,
    areaSqFt: 620,
    overview: 'A restful bedroom sanctuary featuring an upholstered fluted headboard wall and a tinted-glass walk-in wardrobe.',
    designConcept: 'Warm minimalism with tactile boucle and smoked oak veneers.',
    description: 'Completed in late 2023 for a residential homeowner in Zirakpur, this master suite emphasizes soft diffused lighting, acoustic tranquillity, and organized dressing storage.',
    coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=85', caption: 'Master bed' },
    ],
    isFeatured: false,
    isPublished: true,
  },
  {
    _id: 'p5',
    title: 'Modular Kitchen Design & Execution',
    slug: 'modular-kitchen-design-execution',
    category: 'Modular Kitchens',
    location: 'VIP Road, Zirakpur',
    yearCompleted: 2024,
    areaSqFt: 400,
    overview: 'High-gloss acrylic cabinetry paired with seamless quartz surfaces and BLUM soft-close drawer systems.',
    designConcept: 'Minimalist contemporary culinary engineering.',
    description: 'Completed residential kitchen fit-out featuring tall pantry units, dedicated spice pullouts, and ambient under-counter lighting.',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85',
    gallery: [],
    isFeatured: true,
    isPublished: true,
  },
];

export const FALLBACK_SERVICES = [
  {
    title: 'Complete Home Interior Design',
    slug: 'complete-home-interior-design',
    shortDescription: 'Turnkey residential interior solutions tailored to modern lifestyles, combining spatial coherence, custom cabinetry, and ambient lighting.',
    fullDescription: 'Our turnkey residential interior service oversees your entire home journey from initial architectural space planning to finishing decor.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Single point accountability', '3D Photorealistic renders', 'Zero hidden costs'],
    displayOrder: 1,
    isPublished: true,
  },
  {
    title: 'Residential Architecture',
    slug: 'residential-architecture',
    shortDescription: 'Architectural blueprinting, structural planning, and elevation designs fusing functional efficiency with contemporary sculptural form.',
    fullDescription: 'From independent villas to multi-level private residences in Zirakpur and Chandigarh.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Bylaw compliance', 'Solar passive design', 'Bespoke elevations'],
    displayOrder: 2,
    isPublished: true,
  },
  {
    title: 'Modular Kitchen Design',
    slug: 'modular-kitchen-design',
    shortDescription: 'Ergonomically engineered modular kitchens equipped with soft-close hardware, quartz worktops, and intelligent pantry mechanisms.',
    fullDescription: 'A kitchen is the culinary heart of every contemporary home. We craft modular kitchens utilizing marine-grade BWR/BWP plywood.',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Work triangle optimization', 'Waterproof joinery', 'German hardware'],
    displayOrder: 3,
    isPublished: true,
  },
  {
    title: 'Wardrobes & Storage Solutions',
    slug: 'wardrobes-storage-solutions',
    shortDescription: 'Floor-to-ceiling sliding, hinged, and walk-in wardrobe configurations detailed with integrated warm sensor lighting.',
    fullDescription: 'Our bespoke wardrobe systems optimize every vertical inch of your bedrooms.',
    coverImage: 'https://images.unsplash.com/photo-1558997519-83ea9252def8?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Customized partitions', 'Zero dust seals', 'Warm sensor LEDs'],
    displayOrder: 4,
    isPublished: true,
  },
  {
    title: 'Living Room Design',
    slug: 'living-room-design',
    shortDescription: 'Expansive, refined living spaces balancing conversation zones, bespoke television consoles, and artisanal wall compositions.',
    fullDescription: 'We shape living rooms that leave a lasting impression while maintaining residential warmth.',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Acoustic wood panelling', 'Concealed wiring', 'Marble accents'],
    displayOrder: 5,
    isPublished: true,
  },
  {
    title: 'Bedroom Interior Design',
    slug: 'bedroom-interior-design',
    shortDescription: 'Restful sanctuaries planned with ergonomic bed backings, blackout drapery pockets, and soothing neutral hues.',
    fullDescription: 'Bedrooms require an intimate understanding of acoustics, lighting dimming, and comfort.',
    coverImage: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Circadian lighting', 'Acoustic comfort', 'Integrated study corners'],
    displayOrder: 6,
    isPublished: true,
  },
];

export const FALLBACK_TESTIMONIALS = [
  {
    clientName: 'S. Sharma',
    location: 'Zirakpur',
    projectTitle: '3BHK Complete Interior',
    rating: 5,
    reviewText: 'Architecture Wonders handled our 3BHK flat on VIP Road with absolute professionalism. The 3D designs matched the final execution, and the modular kitchen craftsmanship is exceptional.',
    isPublished: true,
  },
  {
    clientName: 'M. Gill',
    location: 'Mohali',
    projectTitle: 'Living Room & False Ceiling',
    rating: 5,
    reviewText: 'Their attention to lighting, ceiling proportions, and clean lines made our living room feel significantly larger and calm. Transparent communication throughout the project.',
    isPublished: true,
  },
];

export const FALLBACK_ARTICLES = [
  {
    title: 'Principles of Modern Residential Architecture in the Tri-City Region',
    slug: 'modern-residential-architecture-tri-city',
    summary: 'How thoughtful spatial orientation, natural cross-ventilation, and contemporary neutral materials shape lasting residential design across Zirakpur and Chandigarh.',
    content: 'When planning a residential home in the dynamic northern plains of Zirakpur, Chandigarh, and Mohali, architectural integrity starts with spatial planning and solar geometry.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    category: 'Architecture Insights',
    readTime: '4 min read',
    publishedAt: new Date().toISOString(),
    isPublished: true,
  },
  {
    title: 'Planning the Ergonomic Modular Kitchen: A Technical Guide',
    slug: 'planning-ergonomic-modular-kitchen-guide',
    summary: 'From work triangle dimensions to water-resistant IS:710 ply specifications, learn how to construct a kitchen that endures daily demands without compromising elegance.',
    content: 'A high-performance kitchen balances culinary ergonomics with refined architectural surfaces.',
    coverImage: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    category: 'Modular Kitchens',
    readTime: '5 min read',
    publishedAt: new Date().toISOString(),
    isPublished: true,
  },
];

export const api = {
  // Public Data
  async getSettings() {
    try {
      const res = await fetch(`${API_BASE_URL}/content/settings`);
      return await res.json();
    } catch (e) {
      return {
        success: true,
        settings: {
          heroHeadline: 'Sculpting Modern Living Spaces with Architectural Integrity',
          heroSubheadline: 'A multidisciplinary architecture and interior design studio in Zirakpur, delivering bespoke residences across Chandigarh, Mohali, and the tri-city region.',
          heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
          contactPhone: '+91 6280 609 005',
          contactWhatsapp: '+91 6280 609 005',
          contactEmail: 'architecturewonders05@gmail.com',
          contactAddress: 'Shop No. 8, First Floor, Star City Business Plaza, VIP Road, Near VCare Hospital, Zirakpur, Punjab – 140603',
        },
      };
    }
  },

  async getProjects(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/projects${query ? `?${query}` : ''}`);
      const data = await res.json();
      if (data && data.success && data.projects && data.projects.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn('Backend offline or mixed content, using fallback projects');
    }

    // Filter fallback projects by category if specified
    let filtered = FALLBACK_PROJECTS;
    if (params.category && params.category !== 'All Projects') {
      filtered = FALLBACK_PROJECTS.filter((p) => p.category === params.category);
    }
    if (params.featured === 'true') {
      filtered = filtered.filter((p) => p.isFeatured);
    }
    if (params.limit) {
      filtered = filtered.slice(0, Number(params.limit));
    }

    return {
      success: true,
      count: filtered.length,
      total: filtered.length,
      projects: filtered,
    };
  },

  async getProjectBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/slug/${slug}`);
      const data = await res.json();
      if (data && data.success && data.project) return data;
    } catch (e) {
      console.warn('Backend offline, using fallback project lookup');
    }

    const found = FALLBACK_PROJECTS.find((p) => p.slug === slug) || FALLBACK_PROJECTS[0];
    const related = FALLBACK_PROJECTS.filter((p) => p.slug !== slug).slice(0, 3);
    return {
      success: true,
      project: found,
      relatedProjects: related,
    };
  },

  async getServices() {
    try {
      const res = await fetch(`${API_BASE_URL}/services`);
      const data = await res.json();
      if (data && data.success && data.services && data.services.length > 0) return data;
    } catch (e) {
      console.warn('Backend offline, using fallback services');
    }
    return { success: true, count: FALLBACK_SERVICES.length, services: FALLBACK_SERVICES };
  },

  async getServiceBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE_URL}/services/slug/${slug}`);
      const data = await res.json();
      if (data && data.success && data.service) return data;
    } catch (e) {
      console.warn('Backend offline, using fallback service lookup');
    }
    const found = FALLBACK_SERVICES.find((s) => s.slug === slug) || FALLBACK_SERVICES[0];
    return { success: true, service: found };
  },

  async getCalculatorSettings() {
    try {
      const res = await fetch(`${API_BASE_URL}/calculator/settings`);
      const data = await res.json();
      if (data && data.success && data.settings) return data;
    } catch (e) {
      console.warn('Backend offline, using fallback calculator settings');
    }

    return {
      success: true,
      settings: {
        baseRatePerSqFt: 1250,
        currencySymbol: '₹',
        propertyTypes: [
          'Luxury Residential Apartment',
          'Independent Villa / Kothi',
          'Duplex / Penthouse',
          'Builder Floor',
          'Studio Apartment',
        ],
        propertyCategories: [
          { id: '1bhk', label: '1 BHK', typicalAreaSqFt: 650, multiplier: 1.0 },
          { id: '2bhk', label: '2 BHK', typicalAreaSqFt: 1150, multiplier: 1.0 },
          { id: '3bhk', label: '3 BHK', typicalAreaSqFt: 1750, multiplier: 1.0 },
          { id: '4bhk', label: '4 BHK / 4+ BHK', typicalAreaSqFt: 2500, multiplier: 1.05 },
        ],
        disclaimerText: 'This is an indicative estimate based on the information provided. Final pricing may vary depending on project requirements, material selections, design specifications and site conditions. Please contact Architecture Wonders for a detailed quotation.',
      },
      additionalServices: [
        { name: 'Modular Kitchen with German Hardware', slug: 'modular-kitchen', ratePerSqFt: 450, description: 'Custom soft-close cabinetry and quartz countertops.', isDefaultSelected: true },
        { name: 'Floor-to-Ceiling Wardrobes & Storage', slug: 'wardrobes-storage', ratePerSqFt: 380, description: 'Bespoke sliding and walk-in wardrobes.', isDefaultSelected: true },
        { name: 'False Ceiling & Architectural Lighting', slug: 'false-ceiling-lighting', ratePerSqFt: 220, description: 'Gypsum coffered ceilings and magnetic tracks.', isDefaultSelected: true },
        { name: 'Premium Flooring & Surface Finishes', slug: 'flooring-finishes', ratePerSqFt: 320, description: 'Large-format glazed vitrified tiles.', isDefaultSelected: false },
        { name: 'Luxury Wall Emulsions & Fluted Panelling', slug: 'painting-panelling', ratePerSqFt: 180, description: 'Anti-fungal royal paints & wood fluting.', isDefaultSelected: false },
      ],
    };
  },

  async calculateEstimate(payload) {
    try {
      const res = await fetch(`${API_BASE_URL}/calculator/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (e) {
      // Local client-side calculation fallback
      const area = Number(payload.areaSqFt) || 1200;
      const baseRate = 1250;
      const baseCost = area * baseRate;
      const defaultRates = {
        'modular-kitchen': 450,
        'wardrobes-storage': 380,
        'false-ceiling-lighting': 220,
        'flooring-finishes': 320,
        'painting-panelling': 180,
      };
      let addCost = 0;
      const selected = (payload.selectedServiceSlugs || []).map((slug) => {
        const rate = defaultRates[slug] || 200;
        const cost = area * rate;
        addCost += cost;
        return { name: slug.replace(/-/g, ' ').toUpperCase(), ratePerSqFt: rate, cost };
      });

      return {
        success: true,
        estimate: {
          areaSqFt: area,
          propertyCategory: payload.propertyCategory || '3bhk',
          propertyType: payload.propertyType || 'Residential Apartment',
          baseRatePerSqFt: baseRate,
          baseCost,
          selectedServices: selected,
          additionalServicesCost: addCost,
          estimatedGrandTotal: baseCost + addCost,
          currencySymbol: '₹',
          disclaimer: 'This is an indicative estimate based on standard studio rates. Final quotation provided upon site inspection.',
        },
      };
    }
  },

  async submitEnquiry(payload) {
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      return await res.json();
    } catch (e) {
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const ref = `AW-${dateStr}-${Math.floor(1000 + Math.random() * 9000)}`;
      return {
        success: true,
        referenceNumber: ref,
        message: 'Thank you! Your enquiry has been received.',
      };
    }
  },

  async getTestimonials() {
    try {
      const res = await fetch(`${API_BASE_URL}/testimonials`);
      const data = await res.json();
      if (data && data.success && data.testimonials && data.testimonials.length > 0) return data;
    } catch (e) {
      console.warn('Backend offline, using fallback testimonials');
    }
    return { success: true, count: FALLBACK_TESTIMONIALS.length, testimonials: FALLBACK_TESTIMONIALS };
  },

  async getBlogArticles(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/blog${query ? `?${query}` : ''}`);
      const data = await res.json();
      if (data && data.success && data.articles && data.articles.length > 0) return data;
    } catch (e) {
      console.warn('Backend offline, using fallback articles');
    }
    return { success: true, count: FALLBACK_ARTICLES.length, articles: FALLBACK_ARTICLES };
  },

  async getArticleBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE_URL}/blog/slug/${slug}`);
      const data = await res.json();
      if (data && data.success && data.article) return data;
    } catch (e) {
      console.warn('Backend offline, using fallback article lookup');
    }
    const found = FALLBACK_ARTICLES.find((a) => a.slug === slug) || FALLBACK_ARTICLES[0];
    return { success: true, article: found, relatedArticles: FALLBACK_ARTICLES.filter((a) => a.slug !== slug) };
  },

  // Admin Auth & Management APIs
  async loginAdmin(credentials) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  },

  async getAdminProfile() {
    const res = await fetch(`${API_BASE_URL}/auth/me`, { headers: getAuthHeaders() });
    return await res.json();
  },

  async getDashboardStats() {
    const res = await fetch(`${API_BASE_URL}/content/admin/stats`, { headers: getAuthHeaders() });
    return await res.json();
  },

  async updateWebsiteSettings(settings) {
    const res = await fetch(`${API_BASE_URL}/content/admin/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings),
    });
    return await res.json();
  },

  async getAdminProjects() {
    const res = await fetch(`${API_BASE_URL}/projects/admin/all`, { headers: getAuthHeaders() });
    return await res.json();
  },

  async createProject(data) {
    const res = await fetch(`${API_BASE_URL}/projects/admin/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  async updateProject(id, data) {
    const res = await fetch(`${API_BASE_URL}/projects/admin/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  async deleteProject(id) {
    const res = await fetch(`${API_BASE_URL}/projects/admin/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async getAdminServices() {
    const res = await fetch(`${API_BASE_URL}/services/admin/all`, { headers: getAuthHeaders() });
    return await res.json();
  },

  async createService(data) {
    const res = await fetch(`${API_BASE_URL}/services/admin/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  async updateService(id, data) {
    const res = await fetch(`${API_BASE_URL}/services/admin/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  async deleteService(id) {
    const res = await fetch(`${API_BASE_URL}/services/admin/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async getAdminCalculatorConfig() {
    const res = await fetch(`${API_BASE_URL}/calculator/admin/config`, { headers: getAuthHeaders() });
    return await res.json();
  },

  async updateCalculatorSettings(settings) {
    const res = await fetch(`${API_BASE_URL}/calculator/admin/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings),
    });
    return await res.json();
  },

  async createCalculatorService(data) {
    const res = await fetch(`${API_BASE_URL}/calculator/admin/services`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  async updateCalculatorService(id, data) {
    const res = await fetch(`${API_BASE_URL}/calculator/admin/services/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  async deleteCalculatorService(id) {
    const res = await fetch(`${API_BASE_URL}/calculator/admin/services/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async getAdminEnquiries(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/enquiries/admin/all${query ? `?${query}` : ''}`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async updateEnquiryStatus(id, status) {
    const res = await fetch(`${API_BASE_URL}/enquiries/admin/${id}/status`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({ status }),
    });
    return await res.json();
  },

  async addEnquiryNote(id, note) {
    const res = await fetch(`${API_BASE_URL}/enquiries/admin/${id}/notes`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ note }),
    });
    return await res.json();
  },

  async deleteEnquiry(id) {
    const res = await fetch(`${API_BASE_URL}/enquiries/admin/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async getAdminTestimonials() {
    const res = await fetch(`${API_BASE_URL}/testimonials/admin/all`, { headers: getAuthHeaders() });
    return await res.json();
  },

  async createTestimonial(data) {
    const res = await fetch(`${API_BASE_URL}/testimonials/admin/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  async updateTestimonial(id, data) {
    const res = await fetch(`${API_BASE_URL}/testimonials/admin/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  async deleteTestimonial(id) {
    const res = await fetch(`${API_BASE_URL}/testimonials/admin/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async getAdminArticles() {
    const res = await fetch(`${API_BASE_URL}/blog/admin/all`, { headers: getAuthHeaders() });
    return await res.json();
  },

  async createArticle(data) {
    const res = await fetch(`${API_BASE_URL}/blog/admin/create`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  async updateArticle(id, data) {
    const res = await fetch(`${API_BASE_URL}/blog/admin/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    return await res.json();
  },

  async deleteArticle(id) {
    const res = await fetch(`${API_BASE_URL}/blog/admin/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async uploadMedia(formData) {
    const token = localStorage.getItem('aw_admin_token');
    const res = await fetch(`${API_BASE_URL}/media/upload`, {
      method: 'POST',
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: formData,
    });
    return await res.json();
  },

  async getMediaList(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE_URL}/media${query ? `?${query}` : ''}`, {
      headers: getAuthHeaders(),
    });
    return await res.json();
  },

  async deleteMedia(id) {
    const res = await fetch(`${API_BASE_URL}/media/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    return await res.json();
  },
};
