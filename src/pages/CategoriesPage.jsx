import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const CategoriesPage = () => {
    const { t } = useTranslation();

    const sections = [
        {
            id: 'Worker',
            title: t('Workers'),
            icon: '👷',
            description: 'Find skilled technicians, plumbers, electricians, and more.',
            color: 'from-orange-400 to-amber-500',
            bg: 'bg-orange-50',
            border: 'border-orange-100',
            text: 'text-orange-900'
        },
        {
            id: 'Doctor',
            title: t('Doctors'),
            icon: '🩺',
            description: 'Connect with specialized medical professionals and consultants.',
            color: 'from-emerald-400 to-teal-500',
            bg: 'bg-emerald-50',
            border: 'border-emerald-100',
            text: 'text-emerald-900'
        },
        {
            id: 'Engineer',
            title: t('Engineers'),
            icon: '📐',
            description: 'Hire expert engineers for construction, design, and technical projects.',
            color: 'from-sky-400 to-blue-500',
            bg: 'bg-sky-50',
            border: 'border-sky-100',
            text: 'text-sky-900'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto py-12 md:py-20 px-4 animate-fadeIn">
            <div className="text-center mb-20">
                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 drop-shadow-sm">
                    {t('Categories')}
                </h1>
                <div className="w-32 h-2 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto rounded-full mb-8"></div>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                    Choose the type of professional you're looking for to explore specialized services tailored to your needs.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {sections.map((section) => (
                    <Link
                        key={section.id}
                        to={`/search?category=${section.id}`}
                        className={`group relative overflow-hidden rounded-[2.5rem] border ${section.border} ${section.bg} p-10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-4 cursor-pointer flex flex-col items-center text-center`}
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
                        
                        <div className={`px-8 py-3 rounded-2xl bg-white shadow-sm border ${section.border} ${section.text} font-black text-lg group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-colors duration-300`}>
                            Browse {section.title}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Additional info section */}
            <div className="mt-24 p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-black mb-4">Can't find what you need?</h3>
                        <p className="text-slate-400 text-lg max-w-xl">
                            We are constantly adding new professional categories to serve you better. Check back soon or contact us for specific requests.
                        </p>
                    </div>
                    <Link to="/contact" className="bg-white text-slate-900 px-10 py-5 rounded-2xl font-black text-xl hover:bg-teal-400 hover:text-white transition-all transform active:scale-95 shadow-xl">
                        Contact Support
                    </Link>
                </div>
                {/* Decorative blobs */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500 rounded-full blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500 rounded-full blur-[120px] opacity-20 -translate-x-1/2 translate-y-1/2"></div>
            </div>
        </div>
    );
};

export default CategoriesPage;
