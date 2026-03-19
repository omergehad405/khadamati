import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useEffect } from 'react';

const CategoriesPage = () => {
    const { t } = useTranslation();

    // Scroll to top when the page is mounted
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

    const sections = [
        {
            id: 'Worker',
            title: t('Workers'),
            icon: '👷',
            description: t('WorkersDesc'),
            color: 'from-orange-400 to-amber-500',
            bg: 'bg-orange-50',
            border: 'border-orange-100',
            text: 'text-orange-900'
        },
        {
            id: 'Doctor',
            title: t('Doctors'),
            icon: '🩺',
            description: t('DoctorsDesc'),
            color: 'from-emerald-400 to-teal-500',
            bg: 'bg-emerald-50',
            border: 'border-emerald-100',
            text: 'text-emerald-900'
        },
        {
            id: 'Engineer',
            title: t('Engineers'),
            icon: '📐',
            description: t('EngineersDesc'),
            color: 'from-sky-400 to-blue-500',
            bg: 'bg-sky-50',
            border: 'border-sky-100',
            text: 'text-sky-900'
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-12 md:py-20 px-4">
            <div className="text-center mb-20">
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 drop-shadow-sm">
                    {t('Categories')}
                </h1>
                <div className="w-32 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto rounded-full mb-8"></div>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                    {t('CategoriesPageDesc')}
                </p>
            </div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-10"
            >
                {sections.map((section) => (
                    <motion.div key={section.id} variants={cardVariants}>
                        <Link
                            to={`/search?category=${section.id}`}
                            className={`group relative overflow-hidden rounded-[2.5rem] border ${section.border} ${section.bg} p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 cursor-pointer flex flex-col items-center text-center h-full`}
                        >
                            {/* Decorative background circle */}
                            <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full bg-gradient-to-br ${section.color} opacity-10 group-hover:scale-150 transition-transform duration-700`}></div>
                            
                            <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${section.color} flex items-center justify-center text-5xl mb-8 shadow-lg transform group-hover:rotate-12 transition-transform duration-500`}>
                                {section.icon}
                            </div>
                            
                            <h2 className={`text-3xl font-black mb-4 ${section.text}`}>
                                {section.title}
                            </h2>
                            
                            <p className="text-slate-600 font-medium mb-8 flex-grow">
                                {section.description}
                            </p>
                            
                            <div className={`px-8 py-3 rounded-2xl bg-white shadow-sm border ${section.border} ${section.text} font-black text-lg group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-colors duration-300 w-full`}>
                                {t('Browse')} {section.title}
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </motion.div>

            {/* Additional info section */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="mt-24 p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden"
            >
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-black mb-4">{t('CantFindWhatYouNeed')}</h3>
                        <p className="text-slate-400 text-lg max-w-xl">
                            {t('CantFindWhatYouNeedDesc')}
                        </p>
                    </div>
                    <Link to="/contact" className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-xl hover:bg-teal-400 hover:text-white transition-all transform active:scale-95 shadow-xl">
                        {t('ContactSupport')}
                    </Link>
                </div>
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-[120px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
            </motion.div>
        </div>
    );
};

export default CategoriesPage;
