# Architecture Wonders — Premium Architecture & Interior Design Studio
### Modern Editorial Architecture · Full-Stack Web Application

Architecture Wonders is a premium digital platform developed for an established architecture and residential interior design studio based in **Zirakpur, Punjab**.

---

## 1. Verified Business Profile

* **Business Name**: Architecture Wonders
* **Category**: Architecture & Residential Interior Design
* **Established**: 2023
* **Verified Track Record**: 50+ completed residential home interior projects
* **Studio Address**: Shop No. 8, First Floor, Star City Business Plaza, VIP Road, Near VCare Hospital, Zirakpur, Punjab – 140603
* **Primary Geographic Focus**: Zirakpur, Chandigarh, Mohali, and surrounding tri-city area
* **Direct Telephone**: [+91 6280 609 005](tel:+916280609005)
* **Direct WhatsApp**: [+91 6280 609 005](https://wa.me/916280609005)
* **Studio Email**: [architecturewonders05@gmail.com](mailto:architecturewonders05@gmail.com)
* **Instagram**: [@architecturewonders05](https://www.instagram.com/architecturewonders05/)
* **Google Maps**: [Directions to Star City Business Plaza, VIP Road](https://www.google.co.in/maps/place/Star+City+Business+Plaza,+Vip+Road+Zirakpur+Distt.+SAS+Nagar(Mohali)/@30.639488,76.8138192,17z/data=!3m1!4b1!4m6!3m5!1s0x390feb8a815f974f:0x50be1e51f848b644!8m2!3d30.639488!4d76.8163941!16s%2Fg%2F11v_26gqqg)

---

## 2. Technology Stack

* **Frontend**:
  * React.js (Vite)
  * Tailwind CSS (Contemporary Neutral Architectural Palette)
  * React Router v6
  * Framer Motion (Staggered hero entrances, scroll reveals, smooth category filters, preloader)
  * Lucide React Icons
* **Backend**:
  * Node.js & Express.js
  * RESTful API architecture
  * Helmet security headers, CORS restrictions, Compression, Morgan logging
  * Express Rate Limiting (Brute-force protection & spam deterrence)
* **Database**:
  * MongoDB Atlas
  * Mongoose ODM with strict server-side validation and indexing
* **Media & Assets**:
  * Cloudinary CDN integration with local fallback support
  * Official business logo preserved and integrated across headers, footers, preloader, and favicon
* **Deployment Targets**:
  * **Frontend**: Netlify (SPA routing configured via `_redirects` and `netlify.toml`)
  * **Backend**: Render (Configured via `render.yaml`)
  * **Database**: MongoDB Atlas

---

## 3. Key Website Features & Architecture

### Public-Facing Architecture
1. **Cinematic Hero**: Staggered typography, image masking reveal, subtle parallax, project enquiry and exploration CTAs, live trust metrics.
2. **Studio Introduction**: Communicates 2023 founding and verified 50+ completed projects.
3. **9 Core Disciplines**:
   * Complete Home Interior Design
   * Residential Architecture
   * Modular Kitchen Design
   * Wardrobes & Storage Solutions
   * Living Room Design
   * Bedroom Interior Design
   * False Ceiling & Lighting
   * Space Planning & 3D Visualisation
   * Renovation & Remodelling
4. **Curated Portfolio & Individual Project Pages**: Category-filtered gallery (Full Home Interiors, Living Rooms, Modular Kitchens, Bedrooms, etc.) with location tags, design concept, high-resolution photo galleries, and inquiry CTAs.
5. **6-Stage Design Process**: Numbered architectural timeline (Consultation, 3D Visualization, Material Curation, Civil Execution, Millwork Fitting, Handover).
6. **Square Feet Cost Calculator**:
   * Multi-step interactive estimator
   * Dynamic property categories (1BHK, 2BHK, 3BHK, 4BHK) and area slider
   * Real-time server-calculated pricing breakdown
   * Generates unique enquiry reference codes (`AW-YYYYMMDD-XXXX`)
   * Instant 1-click WhatsApp inquiry pre-populated with customer estimate
7. **Contact & Consultation**: Dual-tab forms (Project Enquiry vs General Consultation), clickable phone/WhatsApp links, and embedded Google Maps for Star City Business Plaza, VIP Road, Zirakpur.
8. **Editorial Blog CMS**: Search-optimised articles covering space planning, modular kitchen engineering, and lighting design.
9. **Verified Client Testimonials**: Authentic customer impressions with verified tags.

### Separate Protected Admin Portal (`/admin/login` & `/admin/dashboard`)
* Secure single administrator account with bcrypt password hashing and JWT sessions.
* Real-time dashboard KPI metrics pulling actual counts from MongoDB.
* **Project Management**: Create, edit, delete, reorder gallery images, set cover image, toggle live/draft.
* **Enquiry Management**: Pipeline status workflow (New, Contacted, In Progress, Converted, Rejected), inspection of full calculator breakdown, add internal timestamped notes, search & filter.
* **Calculator Configuration**: Live adjustment of base execution rates per sq.ft, add/edit/delete additional services (Modular Kitchen, Wardrobes, False Ceiling, etc.), and edit disclaimer text without code modifications.
* **Services Management**: Update service descriptions, deliverables, and display order.
* **Content & SEO Management**: Live updates to hero copy, studio address, phone, email, WhatsApp, Google Maps, Instagram, GA4 Measurement ID, and Google Search Console tags.
* **Media Library**: Stream photographs to Cloudinary or view local assets, copy direct CDN links, delete media.

---

## 4. Local Development Setup

### Prerequisites
* Node.js v18 or v20+
* npm or pnpm
* MongoDB (Local instance or MongoDB Atlas connection string)

### 1. Clone & Setup Workspace
```bash
cd architecture-wonders
```

### 2. Backend Setup
```bash
cd backend
npm install

# Copy environment variables
cp .env.example .env

# Edit .env with your MongoDB Atlas URI and JWT Secret
# Run initial database seed (creates initial admin, 9 core services, sample projects, calculator rates)
npm run seed

# Run unit tests
npm test

# Start backend server (runs on http://localhost:5000)
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install

# Build for production or start Vite development server
npm run dev
# Public website runs at http://localhost:5173
```

---

## 5. Administrative Credentials

* **Login Route**: `http://localhost:5173/admin/login`
* **Default Admin Email**: `admin@architecturewonders.com`
* **Default Admin Password**: `StudioAW2026!`
*(You can change the password anytime directly inside the admin portal).*

---

## 6. Production Deployment Guide

### A. MongoDB Atlas Database Setup
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. Create a free M0 cluster or dedicated M10+ cluster named `architecture-wonders-cluster`.
3. Under **Database Access**, create a user (e.g. `aw_admin`) with read/write privileges.
4. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) so Render web services can connect.
5. Retrieve your connection string under **Database -> Connect -> Drivers (Node.js)**:
   ```
   mongodb+srv://aw_admin:<password>@cluster0.xxxxx.mongodb.net/architecture_wonders?retryWrites=true&w=majority
   ```

### B. Backend Deployment on Render
1. Push code to your GitHub/GitLab repository.
2. In [Render Dashboard](https://dashboard.render.com/), click **New + -> Web Service**.
3. Connect your repository and configure:
   * **Root Directory**: `backend`
   * **Runtime**: `Node`
   * **Build Command**: `npm install`
   * **Start Command**: `node server.js`
   * **Health Check Path**: `/api/health`
4. Add the following **Environment Variables**:
   * `NODE_ENV`: `production`
   * `PORT`: `10000`
   * `MONGODB_URI`: `<Your MongoDB Atlas connection URI>`
   * `JWT_SECRET`: `<A strong random 32+ character string>`
   * `FRONTEND_URL`: `<Your Netlify site URL, e.g. https://architecture-wonders.netlify.app>`
   * `CLOUDINARY_CLOUD_NAME`: `<Your Cloudinary cloud name>`
   * `CLOUDINARY_API_KEY`: `<Your Cloudinary API key>`
   * `CLOUDINARY_API_SECRET`: `<Your Cloudinary API secret>`
   * `ADMIN_NOTIFICATION_PHONE`: `916280609005`
5. Click **Deploy Web Service**. Once deployed, Render provides your API URL (e.g., `https://architecture-wonders-api.onrender.com`).

### C. Frontend Deployment on Netlify
1. In [Netlify Dashboard](https://app.netlify.com/), click **Add new site -> Import an existing project**.
2. Connect your repository and configure:
   * **Base directory**: `frontend`
   * **Build command**: `npm run build`
   * **Publish directory**: `frontend/dist`
3. Add the following **Environment Variable**:
   * `VITE_API_URL`: `https://architecture-wonders-api.onrender.com/api`
4. Click **Deploy Site**. Netlify will build and publish your application. SPA routing is automatically maintained via `_redirects` and `netlify.toml`.

---

## 7. External Integrations & Configuration Checklist

| Integration | Purpose | Configuration Status |
| :--- | :--- | :--- |
| **Official Logo** | Brand Identity & Preloader | Included in `frontend/src/assets/logo.png` & `public/logo.png` |
| **MongoDB Atlas** | Persistent Data & Inquiries | Supported via `MONGODB_URI` environment variable |
| **Cloudinary** | High-Res Portfolio CDN | Supported via `CLOUDINARY_*` keys with automatic local fallback |
| **WhatsApp Direct** | Instant Client Chat | Connected directly to `+91 6280 609 005` |
| **WhatsApp Cloud API** | Automated Studio Lead Alerts | Configured via `WHATSAPP_API_TOKEN` & `WHATSAPP_PHONE_NUMBER_ID` |
| **Google Maps** | Studio Directions | Embedded pointing to Star City Business Plaza, VIP Road, Zirakpur |
| **Google Analytics 4** | Visitor Event Tracking | Configurable via Admin Portal or `ga4MeasurementId` |
| **Local SEO** | Zirakpur/Chandigarh/Mohali | Implemented via JSON-LD LocalBusiness schema & dynamic `/sitemap.xml` |

---

## 8. License & Ownership
Copyright © 2026 **Architecture Wonders**. All rights reserved.
Developed strictly following Modern Editorial Architecture standards.
