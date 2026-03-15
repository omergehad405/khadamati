import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const categoryStyling = {
    'Plumber': { icon: '🔧', color: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200' },
    'Electrician': { icon: '⚡', color: 'bg-teal-100 text-teal-800 hover:bg-teal-200 border-teal-200' },
    'Carpenter': { icon: '🔨', color: 'bg-slate-200 text-slate-800 hover:bg-slate-300 border-slate-300' },
    'Doctor': { icon: '🩺', color: 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100 border-emerald-200' },
    'Mechanic': { icon: '⚙️', color: 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200 border-cyan-200' },
    'Engineer': { icon: '📐', color: 'bg-teal-50 text-teal-900 hover:bg-teal-100 border-teal-200' },
    'سباك': { icon: '🔧', color: 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200' },
    'نجار': { icon: '🔨', color: 'bg-slate-200 text-slate-800 hover:bg-slate-300 border-slate-300' },
};

const defaultStyle = { icon: '🛠️', color: 'bg-white text-slate-800 hover:bg-slate-50 border-slate-100' };

const CategoriesPage = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await axios.get('https://khadamati-backend-mifb.onrender.com/api/workers/categories');
                setCategories(res.data.data.categories);
            } catch (err) {
                console.error('Error fetching categories:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="max-w-6xl mx-auto py-12 animate-fadeIn">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Service Categories</h2>
                <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mb-6"></div>
                <p className="text-xl text-slate-600 font-medium">Browse professionals by their specialty</p>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories.length > 0 ? categories.map((catName, idx) => {
                        const style = categoryStyling[catName] || defaultStyle;
                        return (
                            <Link
                                to={`/search?type=${catName}`}
                                key={idx}
                                className={`flex flex-col items-center justify-center p-8 rounded-3xl shadow-sm transition-all duration-300 transform hover:-translate-y-2 border cursor-pointer ${style.color}`}
                            >
                                <div className="text-5xl mb-4 drop-shadow-sm">{style.icon}</div>
                                <h3 className="text-xl font-bold font-sans">{catName}</h3>
                            </Link>
                        );
                    }) : (
                        <div className="col-span-full text-center py-20 text-slate-400 font-bold italic">
                            No service categories available yet.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;
