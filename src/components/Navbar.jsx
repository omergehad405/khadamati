import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { i18n, t } = useTranslation();
    const { isAuthenticated, user, role, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="bg-gradient-to-r from-teal-800 to-emerald-700 text-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center transition-all duration-300">
                <Link to="/" className="text-3xl font-extrabold tracking-tight hover:text-emerald-100 transition">
                    {t('Khadamati')}
                </Link>
                <div className="flex gap-6 items-center">
                    <Link to="/" className="text-lg font-medium hover:text-emerald-200 transition-colors hidden md:block">{t('Home')}</Link>
                    <Link to="/search" className="text-lg font-medium hover:text-emerald-200 transition-colors hidden md:block">{t('Find_workers')}</Link>
                    <Link to="/categories" className="text-lg font-medium hover:text-emerald-200 transition-colors hidden md:block">{t('Categories')}</Link>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-3">
                            <span className="font-bold border-r pr-4 border-emerald-500 hidden sm:block">
                                {t('Hello')}, {user?.name?.split(' ')[0] || 'User'}
                            </span>
                            {role === 'worker' && (
                                <Link
                                    to="/settings"
                                    className="bg-emerald-900 hover:bg-emerald-800 text-white px-4 py-2 rounded-xl transition text-sm font-bold shadow"
                                >
                                    {t('Dashboard')}
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="bg-red-500/80 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition text-sm font-bold shadow"
                            >
                                {t('Logout') || 'Logout'}
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login" className="hover:bg-teal-800 px-4 py-2 rounded-xl transition text-sm font-bold">{t('Login')}</Link>
                            <Link to="/register" className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition text-sm font-bold">{t('Register') || 'Register'}</Link>
                        </div>
                    )}
                    <button
                        onClick={toggleLanguage}
                        className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm px-4 py-2 rounded-xl shadow transition-all font-bold"
                    >
                        {i18n.language === 'en' ? 'العربية' : 'English'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
