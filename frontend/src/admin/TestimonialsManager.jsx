import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Star, X } from 'lucide-react';
import { api } from '../services/api';

export default function TestimonialsManager() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [form, setForm] = useState({
    clientName: '',
    location: 'Zirakpur',
    projectTitle: 'Residential Interior',
    rating: 5,
    reviewText: '',
    isPublished: true,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminTestimonials();
      if (res?.testimonials) setTestimonials(res.testimonials);
    } catch (e) {
      console.warn('Failed loading testimonials');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreate = () => {
    setEditingItem(null);
    setForm({
      clientName: '',
      location: 'Zirakpur',
      projectTitle: 'Residential Interior',
      rating: 5,
      reviewText: '',
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const openEdit = (t) => {
    setEditingItem(t);
    setForm({
      clientName: t.clientName,
      location: t.location || 'Zirakpur',
      projectTitle: t.projectTitle || 'Residential Interior',
      rating: t.rating || 5,
      reviewText: t.reviewText,
      isPublished: Boolean(t.isPublished),
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      let res;
      if (editingItem) {
        res = await api.updateTestimonial(editingItem._id, form);
      } else {
        res = await api.createTestimonial(form);
      }
      if (res.success) {
        setIsModalOpen(false);
        loadData();
      }
    } catch (e) {
      alert('Error saving testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete testimonial?')) return;
    try {
      const res = await api.deleteTestimonial(id);
      if (res.success) loadData();
    } catch (e) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-studio-charcoal">
            Testimonials Management
          </h1>
          <p className="text-xs text-studio-muted">
            Add genuine customer reviews. Never generate fictional reviews.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-studio-charcoal text-white text-xs uppercase tracking-wider font-semibold hover:bg-studio-teal transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div className="bg-white border border-studio-border overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-studio-soft border-b border-studio-border uppercase tracking-wider text-studio-muted font-semibold">
            <tr>
              <th className="p-3.5">Client Name</th>
              <th className="p-3.5">Project & Location</th>
              <th className="p-3.5">Rating</th>
              <th className="p-3.5">Review Excerpt</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-studio-border">
            {testimonials.map((t) => (
              <tr key={t._id} className="hover:bg-studio-soft/30 transition-colors">
                <td className="p-3.5 font-semibold text-studio-charcoal">{t.clientName}</td>
                <td className="p-3.5 text-studio-muted">
                  {t.projectTitle} · {t.location}
                </td>
                <td className="p-3.5">
                  <div className="flex items-center text-amber-500">
                    {[...Array(t.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </td>
                <td className="p-3.5 text-studio-muted max-w-xs truncate">{t.reviewText}</td>
                <td className="p-3.5">
                  <span
                    className={`px-2 py-0.5 text-[10px] uppercase font-bold ${
                      t.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {t.isPublished ? 'Live' : 'Hidden'}
                  </span>
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <button
                    onClick={() => openEdit(t)}
                    className="p-1.5 border border-studio-border hover:bg-studio-soft"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(t._id)}
                    className="p-1.5 border border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full p-6 border border-studio-border space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-studio-border pb-3">
              <h3 className="text-base font-serif font-bold text-studio-charcoal">
                {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-studio-muted" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Client Name *
                </label>
                <input
                  type="text"
                  required
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
                  />
                </div>
                <div>
                  <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                    Rating (1-5)
                  </label>
                  <select
                    value={form.rating}
                    onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
                    className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Project Title / Type
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3BHK Turnkey Interior"
                  value={form.projectTitle}
                  onChange={(e) => setForm({ ...form, projectTitle: e.target.value })}
                  className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Review Text *
                </label>
                <textarea
                  rows="4"
                  required
                  value={form.reviewText}
                  onChange={(e) => setForm({ ...form, reviewText: e.target.value })}
                  className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="checkbox"
                  checked={form.isPublished}
                  onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                  className="accent-studio-teal"
                />
                <span className="font-semibold text-studio-charcoal">Publish on Website</span>
              </div>

              <div className="pt-3 border-t border-studio-border flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-studio-border uppercase font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-studio-charcoal text-white uppercase font-semibold hover:bg-studio-teal"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
