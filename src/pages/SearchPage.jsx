import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import WorkerCard from '../components/WorkerCard';
import { API_BASE_URL } from '../api/config';

const SearchPage = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();

    const [workers, setWorkers] = useState([]);
    const [jobType, setJobType] = useState(searchParams.get('type') || '');
    const [category, setCategory] = useState(searchParams.get('category') || '');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Dynamic Title based on category
    const getPageTitle = () => {
        if (!category) return t('Find_workers');
        if (category === 'Worker') return t('Workers');
        if (category === 'Doctor') return t('Doctors');
        if (category === 'Engineer') return t('Engineers');
        return t('Find_workers');
    };

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${API_BASE_URL}/workers/search/filter?jobType=${jobType}&location=${location}&category=${category}`);
            setWorkers(res.data.data.workers);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred fetching workers.');
        } finally {
            setLoading(false);
        }
    };

    // Sync state when URL params change (e.g., navigating from Categories page)
    useEffect(() => {
        const urlCategory = searchParams.get('category') || '';
        const urlType = searchParams.get('type') || '';
        setCategory(urlCategory);
        setJobType(urlType);
    }, [searchParams]);

    // Re-run search when category or other core filters change
    useEffect(() => {
        handleSearch();
    }, [category]);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 animate-slideUp">
                    {getPageTitle()}
                </h1>
                <div className="w-20 h-1.5 bg-teal-500 mx-auto rounded-full"></div>
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-lg p-8 mb-12 border border-slate-100"
            >
                <form onSubmit={handleSearch} className="grid md:grid-cols-4 gap-6">
                    <div>
                        <label className="block text-slate-700 font-bold mb-2">{t('Category')}</label>
                        <select
                            className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-0 focus:border-emerald-500 transition bg-slate-50 font-medium appearance-none cursor-pointer"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">{t('All')}</option>
                            <option value="Worker">{t('Workers')}</option>
                            <option value="Doctor">{t('Doctors')}</option>
                            <option value="Engineer">{t('Engineers')}</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-slate-700 font-bold mb-2">{t('SubCategory')}</label>
                        <input
                            type="text"
                            placeholder={t('SearchPlaceholder')}
                            className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-0 focus:border-emerald-500 transition bg-slate-50 font-medium"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-bold mb-2">{t('Location')}</label>
                        <input
                            type="text"
                            placeholder={t('Location') + "..."}
                            className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-0 focus:border-emerald-500 transition bg-slate-50 font-medium"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="flex items-end">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-4 rounded-xl shadow-lg transition-transform transform active:scale-95 disabled:bg-emerald-300"
                            disabled={loading}
                        >
                            {loading ? t('Searching') : t('Search')}
                        </motion.button>
                    </div>
                </form>
            </motion.div>

            {error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-8 border border-red-200 font-bold">{error}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {workers.length > 0 ? (
                            workers.map((worker, index) => (
                                <motion.div 
                                    key={worker._id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    <WorkerCard worker={worker} />
                                </motion.div>
                            ))
                        ) : (
                            !loading && <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="col-span-3 text-center text-slate-500 py-16 text-xl font-medium border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50 mt-4"
                            >
                                {t('NoWorkersFound')}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}

            {loading && (
                <div className="flex justify-center items-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-emerald-600"></div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
