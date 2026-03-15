import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LoginPage = () => {
    const { t } = useTranslation();
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user'); // 'user' or 'worker'
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await login(email, password, role);
            if (role === 'worker') {
                navigate('/settings');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-16 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 animate-fadeIn">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-6 text-center">{t('Login')}</h2>

            {/* Role Toggle */}
            <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
                <button
                    onClick={() => setRole('user')}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${role === 'user' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                >
                    {t('User')}
                </button>
                <button
                    onClick={() => setRole('worker')}
                    className={`flex-1 py-3 rounded-xl font-bold transition-all ${role === 'worker' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400'}`}
                >
                    {t('Worker')}
                </button>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-slate-700 font-bold mb-2 uppercase text-xs tracking-widest">{t('Email')}</label>
                    <input
                        type="email"
                        required
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium transition-all"
                        value={email}
                        placeholder="your@email.com"
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-slate-700 font-bold mb-2 uppercase text-xs tracking-widest">{t('Password')}</label>
                    <input
                        type="password"
                        required
                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium transition-all"
                        value={password}
                        placeholder="••••••••"
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg transition-all transform active:scale-95 disabled:bg-emerald-300 uppercase tracking-widest text-sm"
                >
                    {loading ? '...' : t('Login')}
                </button>
            </form>

            <p className="mt-8 text-center text-slate-600 font-bold text-sm">
                {t('DontHaveAccount')} <Link to="/register" className="text-teal-600 font-black hover:underline ml-1">{t('Register')}</Link>
            </p>
        </div>
    );
};

export default LoginPage;
