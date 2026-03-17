import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { i18n, t } = useTranslation();
    const { isAuthenticated, user, role, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleLanguage = () => {
        i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
        setIsMenuOpen(false);
    };

    const handleLogout = () => {
        logout();
        setIsMenuOpen(false);
        navigate('/');
    };

    const NavLinks = () => (
        <>
            <Link onClick={() => setIsMenuOpen(false)} to="/" className="text-lg font-bold hover:text-teal-400 transition-all hover:-translate-y-0.5 transform">{t('Home')}</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/categories" className="text-lg font-bold hover:text-teal-400 transition-all hover:-translate-y-0.5 transform">{t('Categories')}</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/search" className="text-lg font-bold hover:text-teal-400 transition-all hover:-translate-y-0.5 transform">{t('Find_workers')}</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/about" className="text-lg font-bold hover:text-teal-400 transition-all hover:-translate-y-0.5 transform">{t('AboutUs')}</Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/contact" className="text-lg font-bold hover:text-teal-400 transition-all hover:-translate-y-0.5 transform">{t('ContactUs')}</Link>
        </>
    );

    return (
        <>
            <nav className="bg-slate-900 text-white shadow-2xl sticky top-0 z-50 border-b border-white/5 backdrop-blur-lg bg-opacity-95">
            <div className="container mx-auto px-6 py-5 flex justify-between items-center">
                <Link to="/" className="text-3xl font-black tracking-tighter hover:text-teal-400 transition-all transform active:scale-95 flex items-center gap-2">
                    <span className="bg-gradient-to-br from-teal-400 to-emerald-500 bg-clip-text text-transparent">{t('Khadamati')}</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex gap-8 items-center">
                    <NavLinks />
                    <div className="h-6 w-px bg-white/20 mx-2"></div>

                    {isAuthenticated ? (
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-teal-400">
                                {user?.name?.split(' ')[0] || 'User'}
                            </span>
                            {role === 'worker' && (
                                <Link
                                    to="/settings"
                                    className="bg-teal-500 hover:bg-teal-400 text-slate-900 px-5 py-2.5 rounded-2xl transition font-black shadow-lg"
                                >
                                    {t('Dashboard')}
                                </Link>
                            )}
                            <button
                                onClick={handleLogout}
                                className="bg-red-500/20 hover:bg-red-500 text-red-100 hover:text-white border border-red-500/50 px-5 py-2.5 rounded-2xl transition font-black"
                            >
                                {t('Logout')}
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/login" className="hover:text-teal-400 transition font-black">{t('Login')}</Link>
                            <Link to="/register" className="bg-white text-slate-900 px-6 py-2.5 rounded-2xl transition font-black shadow-lg hover:bg-teal-400 hover:text-white">{t('Register') || 'Join Us'}</Link>
                        </div>
                    )}

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={toggleLanguage}
                        className="w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all font-black text-sm border border-white/10"
                    >
                        {i18n.language === 'en' ? 'AR' : 'EN'}
                    </motion.button>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="lg:hidden flex items-center gap-4">
                    <button
                        onClick={toggleLanguage}
                        className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-xs"
                    >
                        {i18n.language === 'en' ? 'AR' : 'EN'}
                    </button>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-white"
                    >
                        {isMenuOpen ? (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        ) : (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        )}
                    </button>
                </div>
            </div>
        </nav>

        {/* Mobile Sidebar */}
        <AnimatePresence>
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="lg:hidden fixed inset-0 z-[100] flex flex-col pt-24 px-8 gap-6 bg-slate-900 text-white"
                >
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute top-6 right-6 p-2 text-white"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                    <NavLinks />
                    <hr className="border-white/10" />
                    {isAuthenticated ? (
                        <div className="space-y-4">
                            <div className="font-black text-teal-400 text-xl">{t('Hello')}, {user?.name}</div>
                            {role === 'worker' && (
                                <Link to="/settings" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-teal-500 text-slate-900 py-4 rounded-2xl font-black">{t('Dashboard')}</Link>
                            )}
                            <button onClick={handleLogout} className="block w-full text-center bg-red-500/20 text-red-400 py-4 rounded-2xl font-black border border-red-500/20">{t('Logout')}</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap-4">
                            <Link to="/login" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-4 border border-white/20 rounded-2xl font-black">{t('Login')}</Link>
                            <Link to="/register" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-4 bg-teal-500 text-slate-900 rounded-2xl font-black">{t('Register')}</Link>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    </>
);
};

export default Navbar;
