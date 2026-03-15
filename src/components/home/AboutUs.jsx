import React from 'react';
import { useTranslation } from 'react-i18next';

const AboutUs = () => {
    const { t } = useTranslation();

    return (
        <section className="bg-white rounded-[2rem] shadow-xl overflow-hidden mb-24 border border-slate-100">
            <div className="grid lg:grid-cols-2 gap-0">
                <div className="p-12 md:p-16 flex flex-col justify-center bg-emerald-50">
                    <h2 className="text-4xl font-bold text-slate-900 mb-6">{t('AboutUsTitle')}</h2>
                    <div className="w-20 h-1.5 bg-emerald-500 rounded-full mb-8"></div>
                    <p className="text-lg text-slate-700 leading-relaxed mb-10 font-medium">
                        {t('AboutUsDesc')}
                    </p>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                            <h4 className="text-4xl font-extrabold text-emerald-600 mb-2">500+</h4>
                            <p className="text-slate-600 font-bold">{t('StatsProfessionals')}</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 text-center">
                            <h4 className="text-4xl font-extrabold text-teal-600 mb-2">10k+</h4>
                            <p className="text-slate-600 font-bold">{t('StatsJobs')}</p>
                        </div>
                    </div>
                </div>
                <div className="relative min-h-[400px]">
                    <img
                        src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop"
                        alt="Professional working"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
