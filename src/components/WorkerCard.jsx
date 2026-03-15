import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const WorkerCard = ({ worker }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col h-full border border-slate-100">
            <div className="relative h-[280px] w-full overflow-hidden">
                <img
                    src={worker.images && worker.images.length > 0 ? `https://khadamati-backend-mifb.onrender.com${worker.images[0]}` : 'https://placehold.co/400x300?text=No+Photo'}
                    alt={worker.name}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900">{worker.name}</h3>
                        <div className="flex items-center gap-1.5 mt-1">
                            <div className="text-amber-400 text-sm">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < Math.round(worker.averageRating || 0) ? "text-amber-400" : "text-slate-200"}>★</span>
                                ))}
                            </div>
                            <span className="text-slate-400 text-xs font-bold">({worker.numOfReviews || 0})</span>
                        </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {worker.jobType}
                    </span>
                </div>

                <p className="text-slate-600 text-sm mb-4 line-clamp-2 font-medium">{worker.description}</p>

                <div className="mt-auto space-y-2 mb-6 text-sm text-slate-700 font-medium">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {worker.city}, {worker.area}
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        {worker.experienceYears} Years Experience
                    </div>
                </div>

                <Link
                    to={`/worker/${worker._id}`}
                    className="block w-full text-center bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white font-bold py-3 px-4 rounded-xl transition-colors duration-300 border border-emerald-100 hover:border-emerald-600"
                >
                    View Profile
                </Link>
            </div>
        </div>
    );
};

export default WorkerCard;
