import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { IMAGE_BASE_URL } from '../api/config';

const WorkerCard = ({ worker }) => {
    const { t } = useTranslation();

    return (
        <motion.div 
            whileHover={{ y: -10 }}
            className="bg-white rounded-[2.5rem] shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-slate-100 group"
        >
            <div className="relative h-[240px] w-full overflow-hidden">
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                    src={worker.images && worker.images.length > 0 ? `${IMAGE_BASE_URL}${worker.images[0]}` : 'https://placehold.co/400x300?text=No+Photo'}
                    alt={worker.name}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 animate-fadeIn">
                    <span className="bg-white/90 backdrop-blur-md text-slate-900 text-xs font-black px-4 py-2 rounded-2xl shadow-lg border border-white/20 uppercase tracking-widest">
                        {t(worker.category) || t('Worker')}
                    </span>
                </div>
            </div>

            <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-teal-600 transition-colors uppercase tracking-tight">{worker.name}</h3>
                        <div className="flex items-center gap-2">
                            <div className="text-amber-400 text-sm flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className={i < Math.round(worker.averageRating || 0) ? "text-amber-400" : "text-slate-200"}>★</span>
                                ))}
                            </div>
                            <span className="text-slate-400 text-xs font-black">({worker.numOfReviews || 0})</span>
                        </div>
                    </div>
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border border-emerald-100">
                        {worker.jobType}
                    </span>
                </div>

                <p className="text-slate-500 text-sm mb-6 line-clamp-3 font-medium leading-relaxed italic">"{worker.description || t('VerifiedService')}"</p>

                <div className="mt-auto space-y-3 mb-8 text-sm text-slate-600 font-bold">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>
                        </div>
                        {worker.city}, {worker.area}
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"></path></svg>
                        </div>
                        {worker.experienceYears} {t('YearsExperience')}
                    </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                        to={`/worker/${worker._id}`}
                        className="block w-full text-center bg-slate-900 group-hover:bg-teal-500 text-white group-hover:text-slate-900 font-black py-4 px-6 rounded-2xl transition-all duration-300 shadow-xl shadow-slate-200 hover:shadow-teal-100 uppercase tracking-widest text-sm"
                    >
                        {t('ViewProfile')}
                    </Link>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default WorkerCard;
