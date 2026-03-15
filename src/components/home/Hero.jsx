import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="relative py-20 lg:py-32 overflow-hidden bg-slate-50">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-100 rounded-full blur-[120px] opacity-40 -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-100 rounded-full blur-[100px] opacity-30 translate-y-1/2 -translate-x-1/4"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <div className="lg:w-1/2 text-center lg:text-left space-y-10 animate-slideUp">
                        <div className="inline-block px-6 py-2 rounded-full bg-white shadow-sm border border-slate-100 text-teal-600 font-black uppercase tracking-widest text-sm">
                            {t('TrustPriority')}
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 leading-[1.1] tracking-tighter">
                            {t('HeroTitle')}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            {t('HeroSubtitle')}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
                            <Link
                                to="/categories"
                                className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white font-black px-10 py-5 rounded-[2rem] shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 text-xl text-center"
                            >
                                {t('GetStarted')}
                            </Link>
                            <Link
                                to="/about"
                                className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-100 font-black px-10 py-5 rounded-[2rem] shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 text-xl text-center"
                            >
                                {t('LearnMore')}
                            </Link>
                        </div>
                    </div>

                    <div className="lg:w-1/2 relative animate-fadeIn">
                        <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white animate-float">
                            <img
                                src="https://images.unsplash.com/photo-1581578731548-c64695cc6958?q=80&w=2070&auto=format&fit=crop"
                                alt="Professionals"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                            <div className="absolute bottom-8 left-8 right-8">
                                <div className="bg-white/90 backdrop-blur p-6 rounded-3xl shadow-lg border border-white/20">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <div>
                                            <p className="text-slate-900 font-black">{t('VerifiedService')}</p>
                                            <p className="text-slate-500 text-sm font-bold leading-none">{t('TrustedUsers')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white p-4 rounded-3xl shadow-2xl border border-slate-50 hidden md:flex flex-col items-center justify-center animate-float" style={{ animationDelay: '1s' }}>
                            <span className="text-4xl mb-2">⭐</span>
                            <p className="font-black text-slate-900 tracking-tight">4.9/5</p>
                            <p className="text-xs text-slate-400 font-bold uppercase">{t('AverageRating')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
