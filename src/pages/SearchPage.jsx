import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import WorkerCard from '../components/WorkerCard';

const SearchPage = () => {
    const { t } = useTranslation();
    const [searchParams] = useSearchParams();

    const [workers, setWorkers] = useState([]);
    const [jobType, setJobType] = useState(searchParams.get('type') || '');
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const res = await axios.get(`https://khadamati-backend-mifb.onrender.com/api/workers/search/filter?jobType=${jobType}&location=${location}`);
            setWorkers(res.data.data.workers);
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred fetching workers.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleSearch();
    }, []);

    return (
        <div className="max-w-6xl mx-auto animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-lg p-8 mb-12 border border-slate-100">
                <h2 className="text-3xl font-extrabold mb-8 text-slate-900">Find Workers</h2>
                <form onSubmit={handleSearch} className="grid md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-slate-700 font-bold mb-2">Job Type</label>
                        <input
                            type="text"
                            placeholder="e.g. Plumber, Electrician"
                            className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-0 focus:border-emerald-500 transition bg-slate-50 font-medium"
                            value={jobType}
                            onChange={(e) => setJobType(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-bold mb-2">Location</label>
                        <input
                            type="text"
                            placeholder="e.g. Cairo, Nasr City"
                            className="w-full px-5 py-4 rounded-xl border-2 border-slate-200 focus:outline-none focus:ring-0 focus:border-emerald-500 transition bg-slate-50 font-medium"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </div>
                    <div className="flex items-end">
                        <button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-4 rounded-xl shadow-lg transition-transform transform active:scale-95 disabled:bg-emerald-300"
                            disabled={loading}
                        >
                            {loading ? 'Searching...' : 'Search'}
                        </button>
                    </div>
                </form>
            </div>

            {error ? (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-8 border border-red-200 font-bold">{error}</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {workers.length > 0 ? (
                        workers.map(worker => (
                            <WorkerCard key={worker._id} worker={worker} />
                        ))
                    ) : (
                        !loading && <div className="col-span-3 text-center text-slate-500 py-16 text-xl font-medium border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50 mt-4">
                            No workers found matching your criteria.
                        </div>
                    )}
                </div>
            )}

            {loading && (
                <div className="flex justify-center items-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-emerald-600"></div>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
