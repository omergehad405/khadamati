import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const ReviewSection = ({ worker, onReviewAdded }) => {
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
            const res = await axios.post(`http://localhost:5000/api/workers/${worker._id}/reviews`, formData, config);
            setMessage({ type: 'success', text: 'Review added successfully!' });
            setFormData({ reviewerName: '', reviewerEmail: '', rating: 5, comment: '' });
            if (onReviewAdded) onReviewAdded(res.data.data.worker);
        } catch (err) {
            setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to add review' });
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
        <div className="mt-16 border-t border-slate-100 pt-16 animate-fade-in">
            <h3 className="text-3xl font-black text-slate-900 mb-10 flex items-center gap-4">
                <span className="w-2.5 h-10 bg-emerald-600 rounded-full shadow-lg shadow-emerald-100"></span>
                Ratings & Reviews
            </h3>

            <div className="grid lg:grid-cols-2 gap-16">
                {/* Review Form */}
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl shadow-slate-100 border border-slate-50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-emerald-100 transition-colors"></div>

                    <h4 className="text-xl font-black text-slate-900 mb-8 relative z-10">Leave a Review</h4>
                    <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                        {!user && (
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Your Name</label>
                                    <input
                                        type="text"
                                        name="reviewerName"
                                        value={formData.reviewerName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 focus:outline-none transition-all font-bold"
                                        placeholder="Full Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Email Address</label>
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
                            <div className="emerald-glass p-6 rounded-2xl border-2 border-emerald-100 flex items-center gap-4 mb-2">
                                <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-xl">
                                    {user.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-black text-emerald-900 leading-tight">Reviewing as {user.name}</p>
                                    <p className="text-xs font-bold text-emerald-600/70">{user.email}</p>
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Rating</label>
                            <select
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:outline-none transition-all appearance-none font-bold text-slate-700 cursor-pointer"
                            >
                                <option value="5">5 Stars - Exceptional Service</option>
                                <option value="4">4 Stars - Very Satisfied</option>
                                <option value="3">3 Stars - Good Service</option>
                                <option value="2">2 Stars - Could Be Better</option>
                                <option value="1">1 Star - Unsatisfactory</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-widest">Detailed Comment</label>
                            <textarea
                                name="comment"
                                value={formData.comment}
                                onChange={handleChange}
                                required
                                rows="4"
                                className="w-full px-5 py-4 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 focus:outline-none transition-all font-bold"
                                placeholder="Share your experience working with this professional..."
                            ></textarea>
                        </div>

                        {message.text && (
                            <div className={`p-5 rounded-2xl text-xs font-black uppercase tracking-widest animate-fade-in flex items-center gap-3 ${message.type === 'success'
                                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                    : 'bg-red-50 text-red-700 border border-red-100'
                                }`}>
                                <div className={`w-2 h-2 rounded-full ${message.type === 'success' ? 'bg-emerald-500' : 'bg-red-500 animate-pulse'}`}></div>
                                {message.text}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-5 rounded-[1.5rem] shadow-xl shadow-emerald-100 transition-all transform active:scale-[0.98] disabled:opacity-50 uppercase tracking-[0.2em] text-sm"
                        >
                            {submitting ? 'Processing...' : 'Post Review'}
                        </button>
                    </form>
                </div>

                {/* Reviews List */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="text-xl font-black text-slate-900 uppercase tracking-tight">Recent Feedback</h4>
                            <div className="h-1 w-12 bg-emerald-500 rounded-full mt-1"></div>
                        </div>
                        <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-50">
                            <span className="text-3xl font-black text-slate-800 leading-none">{worker.averageRating?.toFixed(1) || '0.0'}</span>
                            <div className="flex flex-col">
                                <div className="text-lg leading-none">{renderStars(Math.round(worker.averageRating || 0))}</div>
                                <span className="text-slate-400 text-[0.65rem] font-black uppercase tracking-widest mt-1">
                                    {worker.numOfReviews || 0} Professional Reviews
                                </span>
                            </div>
                        </div>
                    </div>

                    {worker.reviews && worker.reviews.length > 0 ? (
                        <div className="max-h-[600px] overflow-y-auto pr-6 custom-scrollbar space-y-6">
                            {worker.reviews.slice().reverse().map((review, index) => (
                                <div key={index} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
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
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-slate-50/50 py-24 rounded-[3rem] border-4 border-dashed border-slate-100 text-center px-10">
                            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                                <svg className="w-10 h-10 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </div>
                            <h5 className="text-slate-800 font-black uppercase text-sm tracking-widest mb-2">No Feedback Yet</h5>
                            <p className="text-slate-400 font-bold text-sm leading-relaxed">
                                Be the first client to rate this professional's service quality and work.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewSection;
