import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const AboutUs = () => {
    const { t } = useTranslation();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 overflow-hidden">
            {/* Hero Section */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center mb-20"
            >
                <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight">
                    {t('AboutUs')}
                </motion.h1>
                <motion.div variants={itemVariants} className="w-24 h-2 bg-teal-500 mx-auto rounded-full mb-10"></motion.div>
                <motion.p variants={itemVariants} className="text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed">
                    {t('AboutUsDesc')}
                </motion.p>
            </motion.div>

            {/* Vision & Mission */}
            <div className="grid md:grid-cols-2 gap-12 mb-32 items-center">
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8"
                >
                    <h2 className="text-4xl font-black text-slate-900">
                        {t('AboutContentTitle')}
                    </h2>
                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        {t('AboutContent1')}
                    </p>
                    <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        {t('AboutContent2')}
                    </p>
                </motion.div>
                <motion.div 
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative"
                >
                    <div className="aspect-video rounded-[3rem] bg-gradient-to-br from-teal-100 to-emerald-100 border-4 border-white shadow-2xl flex items-center justify-center overflow-hidden">
                        <div className="text-center p-8">
                            <motion.div 
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity }}
                                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                            >
                                <span className="text-4xl">🚀</span>
                            </motion.div>
                            <h3 className="text-2xl font-black text-teal-800">{t('OurVision')}</h3>
                            <p className="text-teal-700 font-medium mt-2">{t('VisionDesc')}</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Target Audience */}
            <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-white mb-32 relative overflow-hidden">
                <div className="relative z-10 grid md:grid-cols-2 gap-16 items-center">
                    <div>
                        <span className="inline-block px-4 py-1 rounded-full bg-teal-500 text-slate-900 font-black text-sm uppercase tracking-widest mb-6">{t('Audience')}</span>
                        <h2 className="text-4xl font-black mb-8 leading-tight">
                            {t('AboutTarget')}
                        </h2>
                        <p className="text-xl text-slate-400 font-medium leading-relaxed mb-10">
                            {t('AboutTargetDesc')}
                        </p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                                <h4 className="text-teal-400 font-black text-2xl mb-2">10k+</h4>
                                <p className="text-slate-400 text-sm">{t('ActiveUsers')}</p>
                            </div>
                            <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                                <h4 className="text-emerald-400 font-black text-2xl mb-2">500+</h4>
                                <p className="text-slate-400 text-sm">{t('StatsProfessionals')}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="p-8 rounded-[2.5rem] bg-white text-slate-900 shadow-xl transform hover:-rotate-2 transition-transform">
                            <p className="text-lg font-bold italic">"{t('AboutContent2')}"</p>
                            <p className="mt-4 font-black">- {t('ar') === 'ar' ? 'أحمد س.، القاهرة' : 'Ahmed S., Cairo'}</p>
                        </div>
                        <div className="p-8 rounded-[2.5rem] bg-teal-500 text-slate-900 shadow-xl transform translate-x-4 md:translate-x-12 hover:rotate-2 transition-transform">
                            <p className="text-lg font-bold italic">"{t('AboutContent1')}"</p>
                            <p className="mt-4 font-black">- {t('ar') === 'ar' ? 'سارة م.، الجيزة' : 'Sarah M., Giza'}</p>
                        </div>
                    </div>
                </div>
                {/* Decorative gradients */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-[150px] opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500 rounded-full blur-[150px] opacity-10"></div>
            </div>

            {/* Video Section */}
            <div className="text-center mb-20">
                <h2 className="text-4xl font-black text-slate-900 mb-8">{t('SeeInAction')}</h2>
                <div className="max-w-4xl mx-auto aspect-video rounded-[3rem] bg-slate-200 shadow-inner flex items-center justify-center border-8 border-white relative overflow-hidden group cursor-pointer">
                    <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1287&auto=format&fit=crop" alt="Video Placeholder" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                    <div className="relative z-10 w-24 h-24 bg-teal-500 text-white rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 fill-current ml-2" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    </div>
                    <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-colors"></div>
                    <p className="absolute bottom-10 left-0 right-0 text-white font-black text-xl drop-shadow-lg">{t('ComingSoon')}</p>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
