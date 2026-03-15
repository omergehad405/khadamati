import React from 'react';
import { useTranslation } from 'react-i18next';

const Features = () => {
    const { t } = useTranslation();

    return (
        <section className="py-16 mb-20">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">{t('FeaturesTitle')}</h2>
                    <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white p-10 rounded-2xl border-2 border-transparent hover:border-emerald-100 shadow-md hover:shadow-xl transition-all duration-300">
                        <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('Feature1Title')}</h3>
                        <p className="text-slate-600 leading-relaxed font-medium">{t('Feature1Desc')}</p>
                    </div>
                    {/* Feature 2 */}
                    <div className="bg-white p-10 rounded-2xl border-2 border-transparent hover:border-teal-100 shadow-md hover:shadow-xl transition-all duration-300">
                        <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6 text-teal-600">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('Feature2Title')}</h3>
                        <p className="text-slate-600 leading-relaxed font-medium">{t('Feature2Desc')}</p>
                    </div>
                    {/* Feature 3 */}
                    <div className="bg-white p-10 rounded-2xl border-2 border-transparent hover:border-emerald-100 shadow-md hover:shadow-xl transition-all duration-300">
                        <div className="w-16 h-16 bg-emerald-100 rounded-xl flex items-center justify-center mb-6 text-emerald-600">
                            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976-2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('Feature3Title')}</h3>
                        <p className="text-slate-600 leading-relaxed font-medium">{t('Feature3Desc')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
