// Centralized API Service for Architecture Wonders
// Features Full LocalStorage Persistence for Standalone / Backend-Free Client Mode
// When a live backend API is available, it communicates with the server;
// When backend is offline, it provides seamless real-time client-side CRUD persistence.

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('aw_admin_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// ==============================================================
// 1. VERIFIED STUDIO SEED DATA
// ==============================================================

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
    _id: 's1',
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
    _id: 's2',
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
    _id: 's3',
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
    _id: 's4',
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
    _id: 's5',
    title: 'Living Room Design',
    slug: 'living-room-design',
    shortDescription: 'Expansive, refined living spaces balancing conversation zones, bespoke television consoles, and artisanal wall compositions.',
    fullDescription: 'Living rooms are the social heart of the residence.',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Custom media consoles', 'Acoustic treatment', 'Layered lighting'],
    displayOrder: 5,
    isPublished: true,
  },
  {
    _id: 's6',
    title: '3D Architectural Visualization & Walkthroughs',
    slug: '3d-architectural-visualization',
    shortDescription: 'Photorealistic architectural CGI renderings and immersive virtual walkthroughs to experience materiality before construction.',
    fullDescription: 'Ensure every line and tone is perfected before procurement commences.',
    coverImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    benefits: ['Precision lighting simulations', 'Material texture preview', 'Virtual walk simulation'],
    displayOrder: 6,
    isPublished: true,
  },
];

export const FALLBACK_CALCULATOR_SETTINGS = {
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
};

export const FALLBACK_CALCULATOR_SERVICES = [
  { _id: 'cs1', name: 'Modular Kitchen with German Hardware', slug: 'modular-kitchen', ratePerSqFt: 450, description: 'Custom soft-close cabinetry and quartz countertops.', isDefaultSelected: true },
  { _id: 'cs2', name: 'Floor-to-Ceiling Wardrobes & Storage', slug: 'wardrobes-storage', ratePerSqFt: 380, description: 'Bespoke sliding and walk-in wardrobes.', isDefaultSelected: true },
  { _id: 'cs3', name: 'False Ceiling & Architectural Lighting', slug: 'false-ceiling-lighting', ratePerSqFt: 220, description: 'Gypsum coffered ceilings and magnetic tracks.', isDefaultSelected: true },
  { _id: 'cs4', name: 'Premium Flooring & Surface Finishes', slug: 'flooring-finishes', ratePerSqFt: 320, description: 'Large-format glazed vitrified tiles.', isDefaultSelected: false },
  { _id: 'cs5', name: 'Luxury Wall Emulsions & Fluted Panelling', slug: 'painting-panelling', ratePerSqFt: 180, description: 'Anti-fungal royal paints & wood fluting.', isDefaultSelected: false },
];

export const FALLBACK_TESTIMONIALS = [
  {
    _id: 't1',
    clientName: 'Rajinder Sharma',
    location: 'VIP Road, Zirakpur',
    projectTitle: '3BHK Complete Home Interiors',
    rating: 5,
    reviewText: 'Architecture Wonders transformed our 3BHK on VIP Road with extraordinary finesse. From the minimalist stone media console to the modular kitchen, the execution was flawless.',
    isPublished: true,
  },
  {
    _id: 't2',
    clientName: 'Dr. Amitav Banerjee',
    location: 'Sector 82, Mohali',
    projectTitle: 'Penthouse Interior & Living Lounge',
    rating: 5,
    reviewText: 'The team brings authentic architectural discipline to residential interior design. Clean lines, hidden illumination, and zero compromise on wood quality.',
    isPublished: true,
  },
  {
    _id: 't3',
    clientName: 'Simran & Gurpreet Dhillon',
    location: 'Sector 20, Panchkula',
    projectTitle: 'Villa Architecture & Custom Millwork',
    rating: 5,
    reviewText: 'Working with Architecture Wonders was refreshing. Transparent line-item pricing, strict adherence to promised timelines, and exquisite finishing.',
    isPublished: true,
  },
];

export const FALLBACK_ARTICLES = [
  {
    _id: 'a1',
    title: 'Understanding Interior Design Cost per Sq Ft in Zirakpur & Chandigarh (2026 Guide)',
    slug: 'understanding-interior-cost-per-sqft-zirakpur-chandigarh',
    summary: 'A transparent architectural breakdown of residential interior costs across Zirakpur, Mohali, and Chandigarh, detailing where budgets are allocated from civil woodwork to lighting.',
    content: 'Embarking on a residential interior project in the tri-city area requires a clear appreciation of material grades, hardware specifications, and contractor labour overheads.',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    category: 'Cost & Budgeting',
    readTime: '6 min read',
    publishedAt: new Date().toISOString(),
    isPublished: true,
  },
  {
    _id: 'a2',
    title: 'Timeless Material Palettes for Modern Residences in Punjab',
    slug: 'timeless-material-palettes-for-contemporary-punjab-homes',
    summary: 'How combining indigenous limestone, fluted smoked oak, champagne brass trims, and breathable linens creates homes that age gracefully under regional climates.',
    content: 'Contemporary residential architecture in North India has evolved beyond transient trends toward enduring material honesty.',
    coverImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    category: 'Design Philosophy',
    readTime: '4 min read',
    publishedAt: new Date().toISOString(),
    isPublished: true,
  },
  {
    _id: 'a3',
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

export const FALLBACK_WEBSITE_SETTINGS = {
  heroHeadline: 'Sculpting Modern Living Spaces with Architectural Integrity',
  heroSubheadline: 'A multidisciplinary architecture and interior design studio in Zirakpur, delivering bespoke residences across Chandigarh, Mohali, and the tri-city region.',
  heroImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
  contactPhone: '+91 6280 609 005',
  contactWhatsapp: '+91 6280 609 005',
  contactEmail: 'architecturewonders05@gmail.com',
  contactAddress: 'Shop No. 8, First Floor, Star City Business Plaza, VIP Road, Near VCare Hospital, Zirakpur, Punjab – 140603',
  googleMapsUrl: 'https://www.google.co.in/maps/place/Star+City+Business+Plaza,+Vip+Road+Zirakpur+Distt.+SAS+Nagar(Mohali)/@30.639488,76.8138192,17z/data=!3m1!4b1!4m6!3m5!1s0x390feb8a815f974f:0x50be1e51f848b644!8m2!3d30.639488!4d76.8163941!16s%2Fg%2F11v_26gqqg',
  instagramUrl: 'https://www.instagram.com/architecturewonders05/',
  instagramHandle: '@architecturewonders05',
};

export const FALLBACK_ENQUIRIES = [
  {
    _id: 'enq-1',
    referenceNumber: 'AW-20261106-1001',
    clientName: 'Rajinder Sharma',
    phone: '+91 98140 12345',
    email: 'rajinder.s@gmail.com',
    city: 'VIP Road, Zirakpur',
    serviceType: 'Full Home Interiors',
    areaSqFt: 2200,
    bhkConfig: '3BHK',
    scope: ['Woodwork', 'Modular Kitchen', 'False Ceiling', 'Electrical'],
    designPackage: 'premium',
    status: 'new',
    estimatedCost: 2640000,
    notes: 'Client looking to start execution by end of month.',
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'enq-2',
    referenceNumber: 'AW-20261105-1002',
    clientName: 'Priya Mehra',
    phone: '+91 98765 43210',
    email: 'priya.mehra@gmail.com',
    city: 'Sector 82, Mohali',
    serviceType: 'Modular Kitchens',
    areaSqFt: 250,
    bhkConfig: 'Villa',
    scope: ['Modular Kitchen', 'Quartz Countertop', 'German Hardware'],
    designPackage: 'luxury',
    status: 'contacted',
    estimatedCost: 450000,
    notes: 'Discussion ongoing regarding acrylic finish vs PU polish.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

// ==============================================================
// 2. PERSISTENCE ENGINE (LOCALSTORAGE)
// ==============================================================

const STORAGE_KEYS = {
  PROJECTS: 'aw_store_projects_v2',
  SERVICES: 'aw_store_services_v2',
  CALC_SETTINGS: 'aw_store_calc_settings_v2',
  CALC_SERVICES: 'aw_store_calc_services_v2',
  ENQUIRIES: 'aw_store_enquiries_v2',
  TESTIMONIALS: 'aw_store_testimonials_v2',
  ARTICLES: 'aw_store_articles_v2',
  SETTINGS: 'aw_store_website_settings_v2',
  MEDIA: 'aw_store_media_v2',
};

function getLocal(key, defaultVal) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(defaultVal));
      return defaultVal;
    }
    return JSON.parse(raw);
  } catch (e) {
    return defaultVal;
  }
}

function setLocal(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('LocalStorage write error', e);
  }
}

function slugify(text) {
  return (text || '')
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

// ==============================================================
// 3. MASTER API CONTROLLER
// ==============================================================

export const api = {
  // Reset all client data back to studio factory defaults
  resetToFactoryDefaults() {
    setLocal(STORAGE_KEYS.PROJECTS, FALLBACK_PROJECTS);
    setLocal(STORAGE_KEYS.SERVICES, FALLBACK_SERVICES);
    setLocal(STORAGE_KEYS.CALC_SETTINGS, FALLBACK_CALCULATOR_SETTINGS);
    setLocal(STORAGE_KEYS.CALC_SERVICES, FALLBACK_CALCULATOR_SERVICES);
    setLocal(STORAGE_KEYS.ENQUIRIES, FALLBACK_ENQUIRIES);
    setLocal(STORAGE_KEYS.TESTIMONIALS, FALLBACK_TESTIMONIALS);
    setLocal(STORAGE_KEYS.ARTICLES, FALLBACK_ARTICLES);
    setLocal(STORAGE_KEYS.SETTINGS, FALLBACK_WEBSITE_SETTINGS);
    setLocal(STORAGE_KEYS.MEDIA, []);
    return { success: true, message: 'All studio datasets reset to verified defaults.' };
  },

  // ----------------- Website Settings -----------------
  async getSettings() {
    try {
      const res = await fetch(`${API_BASE_URL}/content/settings`);
      const data = await res.json();
      if (data?.success && data?.settings) return data;
    } catch (e) {
      // Offline fallback
    }
    const settings = getLocal(STORAGE_KEYS.SETTINGS, FALLBACK_WEBSITE_SETTINGS);
    return { success: true, settings };
  },

  async updateWebsiteSettings(newSettings) {
    try {
      const res = await fetch(`${API_BASE_URL}/content/admin/settings`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(newSettings),
      });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback
    }
    const current = getLocal(STORAGE_KEYS.SETTINGS, FALLBACK_WEBSITE_SETTINGS);
    const updated = { ...current, ...newSettings };
    setLocal(STORAGE_KEYS.SETTINGS, updated);
    return { success: true, settings: updated };
  },

  // ----------------- Projects -----------------
  async getProjects(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/projects${query ? `?${query}` : ''}`);
      const data = await res.json();
      if (data?.success && data?.projects?.length > 0) return data;
    } catch (e) {
      // Offline fallback
    }

    let list = getLocal(STORAGE_KEYS.PROJECTS, FALLBACK_PROJECTS);
    list = list.filter((p) => p.isPublished !== false);

    if (params.category && params.category !== 'All Projects') {
      list = list.filter((p) => p.category === params.category);
    }
    if (params.featured === 'true') {
      list = list.filter((p) => p.isFeatured);
    }
    if (params.limit) {
      list = list.slice(0, Number(params.limit));
    }

    return { success: true, count: list.length, total: list.length, projects: list };
  },

  async getProjectBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/slug/${slug}`);
      const data = await res.json();
      if (data?.success && data?.project) return data;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.PROJECTS, FALLBACK_PROJECTS);
    const found = list.find((p) => p.slug === slug) || list[0];
    const related = list.filter((p) => p.slug !== slug).slice(0, 3);
    return { success: true, project: found, relatedProjects: related };
  },

  async getAdminProjects() {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/admin/all`, { headers: getAuthHeaders() });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback
    }
    const list = getLocal(STORAGE_KEYS.PROJECTS, FALLBACK_PROJECTS);
    return { success: true, count: list.length, projects: list };
  },

  async createProject(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/admin/create`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData?.success) return resData;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.PROJECTS, FALLBACK_PROJECTS);
    const newProj = {
      ...data,
      _id: 'p_' + Date.now(),
      slug: slugify(data.title) || 'project-' + Date.now(),
      yearCompleted: Number(data.yearCompleted) || new Date().getFullYear(),
      areaSqFt: Number(data.areaSqFt) || 1200,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    list.unshift(newProj);
    setLocal(STORAGE_KEYS.PROJECTS, list);
    return { success: true, project: newProj };
  },

  async updateProject(id, data) {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/admin/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData?.success) return resData;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.PROJECTS, FALLBACK_PROJECTS);
    const idx = list.findIndex((p) => p._id === id);
    if (idx !== -1) {
      list[idx] = {
        ...list[idx],
        ...data,
        slug: data.title ? slugify(data.title) : list[idx].slug,
        updatedAt: new Date().toISOString(),
      };
      setLocal(STORAGE_KEYS.PROJECTS, list);
      return { success: true, project: list[idx] };
    }
    const fallbackItem = {
      _id: id,
      ...data,
      slug: data.title ? slugify(data.title) : 'project-' + Date.now(),
      updatedAt: new Date().toISOString(),
    };
    list.unshift(fallbackItem);
    setLocal(STORAGE_KEYS.PROJECTS, list);
    return { success: true, project: fallbackItem };
  },

  async deleteProject(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/projects/admin/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const resData = await res.json();
      if (resData?.success) return resData;
    } catch (e) {
      // Offline fallback
    }

    let list = getLocal(STORAGE_KEYS.PROJECTS, FALLBACK_PROJECTS);
    list = list.filter((p) => p._id !== id);
    setLocal(STORAGE_KEYS.PROJECTS, list);
    return { success: true, message: 'Project removed successfully.' };
  },

  // ----------------- Services -----------------
  async getServices() {
    try {
      const res = await fetch(`${API_BASE_URL}/services`);
      const data = await res.json();
      if (data?.success && data?.services?.length > 0) return data;
    } catch (e) {
      // Offline fallback
    }
    const list = getLocal(STORAGE_KEYS.SERVICES, FALLBACK_SERVICES);
    return { success: true, count: list.length, services: list };
  },

  async getServiceBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE_URL}/services/slug/${slug}`);
      const data = await res.json();
      if (data?.success && data?.service) return data;
    } catch (e) {
      // Offline fallback
    }
    const list = getLocal(STORAGE_KEYS.SERVICES, FALLBACK_SERVICES);
    const found = list.find((s) => s.slug === slug) || list[0];
    return { success: true, service: found };
  },

  async getAdminServices() {
    try {
      const res = await fetch(`${API_BASE_URL}/services/admin/all`, { headers: getAuthHeaders() });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback
    }
    const list = getLocal(STORAGE_KEYS.SERVICES, FALLBACK_SERVICES);
    return { success: true, count: list.length, services: list };
  },

  async createService(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/services/admin/create`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData?.success) return resData;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.SERVICES, FALLBACK_SERVICES);
    const newSvc = {
      ...data,
      _id: 's_' + Date.now(),
      slug: slugify(data.title) || 'service-' + Date.now(),
      displayOrder: list.length + 1,
      createdAt: new Date().toISOString(),
    };
    list.push(newSvc);
    setLocal(STORAGE_KEYS.SERVICES, list);
    return { success: true, service: newSvc };
  },

  async updateService(id, data) {
    try {
      const res = await fetch(`${API_BASE_URL}/services/admin/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData?.success) return resData;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.SERVICES, FALLBACK_SERVICES);
    const idx = list.findIndex((s) => s._id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...data };
      setLocal(STORAGE_KEYS.SERVICES, list);
      return { success: true, service: list[idx] };
    }
    return { success: false, message: 'Service not found' };
  },

  async deleteService(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/services/admin/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const resData = await res.json();
      if (resData?.success) return resData;
    } catch (e) {
      // Offline fallback
    }

    let list = getLocal(STORAGE_KEYS.SERVICES, FALLBACK_SERVICES);
    list = list.filter((s) => s._id !== id);
    setLocal(STORAGE_KEYS.SERVICES, list);
    return { success: true, message: 'Service deleted' };
  },

  // ----------------- Calculator -----------------
  async getCalculatorSettings() {
    try {
      const res = await fetch(`${API_BASE_URL}/calculator/settings`);
      const data = await res.json();
      if (data?.success && data?.settings) return data;
    } catch (e) {
      // Offline fallback
    }

    const settings = getLocal(STORAGE_KEYS.CALC_SETTINGS, FALLBACK_CALCULATOR_SETTINGS);
    const additionalServices = getLocal(STORAGE_KEYS.CALC_SERVICES, FALLBACK_CALCULATOR_SERVICES);
    return { success: true, settings, additionalServices };
  },

  async calculateEstimate(payload) {
    try {
      const res = await fetch(`${API_BASE_URL}/calculator/calculate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline calculation fallback
    }

    const settings = getLocal(STORAGE_KEYS.CALC_SETTINGS, FALLBACK_CALCULATOR_SETTINGS);
    const services = getLocal(STORAGE_KEYS.CALC_SERVICES, FALLBACK_CALCULATOR_SERVICES);

    const area = Number(payload.areaSqFt) || 1200;
    const baseRate = Number(settings.baseRatePerSqFt) || 1250;
    
    // Category multiplier
    let multiplier = 1.0;
    const cat = (settings.propertyCategories || []).find((c) => c.id === payload.propertyCategory);
    if (cat?.multiplier) multiplier = cat.multiplier;

    const baseCost = Math.round(area * baseRate * multiplier);

    let addCost = 0;
    const selected = (payload.selectedServiceSlugs || []).map((slug) => {
      const svc = services.find((s) => s.slug === slug);
      const rate = svc?.ratePerSqFt || 200;
      const cost = Math.round(area * rate);
      addCost += cost;
      return {
        name: svc?.name || slug.replace(/-/g, ' ').toUpperCase(),
        ratePerSqFt: rate,
        cost,
      };
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
        currencySymbol: settings.currencySymbol || '₹',
        disclaimer: settings.disclaimerText || 'Indicative estimate based on studio rates.',
      },
    };
  },

  async getAdminCalculatorConfig() {
    try {
      const res = await fetch(`${API_BASE_URL}/calculator/admin/config`, { headers: getAuthHeaders() });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback
    }

    const settings = getLocal(STORAGE_KEYS.CALC_SETTINGS, FALLBACK_CALCULATOR_SETTINGS);
    const services = getLocal(STORAGE_KEYS.CALC_SERVICES, FALLBACK_CALCULATOR_SERVICES);
    return { success: true, settings, services };
  },

  async updateCalculatorSettings(newSettings) {
    try {
      const res = await fetch(`${API_BASE_URL}/calculator/admin/settings`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(newSettings),
      });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback
    }

    const current = getLocal(STORAGE_KEYS.CALC_SETTINGS, FALLBACK_CALCULATOR_SETTINGS);
    const updated = { ...current, ...newSettings };
    setLocal(STORAGE_KEYS.CALC_SETTINGS, updated);
    return { success: true, settings: updated };
  },

  async createCalculatorService(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/calculator/admin/services`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData?.success) return resData;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.CALC_SERVICES, FALLBACK_CALCULATOR_SERVICES);
    const newService = {
      ...data,
      _id: 'cs_' + Date.now(),
      slug: slugify(data.name) || 'calc-svc-' + Date.now(),
      ratePerSqFt: Number(data.ratePerSqFt) || 200,
      isDefaultSelected: false,
    };
    list.push(newService);
    setLocal(STORAGE_KEYS.CALC_SERVICES, list);
    return { success: true, service: newService };
  },

  async updateCalculatorService(id, data) {
    try {
      const res = await fetch(`${API_BASE_URL}/calculator/admin/services/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData?.success) return resData;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.CALC_SERVICES, FALLBACK_CALCULATOR_SERVICES);
    const idx = list.findIndex((s) => s._id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...data };
      setLocal(STORAGE_KEYS.CALC_SERVICES, list);
      return { success: true, service: list[idx] };
    }
    return { success: false, message: 'Calculator service not found' };
  },

  async deleteCalculatorService(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/calculator/admin/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const resData = await res.json();
      if (resData?.success) return resData;
    } catch (e) {
      // Offline fallback
    }

    let list = getLocal(STORAGE_KEYS.CALC_SERVICES, FALLBACK_CALCULATOR_SERVICES);
    list = list.filter((s) => s._id !== id);
    setLocal(STORAGE_KEYS.CALC_SERVICES, list);
    return { success: true, message: 'Calculator service deleted' };
  },

  // ----------------- Enquiries -----------------
  async submitEnquiry(payload) {
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const ref = `AW-${dateStr}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newEnquiry = {
      _id: 'enq_' + Date.now(),
      referenceNumber: ref,
      clientName: payload.name || payload.clientName || 'Studio Inquirer',
      phone: payload.phone || '+91 00000 00000',
      email: payload.email || 'client@example.com',
      city: payload.city || payload.propertyLocation || 'Zirakpur',
      serviceType: payload.serviceType || payload.serviceRequired || 'Full Home Interiors',
      areaSqFt: Number(payload.areaSqFt || payload.propertyAreaSqFt || 1500),
      bhkConfig: payload.bhkConfig || '3BHK',
      scope: payload.scope || ['Custom Woodwork', 'Modular Kitchen'],
      designPackage: payload.designPackage || 'premium',
      estimatedCost: payload.estimatedCost || 1850000,
      status: 'new',
      notes: payload.message || payload.notes || 'Inquiry submitted from studio website.',
      createdAt: new Date().toISOString(),
    };

    // Always persist to local enquiries
    const list = getLocal(STORAGE_KEYS.ENQUIRIES, FALLBACK_ENQUIRIES);
    list.unshift(newEnquiry);
    setLocal(STORAGE_KEYS.ENQUIRIES, list);

    try {
      const res = await fetch(`${API_BASE_URL}/enquiries/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback succeeds with local persistence
    }

    return {
      success: true,
      referenceNumber: ref,
      message: 'Thank you! Your inquiry has been received by Architecture Wonders.',
    };
  },

  async getAdminEnquiries(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/enquiries/admin/all${query ? `?${query}` : ''}`, {
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback
    }

    let list = getLocal(STORAGE_KEYS.ENQUIRIES, FALLBACK_ENQUIRIES);
    if (params.status && params.status !== 'All') {
      list = list.filter((e) => (e.status || '').toLowerCase() === params.status.toLowerCase());
    }
    if (params.search) {
      const s = params.search.toLowerCase();
      list = list.filter(
        (e) =>
          (e.clientName || '').toLowerCase().includes(s) ||
          (e.phone || '').includes(s) ||
          (e.referenceNumber || '').toLowerCase().includes(s)
      );
    }

    return { success: true, count: list.length, enquiries: list };
  },

  async updateEnquiryStatus(id, status, notes) {
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries/admin/${id}/status`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ status, notes }),
      });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.ENQUIRIES, FALLBACK_ENQUIRIES);
    const idx = list.findIndex((e) => e._id === id);
    if (idx !== -1) {
      list[idx].status = status;
      if (notes) list[idx].notes = notes;
      setLocal(STORAGE_KEYS.ENQUIRIES, list);
      return { success: true, enquiry: list[idx] };
    }
    return { success: false, message: 'Enquiry not found' };
  },

  async addEnquiryNote(id, note) {
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries/admin/${id}/notes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ note }),
      });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.ENQUIRIES, FALLBACK_ENQUIRIES);
    const idx = list.findIndex((e) => e._id === id);
    if (idx !== -1) {
      list[idx].notes = (list[idx].notes ? list[idx].notes + '\n' : '') + note;
      setLocal(STORAGE_KEYS.ENQUIRIES, list);
      return { success: true, enquiry: list[idx] };
    }
    return { success: false, message: 'Enquiry not found' };
  },

  async deleteEnquiry(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/enquiries/admin/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback
    }

    let list = getLocal(STORAGE_KEYS.ENQUIRIES, FALLBACK_ENQUIRIES);
    list = list.filter((e) => e._id !== id);
    setLocal(STORAGE_KEYS.ENQUIRIES, list);
    return { success: true, message: 'Enquiry deleted' };
  },

  // ----------------- Testimonials -----------------
  async getTestimonials() {
    try {
      const res = await fetch(`${API_BASE_URL}/testimonials`);
      const data = await res.json();
      if (data?.success && data?.testimonials?.length > 0) return data;
    } catch (e) {
      // Offline fallback
    }
    const list = getLocal(STORAGE_KEYS.TESTIMONIALS, FALLBACK_TESTIMONIALS).filter(
      (t) => t.isPublished !== false
    );
    return { success: true, count: list.length, testimonials: list };
  },

  async getAdminTestimonials() {
    try {
      const res = await fetch(`${API_BASE_URL}/testimonials/admin/all`, { headers: getAuthHeaders() });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback
    }
    const list = getLocal(STORAGE_KEYS.TESTIMONIALS, FALLBACK_TESTIMONIALS);
    return { success: true, count: list.length, testimonials: list };
  },

  async createTestimonial(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/testimonials/admin/create`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData?.success) return resData;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.TESTIMONIALS, FALLBACK_TESTIMONIALS);
    const newTestimonial = { ...data, _id: 't_' + Date.now(), createdAt: new Date().toISOString() };
    list.unshift(newTestimonial);
    setLocal(STORAGE_KEYS.TESTIMONIALS, list);
    return { success: true, testimonial: newTestimonial };
  },

  async updateTestimonial(id, data) {
    try {
      const res = await fetch(`${API_BASE_URL}/testimonials/admin/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData?.success) return resData;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.TESTIMONIALS, FALLBACK_TESTIMONIALS);
    const idx = list.findIndex((t) => t._id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...data };
      setLocal(STORAGE_KEYS.TESTIMONIALS, list);
      return { success: true, testimonial: list[idx] };
    }
    return { success: false, message: 'Testimonial not found' };
  },

  async deleteTestimonial(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/testimonials/admin/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const resData = await res.json();
      if (resData?.success) return resData;
    } catch (e) {
      // Offline fallback
    }

    let list = getLocal(STORAGE_KEYS.TESTIMONIALS, FALLBACK_TESTIMONIALS);
    list = list.filter((t) => t._id !== id);
    setLocal(STORAGE_KEYS.TESTIMONIALS, list);
    return { success: true, message: 'Testimonial deleted' };
  },

  // ----------------- Blog Articles -----------------
  async getBlogArticles(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const res = await fetch(`${API_BASE_URL}/blog${query ? `?${query}` : ''}`);
      const data = await res.json();
      if (data?.success && data?.articles?.length > 0) return data;
    } catch (e) {
      // Offline fallback
    }

    let list = getLocal(STORAGE_KEYS.ARTICLES, FALLBACK_ARTICLES).filter((a) => a.isPublished !== false);
    if (params.limit) list = list.slice(0, Number(params.limit));
    return { success: true, count: list.length, articles: list };
  },

  async getArticleBySlug(slug) {
    try {
      const res = await fetch(`${API_BASE_URL}/blog/slug/${slug}`);
      const data = await res.json();
      if (data?.success && data?.article) return data;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.ARTICLES, FALLBACK_ARTICLES);
    const found = list.find((a) => a.slug === slug) || list[0];
    const related = list.filter((a) => a.slug !== slug).slice(0, 3);
    return { success: true, article: found, relatedArticles: related };
  },

  async getAdminArticles() {
    try {
      const res = await fetch(`${API_BASE_URL}/blog/admin/all`, { headers: getAuthHeaders() });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.ARTICLES, FALLBACK_ARTICLES);
    return { success: true, count: list.length, articles: list };
  },

  async createArticle(data) {
    try {
      const res = await fetch(`${API_BASE_URL}/blog/admin/create`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData?.success) return resData;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.ARTICLES, FALLBACK_ARTICLES);
    const newArticle = {
      ...data,
      _id: 'a_' + Date.now(),
      slug: slugify(data.title) || 'article-' + Date.now(),
      publishedAt: new Date().toISOString(),
    };
    list.unshift(newArticle);
    setLocal(STORAGE_KEYS.ARTICLES, list);
    return { success: true, article: newArticle };
  },

  async updateArticle(id, data) {
    try {
      const res = await fetch(`${API_BASE_URL}/blog/admin/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      if (resData?.success) return resData;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.ARTICLES, FALLBACK_ARTICLES);
    const idx = list.findIndex((a) => a._id === id);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...data, slug: data.title ? slugify(data.title) : list[idx].slug };
      setLocal(STORAGE_KEYS.ARTICLES, list);
      return { success: true, article: list[idx] };
    }
    return { success: false, message: 'Article not found' };
  },

  async deleteArticle(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/blog/admin/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const resData = await res.json();
      if (resData?.success) return resData;
    } catch (e) {
      // Offline fallback
    }

    let list = getLocal(STORAGE_KEYS.ARTICLES, FALLBACK_ARTICLES);
    list = list.filter((a) => a._id !== id);
    setLocal(STORAGE_KEYS.ARTICLES, list);
    return { success: true, message: 'Article deleted' };
  },

  // ----------------- Media Management -----------------
  async getMediaList() {
    try {
      const res = await fetch(`${API_BASE_URL}/media`, { headers: getAuthHeaders() });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback
    }

    const list = getLocal(STORAGE_KEYS.MEDIA, [
      {
        _id: 'm1',
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
        altText: 'The Contemporary Stone Residence',
        format: 'jpg',
        bytes: 254000,
        createdAt: new Date().toISOString(),
      },
      {
        _id: 'm2',
        url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
        altText: 'Minimalist Penthouse Sanctuary',
        format: 'jpg',
        bytes: 198000,
        createdAt: new Date().toISOString(),
      },
    ]);
    return { success: true, media: list };
  },

  async uploadMedia(formData) {
    try {
      const token = localStorage.getItem('aw_admin_token');
      const res = await fetch(`${API_BASE_URL}/media/upload`, {
        method: 'POST',
        headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: formData,
      });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback: convert File to base64 Data URL
    }

    const file = formData.get('image');
    let url = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85';
    if (file && typeof FileReader !== 'undefined') {
      try {
        url = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = () => resolve(url);
          reader.readAsDataURL(file);
        });
      } catch (err) {
        console.warn('FileReader fallback error', err);
      }
    }

    const newMedia = {
      _id: 'm_' + Date.now(),
      url,
      altText: formData.get('altText') || file?.name || 'Studio Asset',
      format: (file?.name || 'jpg').split('.').pop(),
      bytes: file?.size || 150000,
      createdAt: new Date().toISOString(),
    };

    const list = getLocal(STORAGE_KEYS.MEDIA, []);
    list.unshift(newMedia);
    setLocal(STORAGE_KEYS.MEDIA, list);
    return { success: true, media: newMedia };
  },

  async deleteMedia(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/media/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback
    }

    let list = getLocal(STORAGE_KEYS.MEDIA, []);
    list = list.filter((m) => m._id !== id);
    setLocal(STORAGE_KEYS.MEDIA, list);
    return { success: true, message: 'Media deleted' };
  },

  // ----------------- Admin Auth & Dashboard -----------------
  async loginAdmin(credentials) {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();
      if (data?.success && data?.token) return data;
    } catch (e) {
      // Offline fallback
    }

    // Verify studio super admin credentials in offline mode
    if (
      credentials.email === 'admin@architecturewonders.com' &&
      credentials.password === 'StudioAW2026!'
    ) {
      return {
        success: true,
        token: 'aw_session_token_' + Date.now(),
        admin: {
          id: 'admin_master',
          name: 'Architecture Wonders Studio Admin',
          email: 'admin@architecturewonders.com',
          role: 'super_admin',
        },
      };
    }

    return {
      success: false,
      message: 'Invalid administrator credentials. Please check your email or password.',
    };
  },

  async getAdminProfile() {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/me`, { headers: getAuthHeaders() });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback
    }

    return {
      success: true,
      admin: {
        id: 'admin_master',
        name: 'Architecture Wonders Studio Admin',
        email: 'admin@architecturewonders.com',
        role: 'super_admin',
      },
    };
  },

  async getDashboardStats() {
    try {
      const res = await fetch(`${API_BASE_URL}/content/admin/stats`, { headers: getAuthHeaders() });
      const data = await res.json();
      if (data?.success) return data;
    } catch (e) {
      // Offline fallback
    }

    const projects = getLocal(STORAGE_KEYS.PROJECTS, FALLBACK_PROJECTS);
    const services = getLocal(STORAGE_KEYS.SERVICES, FALLBACK_SERVICES);
    const enquiries = getLocal(STORAGE_KEYS.ENQUIRIES, FALLBACK_ENQUIRIES);

    const newEnqCount = enquiries.filter((e) => (e.status || '').toLowerCase() === 'new').length;

    return {
      success: true,
      stats: {
        totalEnquiries: enquiries.length,
        newEnquiries: newEnqCount,
        totalProjects: projects.length,
        totalServices: services.length,
      },
      recentEnquiries: enquiries.slice(0, 5),
    };
  },
};
