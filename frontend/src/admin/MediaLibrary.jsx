import React, { useEffect, useState } from 'react';
import { Upload, Copy, Check, Trash2, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function MediaLibrary() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [altText, setAltText] = useState('');
  const [tags, setTags] = useState('');

  const loadMedia = async () => {
    try {
      setLoading(true);
      const res = await api.getMediaList();
      if (res?.media) setMedia(res.media);
    } catch (e) {
      console.warn('Failed loading media');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('altText', altText);
    formData.append('tags', tags);

    try {
      setUploading(true);
      const res = await api.uploadMedia(formData);
      if (res.success) {
        setAltText('');
        setTags('');
        loadMedia();
      } else {
        alert(res.message || 'Upload failed');
      }
    } catch (err) {
      alert('Upload error');
    } finally {
      setUploading(false);
    }
  };

  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this image permanently?')) return;
    try {
      const res = await api.deleteMedia(id);
      if (res.success) loadMedia();
    } catch (e) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-studio-charcoal">
          Studio Media & Asset Library
        </h1>
        <p className="text-xs text-studio-muted mt-1">
          Upload and manage high-resolution architectural photography. Images are processed via Cloudinary CDN or stored locally.
        </p>
      </div>

      {/* Upload Zone */}
      <div className="bg-white border border-studio-border p-6 sm:p-8 space-y-4">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-studio-charcoal">
          Upload Image to Cloudinary CDN
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <input
            type="text"
            placeholder="Descriptive Alt Text (e.g. Living room in Zirakpur)"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="p-2.5 border border-studio-border outline-none focus:border-studio-teal"
          />
          <input
            type="text"
            placeholder="Tags (e.g. living, wood, zirakpur)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="p-2.5 border border-studio-border outline-none focus:border-studio-teal"
          />
        </div>

        <div className="pt-2">
          <label className="inline-flex items-center space-x-2 px-6 py-3 bg-studio-charcoal text-white text-xs uppercase tracking-wider font-semibold hover:bg-studio-teal cursor-pointer transition-all">
            <Upload className="w-4 h-4" />
            <span>{uploading ? 'Processing Image...' : 'Select Photograph to Upload'}</span>
            <input
              type="file"
              accept="image/*"
              disabled={uploading}
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Grid of Media */}
      <div className="bg-white border border-studio-border p-6 sm:p-8 space-y-4">
        <h2 className="text-sm uppercase tracking-wider font-semibold text-studio-charcoal">
          Uploaded Media Gallery ({media.length})
        </h2>

        {loading ? (
          <div className="py-12 text-center text-xs text-studio-muted">Loading assets...</div>
        ) : media.length === 0 ? (
          <div className="py-12 text-center text-xs text-studio-muted">
            No media uploaded yet. Select an image above to start.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {media.map((item) => (
              <div
                key={item._id}
                className="border border-studio-border group relative overflow-hidden bg-studio-soft"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.secureUrl || item.url}
                    alt={item.altText || item.originalFilename}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                <div className="p-2.5 text-[11px] space-y-1 bg-white">
                  <p className="truncate font-semibold text-studio-charcoal">
                    {item.originalFilename}
                  </p>
                  <p className="text-studio-muted text-[10px]">
                    {item.format?.toUpperCase()} · {Math.round(item.bytes / 1024)} KB
                  </p>

                  <div className="flex items-center justify-between pt-1 border-t border-studio-border">
                    <button
                      type="button"
                      onClick={() => handleCopyUrl(item.secureUrl || item.url, item._id)}
                      className="inline-flex items-center space-x-1 text-studio-teal hover:underline text-[10px] font-semibold"
                    >
                      {copiedId === item._id ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
