import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <section className="relative overflow-hidden rounded-[2rem] shadow-xl mb-24 min-h-[70vh] flex items-center bg-slate-50">
            <div className="absolute inset-0 bg-gradient-to-r gap-0 grid grid-cols-1 md:grid-cols-2">
                <div className="bg-slate-100"></div>
                <div className="bg-emerald-50 hidden md:block"></div>
            </div>

            <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <div className="p-4 md:pr-12">
                    <span className="inline-block py-1.5 px-4 rounded-full bg-emerald-100 text-emerald-800 mb-6 font-bold tracking-wider text-sm uppercase border border-emerald-200 shadow-sm">
                        Smart Service Platform
                    </span>
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-slate-900 tracking-tight leading-[1.1]">
                        {t('HeroTitle')}
                    </h1>
                    <p className="text-xl text-slate-600 mb-10 font-medium leading-relaxed max-w-lg">
                        {t('HeroSubtitle')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link to="/register" className="bg-emerald-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:bg-emerald-700 shadow-lg transform transition hover:-translate-y-1 text-center">
                            {t('GetStarted')}
                        </Link>
                        <Link to="/categories" className="bg-white border-2 border-slate-200 text-slate-800 px-8 py-4 rounded-xl text-lg font-bold hover:border-emerald-600 hover:text-emerald-700 shadow-sm transform transition hover:-translate-y-1 text-center">
                            {t('LearnMore')}
                        </Link>
                    </div>
                </div>
                <div className="hidden md:flex justify-center relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 rounded-full blur-3xl opacity-60"></div>
                    <img
                        src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
                        alt="Professional working"
                        className="relative z-10 w-full max-w-md h-auto rounded-3xl shadow-2xl border-4 border-white object-cover aspect-[4/5]"
                    />
                    <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 z-20 animate-bounce" style={{ animationDuration: '3s' }}>
                        <div className="flex gap-2 text-teal-500 mb-2">
                            ★★★★★
                        </div>
                        <p className="font-bold text-slate-800 text-sm">Top Rated Professionals</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
