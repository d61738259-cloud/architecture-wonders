import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Compass,
  Calculator,
  Inbox,
  Star,
  FileText,
  Settings,
  Image,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
} from 'lucide-react';
import logo from '../assets/logo.png';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [adminUser, setAdminUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('aw_admin_token');
    const userStr = localStorage.getItem('aw_admin_user');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    if (userStr) {
      try {
        setAdminUser(JSON.parse(userStr));
      } catch (e) {
        // ignore
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('aw_admin_token');
    localStorage.removeItem('aw_admin_user');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Enquiries', path: '/admin/enquiries', icon: Inbox },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Services', path: '/admin/services', icon: Compass },
    { name: 'Calculator Settings', path: '/admin/calculator', icon: Calculator },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Star },
    { name: 'Blog CMS', path: '/admin/blog', icon: FileText },
    { name: 'Media Library', path: '/admin/media', icon: Image },
    { name: 'Content & SEO', path: '/admin/content', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen flex bg-studio-soft text-studio-charcoal">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex lg:flex-col w-64 bg-white border-r border-studio-border">
        {/* Brand */}
        <div className="p-6 border-b border-studio-border flex items-center justify-between">
          <Link to="/" target="_blank" className="flex items-center space-x-2">
            <img src={logo} alt="Architecture Wonders" className="h-8 w-auto object-contain" />
          </Link>
          <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 bg-studio-tealLight text-studio-teal">
            Admin
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center space-x-3 px-3.5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-colors ${
                  isActive(item.path)
                    ? 'bg-studio-charcoal text-white'
                    : 'text-studio-muted hover:text-studio-charcoal hover:bg-studio-soft'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-studio-border space-y-3">
          <div className="text-xs text-studio-muted truncate">
            <p className="font-semibold text-studio-charcoal">{adminUser?.name || 'Administrator'}</p>
            <p className="text-[11px] truncate">{adminUser?.email || 'admin@architecturewonders.com'}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 py-2 border border-studio-border text-xs uppercase tracking-wider font-semibold text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-studio-border px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-studio-charcoal"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="text-xs uppercase tracking-widest font-semibold text-studio-muted hidden sm:inline">
              Management Portal · Architecture Wonders
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              target="_blank"
              className="inline-flex items-center space-x-1.5 text-xs uppercase tracking-wider font-semibold text-studio-teal hover:underline"
            >
              <span>View Public Studio</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </header>

        {/* Mobile Sidebar Modal */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/40" onClick={() => setSidebarOpen(false)}>
            <div
              className="w-64 bg-white h-full p-4 flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="pb-4 border-b border-studio-border flex items-center justify-between">
                  <img src={logo} alt="" className="h-8 w-auto" />
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="py-4 space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center space-x-3 px-3 py-2 text-xs font-semibold uppercase ${
                          isActive(item.path)
                            ? 'bg-studio-charcoal text-white'
                            : 'text-studio-muted hover:text-studio-charcoal'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full py-2.5 border border-studio-border text-xs uppercase text-red-600 font-semibold"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Outlet View */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
