import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Check, X } from 'lucide-react';
import { api } from '../services/api';

export default function ServicesManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  const [form, setForm] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    coverImage: '',
    benefitsText: '',
    displayOrder: 1,
    isPublished: true,
  });

  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminServices();
      if (res?.services) setServices(res.services);
    } catch (e) {
      console.warn('Failed loading services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const openCreate = () => {
    setEditingService(null);
    setForm({
      title: '',
      shortDescription: '',
      fullDescription: '',
      coverImage: '',
      benefitsText: '',
      displayOrder: services.length + 1,
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const openEdit = (s) => {
    setEditingService(s);
    setForm({
      title: s.title,
      shortDescription: s.shortDescription,
      fullDescription: s.fullDescription,
      coverImage: s.coverImage || '',
      benefitsText: (s.benefits || []).join('\n'),
      displayOrder: s.displayOrder || 1,
      isPublished: Boolean(s.isPublished),
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      benefits: form.benefitsText.split('\n').map((b) => b.trim()).filter(Boolean),
    };

    try {
      let res;
      if (editingService) {
        res = await api.updateService(editingService._id, payload);
      } else {
        res = await api.createService(payload);
      }
      if (res.success) {
        setIsModalOpen(false);
        loadServices();
      }
    } catch (e) {
      alert('Error saving service');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service permanently?')) return;
    try {
      const res = await api.deleteService(id);
      if (res.success) loadServices();
    } catch (e) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif font-bold text-studio-charcoal">
            Services & Disciplines Management
          </h1>
          <p className="text-xs text-studio-muted">
            Configure the 9 core studio architectural offerings and details.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-studio-charcoal text-white text-xs uppercase tracking-wider font-semibold hover:bg-studio-teal transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>

      <div className="bg-white border border-studio-border overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-studio-soft border-b border-studio-border uppercase tracking-wider text-studio-muted font-semibold">
            <tr>
              <th className="p-3.5">Order</th>
              <th className="p-3.5">Service Title</th>
              <th className="p-3.5">Slug</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-studio-border">
            {services.map((svc) => (
              <tr key={svc._id} className="hover:bg-studio-soft/30 transition-colors">
                <td className="p-3.5 font-bold text-studio-muted">{svc.displayOrder}</td>
                <td className="p-3.5 font-semibold text-studio-charcoal">{svc.title}</td>
                <td className="p-3.5 font-mono text-studio-muted">{svc.slug}</td>
                <td className="p-3.5">
                  <span
                    className={`px-2 py-0.5 text-[10px] uppercase font-bold ${
                      svc.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {svc.isPublished ? 'Live' : 'Draft'}
                  </span>
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <button
                    onClick={() => openEdit(svc)}
                    className="p-1.5 border border-studio-border hover:bg-studio-soft"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(svc._id)}
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
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-xl w-full p-6 sm:p-8 border border-studio-border max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-studio-border pb-3">
              <h3 className="text-base font-serif font-bold text-studio-charcoal">
                {editingService ? 'Edit Discipline' : 'Add Discipline'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-studio-muted" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal text-sm"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal text-sm"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Short Description *
                </label>
                <textarea
                  rows="2"
                  required
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Full Architectural Description *
                </label>
                <textarea
                  rows="4"
                  required
                  value={form.fullDescription}
                  onChange={(e) => setForm({ ...form, fullDescription: e.target.value })}
                  className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Key Benefits (one per line)
                </label>
                <textarea
                  rows="3"
                  value={form.benefitsText}
                  onChange={(e) => setForm({ ...form, benefitsText: e.target.value })}
                  className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
                />
              </div>

              <div className="flex items-center space-x-4 pt-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
                    className="accent-studio-teal"
                  />
                  <span className="font-semibold text-studio-charcoal">Published</span>
                </label>
              </div>

              <div className="pt-4 border-t border-studio-border flex justify-end space-x-2">
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
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
