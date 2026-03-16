import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { API_BASE_URL } from '../../api/config';
import { AuthContext } from '../../context/AuthContext';

const ReviewSection = ({ worker, onReviewAdded }) => {
    const { t } = useTranslation();
    const { user, token } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        reviewerName: '',
        reviewerEmail: '',
        rating: 5,
        comment: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
            const res = await axios.post(`${API_BASE_URL}/workers/${worker._id}/reviews`, formData, config);
            setMessage({ type: 'success', text: t('ReviewSuccess') });
            setFormData({ reviewerName: '', reviewerEmail: '', rating: 5, comment: '' });
            if (onReviewAdded) onReviewAdded(res.data.data.worker);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || t('ReviewError') });
        } finally {
            setSubmitting(false);
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <span key={i} className={i < rating ? "text-amber-400" : "text-slate-200"}>★</span>
        ));
    };

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 border-t border-slate-100 pt-16"
        >
            <h3 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
                <span className="w-2.5 h-10 bg-emerald-600 rounded-full shadow-lg shadow-emerald-100"></span>
                {t('RatingsReviews')}
            </h3>

            <div className="grid lg:grid-cols-2 gap-16">
                {/* Review Form */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-50 relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-100 transition-colors"></div>

                    <h4 className="text-xl font-black text-slate-900 mb-8 relative z-10">{t('LeaveReview')}</h4>
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {!user && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">{t('Name')}</label>
                                    <input
                                        type="text"
                                        name="reviewerName"
                                        value={formData.reviewerName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 focus:outline-none transition-all font-bold"
                                        placeholder={t('Name')}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">{t('Email')}</label>
                                    <input
                                        type="email"
                                        name="reviewerEmail"
                                        value={formData.reviewerEmail}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 focus:outline-none transition-all font-bold"
                                        placeholder="your@email.com"
                                    />
                                </div>
                            </div>
                        )}

                        {user && (
                            <motion.div 
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="emerald-glass p-6 rounded-2xl border-2 border-emerald-100 flex items-center gap-4 mb-2"
                            >
                                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xl">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-black text-emerald-900 leading-tight">{t('ar') === 'ar' ? `التقييم بصفتك ${user.name}` : `Reviewing as ${user.name}`}</p>
                                    <p className="text-xs font-bold text-emerald-600/70">{user.email}</p>
                                </div>
                            </motion.div>
                        )}

                        <div>
                            <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">{t('Rating')}</label>
                            <select
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:outline-none transition-all appearance-none font-bold text-slate-700 cursor-pointer"
                            >
                                <option value="5">{t('5Stars')}</option>
                                <option value="4">{t('4Stars')}</option>
                                <option value="3">{t('3Stars')}</option>
                                <option value="2">{t('2Stars')}</option>
                                <option value="1">{t('1Star')}</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">{t('Message')}</label>
                            <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 focus:outline-none transition-all font-bold"
                                placeholder={t('MessagePlaceholder')}
                            ></textarea>
                        </div>

                        <AnimatePresence>
                            {message.text && (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className={`p-5 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-3 ${message.type === 'success'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                    : 'bg-red-50 text-red-700 border border-red-100'
                                    }`}>
                                    <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`}></div>
                                    {message.text}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-emerald-100 transition-all transform active:scale-[0.98] disabled:opacity-50 uppercase tracking-[0.2em] text-sm"
                        >
                            {submitting ? '...' : t('PostReview')}
                        </motion.button>
                    </form>
                </motion.div>

                {/* Reviews List */}
                <motion.div 
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">{t('RecentFeedback')}</h4>
                            <div className="h-1 w-12 bg-emerald-500 rounded-full mt-1"></div>
                        </div>
                        <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-50">
                            <span className="text-3xl font-black text-slate-800 leading-none">{worker.averageRating?.toFixed(1) || '0.0'}</span>
                            <div className="flex flex-col">
                                <div className="text-lg leading-none">{renderStars(Math.round(worker.averageRating || 0))}</div>
                                <span className="text-slate-400 text-[0.65rem] font-black uppercase tracking-widest mt-1">
                                    {worker.numOfReviews || 0} {t('Reviews')}
                                </span>
                            </div>
                        </div>
                    </div>

                    {worker.reviews && worker.reviews.length > 0 ? (
                        <div className="max-h-[600px] overflow-y-auto pr-6 custom-scrollbar space-y-6">
                            <AnimatePresence mode="popLayout">
                                {worker.reviews.slice().reverse().map((review, index) => (
                                    <motion.div 
                                        key={index} 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 font-black text-xl border border-slate-100">
                                                    {review.reviewerName?.charAt(0) || 'G'}
                                                </div>
                                                <div>
                                                    <h5 className="font-black text-slate-800 tracking-tight">{review.reviewerName}</h5>
                                                    <div className="text-xs mt-1">{renderStars(review.rating)}</div>
                                                </div>
                                            </div>
                                            <span className="text-[0.65rem] font-black text-slate-400 bg-slate-50 px-4 py-2 rounded-xl uppercase tracking-widest border border-slate-100">
                                                {new Date(review.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                            </span>
                                        </div>
                                        <p className="text-slate-500 font-bold leading-relaxed italic text-sm border-l-4 border-slate-100 pl-4 py-2">
                                            "{review.comment}"
                                        </p>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-slate-50/50 py-24 rounded-[3rem] border-4 border-dashed border-slate-100 text-center px-10"
                        >
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </div>
                            <h5 className="text-slate-800 font-black uppercase text-sm tracking-widest mb-2">{t('NoReviewsYet')}</h5>
                            <p className="text-slate-400 font-bold text-sm leading-relaxed">
                                {t('BeFirstReview')}
                            </p>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ReviewSection;
