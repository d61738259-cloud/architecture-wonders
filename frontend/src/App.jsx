import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public Layout & Pages
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import DesignProcess from './pages/DesignProcess';
import CalculatorPage from './pages/CalculatorPage';
import TestimonialsPage from './pages/TestimonialsPage';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

// Admin Portal
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import ProjectsManager from './admin/ProjectsManager';
import ServicesManager from './admin/ServicesManager';
import CalculatorManager from './admin/CalculatorManager';
import EnquiriesManager from './admin/EnquiriesManager';
import TestimonialsManager from './admin/TestimonialsManager';
import BlogManager from './admin/BlogManager';
import ContentManager from './admin/ContentManager';
import MediaLibrary from './admin/MediaLibrary';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Studio Website */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/:slug" element={<ProjectDetail />} />
          <Route path="process" element={<DesignProcess />} />
          <Route path="calculator" element={<CalculatorPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogDetail />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Authentication */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Portal */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="enquiries" element={<EnquiriesManager />} />
          <Route path="projects" element={<ProjectsManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="calculator" element={<CalculatorManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="blog" element={<BlogManager />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="content" element={<ContentManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
