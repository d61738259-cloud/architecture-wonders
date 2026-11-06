import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Inbox,
  FolderKanban,
  FileText,
  Star,
  CheckCircle,
  TrendingUp,
  Clock,
  ArrowRight,
  Calculator,
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await api.getDashboardStats();
        if (res?.stats) {
          setStats(res.stats);
          setRecentEnquiries(res.recentEnquiries || []);
        }
      } catch (e) {
        console.warn('Failed loading admin dashboard stats');
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return <div className="text-sm text-studio-muted py-12">Loading studio statistics...</div>;
  }

  const statCards = [
    {
      title: 'Total Enquiries',
      value: stats?.totalEnquiries ?? 0,
      sub: `${stats?.newEnquiries ?? 0} New pending action`,
      icon: Inbox,
      color: 'text-studio-teal',
      link: '/admin/enquiries',
    },
    {
      title: 'Active Projects',
      value: stats?.totalProjects ?? 0,
      sub: `${stats?.publishedProjects ?? 0} Published on portfolio`,
      icon: FolderKanban,
      color: 'text-studio-charcoal',
      link: '/admin/projects',
    },
    {
      title: 'Converted Clients',
      value: stats?.convertedEnquiries ?? 0,
      sub: 'Successful commissions',
      icon: CheckCircle,
      color: 'text-green-600',
      link: '/admin/enquiries',
    },
    {
      title: 'Published Testimonials',
      value: stats?.publishedTestimonials ?? 0,
      sub: 'Verified client reviews',
      icon: Star,
      color: 'text-amber-500',
      link: '/admin/testimonials',
    },
    {
      title: 'Editorial Articles',
      value: stats?.totalBlogArticles ?? 0,
      sub: 'Published blog posts',
      icon: FileText,
      color: 'text-studio-charcoal',
      link: '/admin/blog',
    },
    {
      title: 'Core Disciplines',
      value: stats?.totalServices ?? 0,
      sub: 'Active service pages',
      icon: Calculator,
      color: 'text-studio-teal',
      link: '/admin/services',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-studio-charcoal">
          Studio Overview & Operations
        </h1>
        <p className="text-xs text-studio-muted mt-1">
          Real-time metrics synchronized with your live MongoDB database.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <Link
              key={card.title}
              to={card.link}
              className="p-6 bg-white border border-studio-border hover:border-studio-charcoal/50 transition-all flex flex-col justify-between space-y-4 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-semibold text-studio-muted">
                  {card.title}
                </span>
                <Icon className={`w-5 h-5 ${card.color}`} />
              </div>

              <div>
                <span className="text-3xl font-serif font-bold text-studio-charcoal block">
                  {card.value}
                </span>
                <span className="text-xs text-studio-muted mt-1 block">{card.sub}</span>
              </div>

              <div className="pt-2 border-t border-studio-border/60 flex items-center justify-between text-[11px] uppercase tracking-wider font-semibold text-studio-charcoal group-hover:text-studio-teal">
                <span>Manage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Enquiries Feed */}
      <div className="bg-white border border-studio-border p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-serif font-semibold text-studio-charcoal">
              Recent Inquiries & Cost Calculations
            </h2>
            <p className="text-xs text-studio-muted">
              Latest client submissions requiring follow-up.
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs uppercase tracking-wider font-semibold text-studio-teal hover:underline"
          >
            View All ({stats?.totalEnquiries ?? 0})
          </Link>
        </div>

        {recentEnquiries.length === 0 ? (
          <p className="text-xs text-studio-muted py-4">No recent inquiries recorded.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-studio-soft/80 text-studio-muted uppercase tracking-wider border-b border-studio-border">
                <tr>
                  <th className="p-3">Reference</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Type</th>
                  <th className="p-3">Est. Total</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-studio-border">
                {recentEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-studio-soft/40 transition-colors">
                    <td className="p-3 font-mono font-semibold text-studio-charcoal">
                      {enq.referenceNumber}
                    </td>
                    <td className="p-3">
                      <span className="font-semibold text-studio-charcoal block">{enq.name}</span>
                      <span className="text-studio-muted">{enq.phone}</span>
                    </td>
                    <td className="p-3">
                      <span className="uppercase text-[10px] px-2 py-0.5 bg-studio-stone font-semibold">
                        {enq.enquiryType === 'calculator_estimate' ? 'Cost Calculator' : 'General'}
                      </span>
                    </td>
                    <td className="p-3 font-semibold text-studio-teal">
                      {enq.calculatorBreakdown?.estimatedGrandTotal
                        ? `₹${enq.calculatorBreakdown.estimatedGrandTotal.toLocaleString('en-IN')}`
                        : '—'}
                    </td>
                    <td className="p-3">
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 ${
                          enq.status === 'New'
                            ? 'bg-blue-100 text-blue-700'
                            : enq.status === 'Converted'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-studio-stone text-studio-charcoal'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="p-3 text-studio-muted">
                      {new Date(enq.createdAt).toLocaleDateString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
