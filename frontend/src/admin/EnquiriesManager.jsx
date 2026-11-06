import React, { useEffect, useState } from 'react';
import {
  Inbox,
  Search,
  Filter,
  CheckCircle,
  MessageSquare,
  Phone,
  Mail,
  Trash2,
  Calendar,
  X,
  FileText,
  User,
} from 'lucide-react';
import { api } from '../services/api';

const statusOptions = ['All', 'New', 'Contacted', 'In Progress', 'Converted', 'Rejected'];

export default function EnquiriesManager() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [activeEnquiry, setActiveEnquiry] = useState(null);
  const [noteText, setNoteText] = useState('');

  const loadEnquiries = async () => {
    try {
      setLoading(true);
      const params = {};
      if (selectedStatus !== 'All') params.status = selectedStatus;
      if (search) params.search = search;
      const res = await api.getAdminEnquiries(params);
      if (res?.enquiries) setEnquiries(res.enquiries);
    } catch (e) {
      console.warn('Failed loading admin enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [selectedStatus]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadEnquiries();
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await api.updateEnquiryStatus(id, newStatus);
      if (res.success) {
        if (activeEnquiry && activeEnquiry._id === id) {
          setActiveEnquiry({ ...activeEnquiry, status: newStatus });
        }
        loadEnquiries();
      }
    } catch (e) {
      alert('Failed updating enquiry status');
    }
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim() || !activeEnquiry) return;
    try {
      const res = await api.addEnquiryNote(activeEnquiry._id, noteText);
      if (res.success) {
        setActiveEnquiry({ ...activeEnquiry, internalNotes: res.notes });
        setNoteText('');
        loadEnquiries();
      }
    } catch (e) {
      alert('Failed adding note');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this enquiry record permanently?')) return;
    try {
      const res = await api.deleteEnquiry(id);
      if (res.success) {
        setActiveEnquiry(null);
        loadEnquiries();
      }
    } catch (e) {
      alert('Failed deleting enquiry');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-studio-charcoal">
            Client Inquiries & Cost Calculations
          </h1>
          <p className="text-xs text-studio-muted">
            Track, qualify, and convert incoming leads from Zirakpur, Chandigarh, and Mohali.
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search name, phone, ref..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border border-studio-border text-xs outline-none focus:border-studio-teal w-48 sm:w-64"
          />
          <button
            type="submit"
            className="px-3.5 py-2 bg-studio-charcoal text-white text-xs uppercase font-semibold hover:bg-studio-teal transition-all"
          >
            Search
          </button>
        </form>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 border-b border-studio-border pb-3 overflow-x-auto">
        <span className="text-xs uppercase tracking-wider font-semibold text-studio-muted mr-2">
          Status:
        </span>
        {statusOptions.map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-3 py-1.5 text-xs uppercase tracking-wider font-semibold transition-all ${
              selectedStatus === st
                ? 'bg-studio-charcoal text-white'
                : 'text-studio-muted hover:text-studio-charcoal hover:bg-studio-soft'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {/* Enquiries Table */}
      <div className="bg-white border border-studio-border overflow-x-auto">
        {loading ? (
          <div className="p-12 text-center text-xs text-studio-muted">Loading inquiries...</div>
        ) : enquiries.length === 0 ? (
          <div className="p-12 text-center text-xs text-studio-muted">No inquiries found.</div>
        ) : (
          <table className="w-full text-left text-xs">
            <thead className="bg-studio-soft border-b border-studio-border uppercase tracking-wider text-studio-muted font-semibold">
              <tr>
                <th className="p-3.5">Reference</th>
                <th className="p-3.5">Client Details</th>
                <th className="p-3.5">Inquiry Type</th>
                <th className="p-3.5">Property & Area</th>
                <th className="p-3.5">Calculated Estimate</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5">Received</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-studio-border">
              {enquiries.map((enq) => (
                <tr key={enq._id} className="hover:bg-studio-soft/30 transition-colors">
                  <td className="p-3.5 font-mono font-semibold text-studio-charcoal">
                    {enq.referenceNumber}
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-studio-charcoal block">{enq.name}</span>
                    <span className="text-studio-muted block">{enq.phone}</span>
                    <span className="text-studio-muted block text-[11px]">{enq.email}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="uppercase text-[10px] px-2 py-0.5 bg-studio-stone font-semibold">
                      {enq.enquiryType === 'calculator_estimate' ? 'Calculator' : 'Consultation'}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <span className="block font-medium text-studio-charcoal">
                      {enq.propertyType || 'Residential'}
                    </span>
                    <span className="text-studio-muted">
                      {enq.propertyCategory ? `${enq.propertyCategory.toUpperCase()} · ` : ''}
                      {enq.propertyAreaSqFt ? `${enq.propertyAreaSqFt} sq.ft` : ''}
                    </span>
                  </td>
                  <td className="p-3.5 font-semibold text-studio-teal">
                    {enq.calculatorBreakdown?.estimatedGrandTotal
                      ? `₹${enq.calculatorBreakdown.estimatedGrandTotal.toLocaleString('en-IN')}`
                      : '—'}
                  </td>
                  <td className="p-3.5">
                    <select
                      value={enq.status}
                      onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                      className={`text-[11px] font-bold uppercase px-2 py-1 border outline-none ${
                        enq.status === 'New'
                          ? 'border-blue-300 bg-blue-50 text-blue-700'
                          : enq.status === 'Converted'
                          ? 'border-green-300 bg-green-50 text-green-700'
                          : 'border-studio-border bg-white text-studio-charcoal'
                      }`}
                    >
                      {statusOptions
                        .filter((s) => s !== 'All')
                        .map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                    </select>
                  </td>
                  <td className="p-3.5 text-studio-muted">
                    {new Date(enq.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="p-3.5 text-right space-x-2">
                    <button
                      onClick={() => setActiveEnquiry(enq)}
                      className="px-2.5 py-1 border border-studio-border font-semibold uppercase text-[10px] hover:bg-studio-soft"
                    >
                      Inspect
                    </button>
                    <button
                      onClick={() => handleDelete(enq._id)}
                      className="p-1 border border-red-200 text-red-600 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Inspector Drawer / Modal */}
      {activeEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full p-6 sm:p-8 border border-studio-border max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-studio-border pb-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-studio-teal">
                  Enquiry Reference
                </span>
                <h3 className="text-xl font-serif font-bold text-studio-charcoal">
                  {activeEnquiry.referenceNumber}
                </h3>
              </div>
              <button onClick={() => setActiveEnquiry(null)}>
                <X className="w-5 h-5 text-studio-muted" />
              </button>
            </div>

            {/* Client Info Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-studio-soft border border-studio-border text-xs">
              <div>
                <span className="text-studio-muted block">Client Name</span>
                <span className="font-semibold text-studio-charcoal text-sm">{activeEnquiry.name}</span>
              </div>
              <div>
                <span className="text-studio-muted block">Direct Phone</span>
                <a
                  href={`tel:${activeEnquiry.phone}`}
                  className="font-semibold text-studio-teal hover:underline text-sm"
                >
                  {activeEnquiry.phone}
                </a>
              </div>
              <div>
                <span className="text-studio-muted block">Email</span>
                <a
                  href={`mailto:${activeEnquiry.email}`}
                  className="font-semibold text-studio-charcoal hover:underline"
                >
                  {activeEnquiry.email}
                </a>
              </div>
              <div>
                <span className="text-studio-muted block">Received Timestamp</span>
                <span className="text-studio-charcoal font-medium">
                  {new Date(activeEnquiry.createdAt).toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Contextual WhatsApp Follow-up CTA */}
            <div className="flex space-x-3">
              <a
                href={`https://wa.me/${activeEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${activeEnquiry.name}, this is Architecture Wonders regarding your enquiry ref ${activeEnquiry.referenceNumber}. We would love to discuss your interior design requirements.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center space-x-2 py-2.5 bg-studio-teal text-white text-xs uppercase font-semibold hover:bg-studio-tealDark"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Client on WhatsApp</span>
              </a>
              <a
                href={`tel:${activeEnquiry.phone}`}
                className="px-4 py-2.5 border border-studio-border text-studio-charcoal text-xs uppercase font-semibold hover:bg-studio-soft"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>

            {/* Calculator Breakdown Snapshot if any */}
            {activeEnquiry.calculatorBreakdown && (
              <div className="space-y-3 p-4 border border-studio-border bg-white text-xs">
                <h4 className="font-semibold text-studio-charcoal uppercase tracking-wider text-[11px]">
                  Verified Cost Calculator Breakdown
                </h4>
                <div className="space-y-1.5 border-t border-studio-border pt-2">
                  <div className="flex justify-between">
                    <span className="text-studio-muted">Property Area:</span>
                    <span className="font-semibold">{activeEnquiry.propertyAreaSqFt} sq.ft</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-studio-muted">Base Interior Shell:</span>
                    <span className="font-semibold">
                      ₹{activeEnquiry.calculatorBreakdown.baseCost?.toLocaleString('en-IN')}
                    </span>
                  </div>
                  {activeEnquiry.calculatorBreakdown.selectedServices?.map((svc, i) => (
                    <div key={i} className="flex justify-between pl-2 border-l border-studio-teal">
                      <span className="text-studio-muted">{svc.name}:</span>
                      <span className="font-semibold">₹{svc.cost?.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-studio-border text-sm">
                    <span className="font-bold text-studio-charcoal">Grand Total:</span>
                    <span className="font-bold text-studio-teal">
                      ₹{activeEnquiry.calculatorBreakdown.estimatedGrandTotal?.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Message if any */}
            {activeEnquiry.message && (
              <div className="p-4 bg-studio-stone/30 border border-studio-border text-xs space-y-1">
                <span className="font-semibold text-studio-charcoal uppercase text-[10px]">
                  Client Note:
                </span>
                <p className="text-studio-charcoal italic">{activeEnquiry.message}</p>
              </div>
            )}

            {/* Internal Notes Thread */}
            <div className="space-y-3 pt-2 border-t border-studio-border">
              <h4 className="font-semibold text-studio-charcoal uppercase tracking-wider text-xs">
                Internal Architectural Team Notes
              </h4>

              <div className="space-y-2 max-h-40 overflow-y-auto">
                {activeEnquiry.internalNotes && activeEnquiry.internalNotes.length > 0 ? (
                  activeEnquiry.internalNotes.map((note, i) => (
                    <div key={i} className="p-2.5 bg-studio-soft border border-studio-border text-xs space-y-1">
                      <p className="text-studio-charcoal">{note.note}</p>
                      <span className="text-[10px] text-studio-muted block">
                        Added by {note.author} on {new Date(note.createdAt).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-studio-muted">No internal notes yet.</p>
                )}
              </div>

              {/* Add Note Input */}
              <form onSubmit={handleAddNote} className="flex items-center space-x-2 pt-2">
                <input
                  type="text"
                  placeholder="Add note (e.g. Called client, site visit fixed for Saturday 11am)..."
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  className="flex-1 p-2 border border-studio-border text-xs outline-none focus:border-studio-teal"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-studio-charcoal text-white text-xs uppercase font-semibold hover:bg-studio-teal"
                >
                  Save Note
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
