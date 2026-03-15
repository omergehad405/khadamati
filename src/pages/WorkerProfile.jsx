import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReviewSection from '../components/profile/ReviewSection';

const WorkerProfile = () => {
    const { id } = useParams();
    const [worker, setWorker] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorker = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/workers/${id}`);
                setWorker(res.data.data.worker);
            } catch (err) {
                setError(err.response?.data?.message || 'Error fetching profile');
            } finally {
                setLoading(false);
            }
        };

        fetchWorker();
    }, [id]);

    const handleReviewAdded = (updatedWorker) => {
        setWorker(updatedWorker);
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <span key={i} className={i < Math.round(rating) ? "text-amber-400" : "text-slate-200"}>★</span>
        ));
    };

    if (loading) return (
        <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600"></div>
        </div>
    );
    if (error) return <div className="text-center text-red-600 text-xl py-20 font-bold">{error}</div>;
    if (!worker) return null;

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden mt-8 border border-slate-100 animate-fadeIn relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-50 rounded-full blur-3xl opacity-50 -mr-20 -mt-20"></div>

            {/* Header Banner */}
            <div className="h-56 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-500 relative z-10 overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
            </div>

            <div className="px-8 md:px-12 pb-12 relative z-20">
                <div className="flex flex-col md:flex-row items-center md:items-end justify-between -mt-24 mb-10">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6 w-full text-center md:text-left">
                        <div className="w-48 h-48 bg-white rounded-full p-2 shadow-2xl relative">
                            <img
                                src={worker.images?.length > 0 ? `http://localhost:5000${worker.images[0]}` : "https://placehold.co/400x300?text=Profile"}
                                alt={worker.name}
                                className="w-full h-full object-cover rounded-full"
                            />
                            <div className="absolute bottom-2 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-sm"></div>
                        </div>
                        <div className="pb-3 w-full">
                            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">{worker.name}</h1>
                            <div className="flex flex-wrap items-center gap-3 mb-3 justify-center md:justify-start">
                                <span className="inline-block bg-emerald-100 text-emerald-800 px-5 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider border border-emerald-200">
                                    {worker.jobType}
                                </span>
                                <div className="flex items-center gap-2 bg-amber-50 px-4 py-1.5 rounded-full border border-amber-100">
                                    <span className="text-lg leading-none">{renderStars(worker.averageRating || 0)}</span>
                                    <span className="text-amber-800 font-bold text-sm">({worker.numOfReviews || 0})</span>
                                </div>
                                <span className="text-slate-600 font-bold flex items-center gap-2 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100">
                                    <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path></svg>
                                    {worker.phone}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 md:mt-0 w-full md:w-auto flex justify-center pb-3 shrink-0">
                        <a
                            href={`https://wa.me/${worker.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-4 px-10 rounded-full shadow-xl transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center gap-3"
                        >
                            <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.284l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.768-5.764-5.768zm3.393 8.221c-.146.411-.749.754-1.041.794-.275.04-.543.085-1.558-.309-1.327-.514-2.182-1.854-2.248-1.942-.067-.088-.53-.705-.53-1.347s.334-.981.453-1.114c.12-.133.26-.166.346-.166s.174.004.248.006c.081.002.19-.03.298.228.109.259.373.91.406.974.033.065.054.14.011.228-.044.089-.065.153-.131.23-.065.078-.137.174-.196.234-.067.067-.138.14-.059.275.08.134.353.582.757.942.521.464 1.011.644 1.144.71.134.066.211.054.29-.037.078-.09.336-.39.426-.523.089-.133.178-.111.298-.067s.767.361.9.426c.133.066.222.099.255.155.033.056.033.321-.113.732zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                            WhatsApp
                        </a>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    <div className="md:col-span-2 space-y-10">
                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-teal-500 rounded-full inline-block"></span>
                                About Me
                            </h2>
                            <p className="text-slate-600 leading-relaxed text-lg font-medium bg-slate-50 p-6 rounded-2xl border border-slate-100">
                                {worker.description || 'No description provided.'}
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <span className="w-2 h-8 bg-emerald-500 rounded-full inline-block"></span>
                                Services Offered
                            </h2>
                            {worker.services && worker.services.length > 0 ? (
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {worker.services.map((svc, i) => (
                                        <li key={i} className="flex items-center gap-3 text-slate-700 font-bold bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex justify-center items-center text-emerald-600 text-sm">
                                                ✓
                                            </div>
                                            {svc}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-slate-500 italic bg-slate-50 p-6 rounded-2xl border border-slate-100 font-medium">No specific services listed.</p>
                            )}
                        </section>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white opacity-50 rounded-full -mr-10 -mt-10 blur-xl"></div>
                            <h3 className="text-xl font-bold text-slate-900 mb-6">Details</h3>
                            <ul className="space-y-6">
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-teal-500 shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-slate-400 mb-1">Location</span>
                                        <span className="text-slate-800 font-bold">{worker.address}, {worker.area}, {worker.city}</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-teal-500 shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-slate-400 mb-1">Phone Number</span>
                                        <span className="text-slate-800 font-bold">{worker.phone}</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-teal-500 shrink-0">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <div>
                                        <span className="block text-sm font-bold text-slate-400 mb-1">Experience</span>
                                        <span className="text-slate-800 font-bold">{worker.experienceYears} Years</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="mt-12">
                    <h3 className="text-3xl font-bold text-slate-900 mb-8 pb-4 border-b border-slate-100 flex items-center gap-3">
                        <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                        Work Gallery
                    </h3>

                    {worker.images?.length > 1 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {worker.images.slice(1).map((img, index) => (
                                <div key={index} className="group relative aspect-[4/3] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100">
                                    <img
                                        src={`http://localhost:5000${img}`}
                                        alt={`Work preview ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-slate-50 py-16 rounded-3xl border-2 border-dashed border-slate-200 text-center">
                            <p className="text-slate-400 text-lg font-medium">No work photos uploaded yet.</p>
                        </div>
                    )}
                </div>

                {/* Reviews Section */}
                <ReviewSection worker={worker} onReviewAdded={handleReviewAdded} />
            </div>
        </div>
    );
};

export default WorkerProfile;
