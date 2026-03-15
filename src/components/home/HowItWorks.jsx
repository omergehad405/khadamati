import React from 'react';
import { useTranslation } from 'react-i18next';

const HowItWorks = () => {
    const { t } = useTranslation();

    return (
        <section className="py-20 mb-20 bg-slate-50 rounded-3xl">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl font-bold text-slate-900 mb-4">{t('HowItWorksTitle')}</h2>
                    <div className="w-24 h-1.5 bg-teal-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line */}
                    <div className="hidden md:block absolute top-[40%] left-[15%] right-[15%] h-1 bg-gradient-to-r from-emerald-200 to-teal-200 z-0"></div>

                    <div className="relative z-10 text-center">
                        <div className="w-24 h-24 mx-auto bg-white border-4 border-emerald-400 rounded-full flex items-center justify-center text-3xl font-bold text-emerald-600 mb-6 shadow-lg">
                            🔍
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('Step1Title')}</h3>
                        <p className="text-slate-600 max-w-xs mx-auto text-lg font-medium">{t('Step1Desc')}</p>
                    </div>

                    <div className="relative z-10 text-center">
                        <div className="w-24 h-24 mx-auto bg-white border-4 border-teal-400 rounded-full flex items-center justify-center text-3xl font-bold text-teal-600 mb-6 shadow-lg">
                            📋
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('Step2Title')}</h3>
                        <p className="text-slate-600 max-w-xs mx-auto text-lg font-medium">{t('Step2Desc')}</p>
                    </div>

                    <div className="relative z-10 text-center">
                        <div className="w-24 h-24 mx-auto bg-white border-4 border-emerald-500 rounded-full flex items-center justify-center text-3xl font-bold text-emerald-600 mb-6 shadow-lg">
                            🤝
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">{t('Step3Title')}</h3>
                        <p className="text-slate-600 max-w-xs mx-auto text-lg font-medium">{t('Step3Desc')}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
