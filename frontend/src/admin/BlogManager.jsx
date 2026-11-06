import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Eye } from 'lucide-react';
import { api } from '../services/api';

export default function BlogManager() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: 'Architecture Insights',
    summary: '',
    content: '',
    coverImage: '',
    readTime: '4 min read',
    tags: '',
    isPublished: true,
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminArticles();
      if (res?.articles) setArticles(res.articles);
    } catch (e) {
      console.warn('Failed loading articles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreate = () => {
    setEditingArticle(null);
    setForm({
      title: '',
      category: 'Architecture Insights',
      summary: '',
      content: '',
      coverImage: '',
      readTime: '4 min read',
      tags: '',
      isPublished: true,
    });
    setIsModalOpen(true);
  };

  const openEdit = (a) => {
    setEditingArticle(a);
    setForm({
      title: a.title,
      category: a.category || 'Architecture Insights',
      summary: a.summary || '',
      content: a.content || '',
      coverImage: a.coverImage || '',
      readTime: a.readTime || '4 min read',
      tags: (a.tags || []).join(', '),
      isPublished: Boolean(a.isPublished),
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
    };

    try {
      let res;
      if (editingArticle) {
        res = await api.updateArticle(editingArticle._id, payload);
      } else {
        res = await api.createArticle(payload);
      }
      if (res.success) {
        setIsModalOpen(false);
        loadData();
      }
    } catch (e) {
      alert('Error saving article');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete article?')) return;
    try {
      const res = await api.deleteArticle(id);
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
            Editorial Blog CMS
          </h1>
          <p className="text-xs text-studio-muted">
            Publish educational interior design guides and architectural insights.
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-studio-charcoal text-white text-xs uppercase tracking-wider font-semibold hover:bg-studio-teal transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Write Article</span>
        </button>
      </div>

      <div className="bg-white border border-studio-border overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-studio-soft border-b border-studio-border uppercase tracking-wider text-studio-muted font-semibold">
            <tr>
              <th className="p-3.5">Title</th>
              <th className="p-3.5">Category</th>
              <th className="p-3.5">Read Time</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Published Date</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-studio-border">
            {articles.map((a) => (
              <tr key={a._id} className="hover:bg-studio-soft/30 transition-colors">
                <td className="p-3.5 font-semibold text-studio-charcoal max-w-sm truncate">
                  {a.title}
                </td>
                <td className="p-3.5 text-studio-muted">{a.category}</td>
                <td className="p-3.5 text-studio-muted">{a.readTime}</td>
                <td className="p-3.5">
                  <span
                    className={`px-2 py-0.5 text-[10px] uppercase font-bold ${
                      a.isPublished ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {a.isPublished ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="p-3.5 text-studio-muted">
                  {new Date(a.publishedAt || a.createdAt).toLocaleDateString('en-IN')}
                </td>
                <td className="p-3.5 text-right space-x-2">
                  <button
                    onClick={() => openEdit(a)}
                    className="p-1.5 border border-studio-border hover:bg-studio-soft"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(a._id)}
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
          <div className="bg-white max-w-2xl w-full p-6 sm:p-8 border border-studio-border max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-studio-border pb-3">
              <h3 className="text-base font-serif font-bold text-studio-charcoal">
                {editingArticle ? 'Edit Article' : 'Compose New Article'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5 text-studio-muted" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-2.5 border border-studio-border text-sm outline-none focus:border-studio-teal"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
                  />
                </div>
                <div>
                  <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                    Estimated Read Time
                  </label>
                  <input
                    type="text"
                    value={form.readTime}
                    onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                    className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
                  />
                </div>
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
                  className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Summary Excerpt (max 300 chars) *
                </label>
                <textarea
                  rows="2"
                  required
                  value={form.summary}
                  onChange={(e) => setForm({ ...form, summary: e.target.value })}
                  className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Full Article Body *
                </label>
                <textarea
                  rows="8"
                  required
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full p-2.5 border border-studio-border font-mono text-xs outline-none focus:border-studio-teal"
                />
              </div>

              <div>
                <label className="block uppercase font-semibold text-studio-charcoal mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Modular Kitchen, Space Planning, Zirakpur"
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
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
                <span className="font-semibold text-studio-charcoal">Publish immediately</span>
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
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
