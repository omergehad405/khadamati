import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ContactUs = () => {
    const { t } = useTranslation();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
    };

    const contactMethods = [
        {
            icon: '📧',
            title: t('EmailUs'),
            value: 'support@khadamati.com',
            color: 'bg-emerald-50 text-emerald-800 border-emerald-100'
        },
        {
            icon: '📱',
            title: t('CallUs'),
            value: '+20 123 456 7890',
            color: 'bg-teal-50 text-teal-800 border-teal-100'
        },
        {
            icon: '📍',
            title: t('VisitUs'),
            value: 'Nasr City, Cairo, Egypt',
            color: 'bg-sky-50 text-sky-800 border-sky-100'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto py-12 px-4 overflow-hidden">
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="text-center mb-20"
            >
                <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black text-slate-900 mb-6">
                    {t('ContactUs')}
                </motion.h1>
                <motion.div variants={itemVariants} className="w-24 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 mx-auto rounded-full mb-8"></motion.div>
                <motion.p variants={itemVariants} className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
                    {t('ContactSubtitle')}
                </motion.p>
            </motion.div>

            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            >
                {contactMethods.map((method, idx) => (
                    <motion.div 
                        key={idx} 
                        variants={itemVariants}
                        whileHover={{ y: -10 }}
                        className={`p-10 rounded-[3rem] border transition-all hover:shadow-xl flex flex-col items-center text-center ${method.color}`}
                    >
                        <div className="text-6xl mb-6 drop-shadow-sm">{method.icon}</div>
                        <h3 className="text-2xl font-black mb-2">{method.title}</h3>
                        <p className="text-lg font-bold opacity-80">{method.value}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Quick Contact Form Placeholder */}
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden grid md:grid-cols-2"
            >
                <div className="p-12 md:p-20 bg-slate-900 text-white">
                    <h2 className="text-4xl font-black mb-8">{t('ContactInfo')}</h2>
                    <p className="text-slate-400 text-lg mb-12">
                        {t('ContactFormDesc')}
                    </p>
                    <div className="space-y-6">
                        <motion.div whileHover={{ x: 10 }} className="flex items-center gap-4 cursor-default">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl">🕒</div>
                            <div>
                                <h4 className="font-bold">{t('WorkingHours')}</h4>
                                <p className="text-slate-400 text-sm">{t('WorkingHoursDays')}</p>
                            </div>
                        </motion.div>
                        <motion.div whileHover={{ x: 10 }} className="flex items-center gap-4 cursor-default">
                            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-xl">🌐</div>
                            <div>
                                <h4 className="font-bold">{t('FollowUs')}</h4>
                                <p className="text-slate-400 text-sm">@KhadamatiPlatform</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
                <div className="p-12 md:p-20">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-slate-700 font-bold mb-2">{t('Subject')}</label>
                            <input type="text" className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder={t('SubjectPlaceholder')} />
                        </div>
                        <div>
                            <label className="block text-slate-700 font-bold mb-2">{t('Message')}</label>
                            <textarea rows="4" className="w-full px-6 py-4 rounded-2xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder={t('MessagePlaceholder')}></textarea>
                        </div>
                        <motion.button 
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="button" 
                            className="w-full py-5 rounded-2xl bg-teal-600 text-white font-black text-xl shadow-lg hover:bg-teal-700 transition-all transform active:scale-95 uppercase tracking-widest"
                        >
                            {t('SendMessage')}
                        </motion.button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactUs;
