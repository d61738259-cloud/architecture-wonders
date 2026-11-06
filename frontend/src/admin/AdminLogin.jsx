import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight, AlertCircle, Shield } from 'lucide-react';
import logo from '../assets/logo.png';
import { api } from '../services/api';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter both administrator email and password.');
      return;
    }

    try {
      setLoading(true);
      const res = await api.loginAdmin({ email, password });
      if (res.success && res.token) {
        localStorage.setItem('aw_admin_token', res.token);
        localStorage.setItem('aw_admin_user', JSON.stringify(res.admin));
        navigate('/admin/dashboard');
      } else {
        setError(res.message || 'Invalid administrator credentials.');
      }
    } catch (err) {
      setError('Server connection error. Please verify the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-studio-soft px-4 py-12">
      <div className="max-w-md w-full bg-white border border-studio-border p-8 sm:p-10 shadow-card space-y-8">
        <div className="text-center space-y-4">
          <img
            src={logo}
            alt="Architecture Wonders"
            className="h-12 mx-auto object-contain"
          />
          <div>
            <h1 className="text-xl font-serif font-bold text-studio-charcoal">
              Studio Administrative Portal
            </h1>
            <p className="text-xs text-studio-muted mt-1">
              Authorized personnel only. Protected by cryptographic session verification.
            </p>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1">
              Administrator Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-studio-muted absolute left-3 top-3.5" />
              <input
                type="email"
                required
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 p-3 border border-studio-border text-sm outline-none focus:border-studio-teal"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider font-semibold text-studio-charcoal mb-1">
              Security Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-studio-muted absolute left-3 top-3.5" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 p-3 border border-studio-border text-sm outline-none focus:border-studio-teal"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 inline-flex items-center justify-center space-x-2 py-3.5 bg-studio-charcoal text-white text-xs uppercase tracking-widest font-semibold hover:bg-studio-teal transition-all disabled:opacity-50"
          >
            <Shield className="w-4 h-4" />
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
