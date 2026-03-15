import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const CTA = () => {
    const { t } = useTranslation();

    return (
        <section className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-16 text-center shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-400 opacity-20 rounded-full -ml-20 -mb-20"></div>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 relative z-10 drop-shadow-sm">{t('CTAHeader')}</h2>
            <p className="text-xl text-emerald-50 mb-10 max-w-2xl mx-auto relative z-10 font-medium">
                {t('CTASub')}
            </p>
            <Link to="/search" className="inline-block bg-white text-emerald-700 px-10 py-5 rounded-xl text-xl font-bold hover:bg-slate-50 shadow-xl transform transition hover:scale-105 active:scale-95 relative z-10">
                {t('CTABtn')}
            </Link>
        </section>
    );
};

export default CTA;
