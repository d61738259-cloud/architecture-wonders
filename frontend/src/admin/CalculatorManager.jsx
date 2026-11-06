import React, { useEffect, useState } from 'react';
import { Calculator, Plus, Trash2, Edit2, Save, Check, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function CalculatorManager() {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [baseRate, setBaseRate] = useState(1250);
  const [disclaimer, setDisclaimer] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });

  // New service form
  const [newService, setNewService] = useState({
    name: '',
    ratePerSqFt: '',
    description: '',
  });

  const loadData = async () => {
    try {
      setLoading(true);
      const res = await api.getAdminCalculatorConfig();
      if (res?.settings) {
        setSettings(res.settings);
        setBaseRate(res.settings.baseRatePerSqFt || 1250);
        setDisclaimer(res.settings.disclaimerText || '');
      }
      if (res?.services) {
        setServices(res.services);
      }
    } catch (e) {
      console.warn('Failed loading calculator config');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setMsg({ text: '', type: '' });
    try {
      const res = await api.updateCalculatorSettings({
        baseRatePerSqFt: Number(baseRate),
        disclaimerText: disclaimer,
      });
      if (res.success) {
        setMsg({ text: 'Base rate and disclaimer successfully updated.', type: 'success' });
        loadData();
      }
    } catch (e) {
      setMsg({ text: 'Error saving calculator settings.', type: 'error' });
    }
  };

  const handleToggleService = async (svc) => {
    try {
      const res = await api.updateCalculatorService(svc._id, {
        isActive: !svc.isActive,
      });
      if (res.success) loadData();
    } catch (e) {
      alert('Failed updating service status');
    }
  };

  const handleUpdateServiceRate = async (svc, newRate) => {
    try {
      const res = await api.updateCalculatorService(svc._id, {
        ratePerSqFt: Number(newRate),
      });
      if (res.success) loadData();
    } catch (e) {
      alert('Failed updating rate');
    }
  };

  const handleCreateService = async (e) => {
    e.preventDefault();
    if (!newService.name || !newService.ratePerSqFt) {
      alert('Please fill service name and per sq ft rate');
      return;
    }
    try {
      const res = await api.createCalculatorService({
        name: newService.name,
        ratePerSqFt: Number(newService.ratePerSqFt),
        description: newService.description,
        isActive: true,
      });
      if (res.success) {
        setNewService({ name: '', ratePerSqFt: '', description: '' });
        loadData();
      }
    } catch (e) {
      alert('Failed creating service');
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm('Remove this service from calculator permanently?')) return;
    try {
      const res = await api.deleteCalculatorService(id);
      if (res.success) loadData();
    } catch (e) {
      alert('Failed deleting service');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-serif font-bold text-studio-charcoal">
          Square Feet Pricing Engine Settings
        </h1>
        <p className="text-xs text-studio-muted mt-1">
          Adjust base shell execution rates and additional service rates. Modifying rates here instantly updates the public cost calculator without altering source code.
        </p>
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

      {/* Global Base Rate Form */}
      <div className="bg-white border border-studio-border p-6 sm:p-8 space-y-6">
        <h2 className="text-base font-serif font-semibold text-studio-charcoal">
          Base Interior Civil & Shell Execution Rate
        </h2>

        <form onSubmit={handleSaveSettings} className="space-y-4 max-w-xl text-xs">
          <div>
            <label className="block uppercase font-semibold text-studio-charcoal mb-1">
              Base Rate per Square Foot (₹) *
            </label>
            <div className="flex items-center space-x-2">
              <span className="text-base font-bold text-studio-charcoal">₹</span>
              <input
                type="number"
                required
                min="100"
                max="20000"
                value={baseRate}
                onChange={(e) => setBaseRate(e.target.value)}
                className="w-48 p-2.5 border border-studio-border text-sm font-semibold outline-none focus:border-studio-teal"
              />
              <span className="text-studio-muted">/ sq.ft</span>
            </div>
            <p className="text-[11px] text-studio-muted mt-1">
              Applied directly in the base calculation: <code className="font-mono">Base Cost = Total Area × Base Rate</code>.
            </p>
          </div>

          <div>
            <label className="block uppercase font-semibold text-studio-charcoal mb-1">
              Legal Disclaimer Copy
            </label>
            <textarea
              rows="3"
              value={disclaimer}
              onChange={(e) => setDisclaimer(e.target.value)}
              className="w-full p-2.5 border border-studio-border text-xs outline-none focus:border-studio-teal"
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center space-x-2 px-6 py-2.5 bg-studio-charcoal text-white uppercase tracking-wider font-semibold hover:bg-studio-teal transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Update Base Pricing</span>
          </button>
        </form>
      </div>

      {/* Additional Services Management */}
      <div className="bg-white border border-studio-border p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-serif font-semibold text-studio-charcoal">
              Additional Services & Fitment Rates
            </h2>
            <p className="text-xs text-studio-muted">
              Add-ons selected by users (Modular Kitchen, Wardrobes, False Ceiling, etc.).
            </p>
          </div>
        </div>

        {/* Existing Services List */}
        <div className="divide-y divide-studio-border border border-studio-border text-xs">
          {services.map((svc) => (
            <div
              key={svc._id}
              className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-studio-soft/30 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-studio-charcoal text-sm">{svc.name}</span>
                  <span
                    className={`px-2 py-0.5 text-[10px] uppercase font-bold ${
                      svc.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {svc.isActive ? 'Active' : 'Disabled'}
                  </span>
                </div>
                {svc.description && (
                  <p className="text-[11px] text-studio-muted">{svc.description}</p>
                )}
              </div>

              <div className="flex items-center space-x-3 shrink-0">
                <div className="flex items-center space-x-1">
                  <span className="font-bold">₹</span>
                  <input
                    type="number"
                    defaultValue={svc.ratePerSqFt}
                    onBlur={(e) => handleUpdateServiceRate(svc, e.target.value)}
                    className="w-20 p-1 border border-studio-border text-right font-semibold text-xs"
                  />
                  <span className="text-studio-muted">/sq.ft</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleService(svc)}
                  className="px-2.5 py-1 border border-studio-border font-semibold uppercase text-[10px] hover:bg-studio-soft"
                >
                  {svc.isActive ? 'Deactivate' : 'Activate'}
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteService(svc._id)}
                  className="p-1 border border-red-200 text-red-600 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Service Form */}
        <form onSubmit={handleCreateService} className="pt-4 border-t border-studio-border space-y-4">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-studio-charcoal">
            Add New Additional Service
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <input
              type="text"
              required
              placeholder="Service Name (e.g. Smart Home Automation)"
              value={newService.name}
              onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              className="p-2.5 border border-studio-border outline-none focus:border-studio-teal"
            />
            <div className="flex items-center space-x-1">
              <span className="font-bold">₹</span>
              <input
                type="number"
                required
                placeholder="Rate / sq.ft (e.g. 150)"
                value={newService.ratePerSqFt}
                onChange={(e) => setNewService({ ...newService, ratePerSqFt: e.target.value })}
                className="w-full p-2.5 border border-studio-border outline-none focus:border-studio-teal"
              />
            </div>
            <input
              type="text"
              placeholder="Short Description"
              value={newService.description}
              onChange={(e) => setNewService({ ...newService, description: e.target.value })}
              className="p-2.5 border border-studio-border outline-none focus:border-studio-teal"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center space-x-2 px-5 py-2.5 bg-studio-charcoal text-white text-xs uppercase tracking-wider font-semibold hover:bg-studio-teal"
          >
            <Plus className="w-4 h-4" />
            <span>Add Service to Calculator</span>
          </button>
        </form>
      </div>
    </div>
  );
}
