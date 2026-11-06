import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, Check, X, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

const categories = [
  'Full Home Interiors',
  'Living Rooms',
  'Bedrooms',
  'Modular Kitchens',
  'Wardrobes',
  'Residential Architecture',
  'Renovation Projects',
];

export default function ProjectsManager() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [modalError, setModalError] = useState('');
  const [saving, setSaving] = useState(false);

  // Form State
  const [form, setForm] = useState({
    title: '',
    category: 'Full Home Interiors',
    location: 'Zirakpur',
    yearCompleted: 2024,
    areaSqFt: 1500,
    coverImage: '',
    overview: '',
    designConcept: '',
    description: '',
    galleryUrls: '',
    isFeatured: false,
    isPublished: true,
  });

  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminProjects();
      if (res?.projects) setProjects(res.projects);
    } catch (e) {
      console.warn('Failed loading admin projects');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openCreateModal = () => {
    setEditingProject(null);
    setModalError('');
    setForm({
      title: '',
      category: 'Full Home Interiors',
      location: 'Zirakpur',
      yearCompleted: 2024,
      areaSqFt: 1500,
      coverImage: '',
      overview: '',
      designConcept: '',
      description: '',
      galleryUrls: '',
      isFeatured: false,
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (p) => {
    setEditingProject(p);
    setModalError('');
    setForm({
      title: p.title || '',
      category: p.category || 'Full Home Interiors',
      location: p.location || 'Zirakpur',
      yearCompleted: p.yearCompleted || 2024,
      areaSqFt: p.areaSqFt || 1500,
      coverImage: p.coverImage || '',
      overview: p.overview || '',
      designConcept: p.designConcept || '',
      description: p.description || '',
      galleryUrls: (p.gallery || []).map((g) => (typeof g === 'string' ? g : g?.url || '')).filter(Boolean).join('\n'),
      isFeatured: Boolean(p.isFeatured),
      isPublished: Boolean(p.isPublished),
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    if (e && e.preventDefault) e.preventDefault();
    setModalError('');

    if (!form.title || !form.title.trim()) {
      setModalError('Please enter a Project Title.');
      return;
    }

    setSaving(true);

    try {
      const rawGallery = typeof form.galleryUrls === 'string' ? form.galleryUrls : '';
      const galleryArray = rawGallery
        .split('\n')
        .map((url) => url.trim())
        .filter(Boolean)
        .map((url, i) => ({ url, caption: `View ${i + 1}`, order: i }));

      const titleTrimmed = form.title.trim();
      const locationTrimmed = form.location?.trim() || 'Zirakpur';
      const coverImageClean = form.coverImage?.trim() || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85';
      const overviewClean = form.overview?.trim() || `${titleTrimmed} - Premium interior and architectural project in ${locationTrimmed}.`;
      const descriptionClean = form.description?.trim() || overviewClean;

      const payload = {
        ...form,
        title: titleTrimmed,
        location: locationTrimmed,
        coverImage: coverImageClean,
        overview: overviewClean,
        description: descriptionClean,
        gallery: galleryArray,
      };

      let res;
      if (editingProject && editingProject._id) {
        res = await api.updateProject(editingProject._id, payload);
      } else {
        res = await api.createProject(payload);
      }

      if (res && res.success) {
        setMsg({ text: 'Project successfully saved.', type: 'success' });
        setIsModalOpen(false);
        await loadProjects();
      } else {
        setModalError(res?.message || 'Error saving project. Please try again.');
      }
    } catch (err) {
      setModalError('Failed to save: ' + (err.message || 'Unknown network error.'));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project permanently?')) return;
    try {
      const res = await api.deleteProject(id);
      if (res.success) {
        loadProjects();
      }
    } catch (e) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-studio-charcoal">
            Portfolio Management
          </h1>
          <p className="text-xs text-studio-muted">
            Manage your verified architectural projects across Zirakpur, Chandigarh, and Mohali.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-studio-charcoal text-white text-xs uppercase tracking-wider font-semibold hover:bg-studio-teal transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      {msg.text && (
        <div
          className={`p-3 text-xs flex items-center space-x-2 ${
            msg.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'
          }`}
        >
          <span>{msg.text}</span>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-white border border-studio-border overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-studio-soft border-b border-studio-border text-studio-muted uppercase tracking-wider font-semibold">
            <tr>
              <th className="p-3.5">Image</th>
              <th className="p-3.5">Project Title</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Location</th>
              <th className="p-3.5">Area</th>
              <th className="p-3.5">Featured</th>
              <th className="p-3.5">Published</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-studio-border">
            {projects.map((p) => (
              <tr key={p._id} className="hover:bg-studio-soft/30 transition-colors">
                <td className="p-3.5">
                  <img
                    src={p.coverImage}
                    alt=""
                    className="w-14 h-10 object-cover border border-studio-border"
                  />
                </td>
                <td className="p-3.5 font-semibold text-studio-charcoal">{p.title}</td>
                <td className="p-3.5 text-studio-muted">{p.category}</td>
                <td className="p-3.5 text-studio-muted">{p.location}</td>
                <td className="p-3.5 text-studio-muted">{p.areaSqFt} sq.ft</td>
                <td className="p-3.5">
                  {p.isFeatured ? (
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold uppercase">
                      Featured
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td className="p-3.5">
                  {p.isPublished ? (
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[10px] font-bold uppercase">
                      Live
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase">
                      Draft
                    </span>
                  )}
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <button
                    onClick={() => openEditModal(p)}
                    className="p-1.5 border border-studio-border hover:bg-studio-soft"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-studio-charcoal" />
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="p-1.5 border border-red-200 text-red-600 hover:bg-red-50"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit / Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full p-6 sm:p-8 border border-studio-border max-h-[90vh] overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-studio-border pb-4">
              <h3 className="text-lg font-serif font-bold text-studio-charcoal">
                {editingProject ? 'Edit Project' : 'Add New Residential Project'}
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-studio-muted" />
              </button>
            </div>

            {modalError && (
              <div className="p-3 bg-red-50 border border-red-300 text-red-700 text-xs rounded flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{modalError}</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. The Contemporary Stone Residence"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-2.5 border border-studio-border text-sm outline-none focus:border-studio-teal"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 border border-studio-border text-sm outline-none focus:border-studio-teal"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                    Verified Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. VIP Road, Zirakpur"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full p-2.5 border border-studio-border text-sm outline-none focus:border-studio-teal"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                    Area (Sq. Ft.)
                  </label>
                  <input
                    type="number"
                    value={form.areaSqFt}
                    onChange={(e) => setForm({ ...form, areaSqFt: Number(e.target.value) })}
                    className="w-full p-2.5 border border-studio-border text-sm outline-none focus:border-studio-teal"
                  />
                </div>

                <div>
                  <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                    Year Completed
                  </label>
                  <input
                    type="number"
                    value={form.yearCompleted}
                    onChange={(e) => setForm({ ...form, yearCompleted: Number(e.target.value) })}
                    className="w-full p-2.5 border border-studio-border text-sm outline-none focus:border-studio-teal"
                  />
                </div>
              </div>

              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://... or image link"
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  className="w-full p-2.5 border border-studio-border text-sm outline-none focus:border-studio-teal"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Overview Summary
                </label>
                <textarea
                  rows="2"
                  placeholder="Brief summary of the architecture and interior design..."
                  value={form.overview}
                  onChange={(e) => setForm({ ...form, overview: e.target.value })}
                  className="w-full p-2.5 border border-studio-border text-sm outline-none focus:border-studio-teal"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Design Concept
                </label>
                <input
                  type="text"
                  placeholder="e.g. Modern Editorial Architecture with limestone and warm timbers"
                  value={form.designConcept}
                  onChange={(e) => setForm({ ...form, designConcept: e.target.value })}
                  className="w-full p-2.5 border border-studio-border text-sm outline-none focus:border-studio-teal"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Detailed Description
                </label>
                <textarea
                  rows="3"
                  placeholder="Full architectural description..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-2.5 border border-studio-border text-sm outline-none focus:border-studio-teal"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Gallery Image URLs (one per line)
                </label>
                <textarea
                  rows="3"
                  placeholder="https://...&#10;https://..."
                  value={form.galleryUrls}
                  onChange={(e) => setForm({ ...form, galleryUrls: e.target.value })}
                  className="w-full p-2.5 border border-studio-border text-sm font-mono outline-none focus:border-studio-teal"
                />
              </div>

              <div className="flex items-center space-x-6 pt-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    className="accent-studio-teal"
                  />
                  <span className="font-semibold text-studio-charcoal">Featured on Homepage</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                    className="accent-studio-teal"
                  />
                  <span className="font-semibold text-studio-charcoal">Published (Live)</span>
                </label>
              </div>

              {modalError && (
                <div className="p-3 bg-red-50 border border-red-300 text-red-700 text-xs rounded flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{modalError}</span>
                </div>
              )}

              <div className="pt-4 border-t border-studio-border flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 border border-studio-border text-studio-charcoal font-semibold uppercase text-xs hover:bg-studio-soft"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6 py-2.5 bg-studio-charcoal text-white font-semibold uppercase text-xs hover:bg-studio-teal transition-all disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
