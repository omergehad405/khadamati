import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const RegisterPage = () => {
    const { t } = useTranslation();
    const { register, uploadImage } = useContext(AuthContext);
    const navigate = useNavigate();

    const [role, setRole] = useState('user'); // 'user' or 'worker'
    const [formData, setFormData] = useState({
        name: '', email: '', password: '', category: '', jobType: '', phone: '', city: '', area: '', address: '', experienceYears: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            // 1. Register
            const userId = await register({
                ...formData,
                experienceYears: Number(formData.experienceYears) || 0
            }, role);

            // 2. Upload image if selected (only for workers)
            if (role === 'worker' && imageFile && userId) {
                const imgData = new FormData();
                imgData.append('image', imageFile);
                await uploadImage(userId, imgData);
            }

            if (role === 'worker') {
                navigate('/settings');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
            setLoading(false);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl mx-auto mt-16 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 mb-20"
        >
            <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold text-slate-900 mb-4">{t('Register')}</h2>
                <div className="w-16 h-1.5 bg-teal-500 mx-auto rounded-full mb-6"></div>

                {/* Role Toggle */}
                <div className="flex max-w-xs mx-auto bg-slate-100 p-1 rounded-2xl relative">
                    <motion.div 
                        layoutId="activeRoleRegister"
                        className="absolute inset-y-1 bg-white rounded-xl shadow-sm"
                        initial={false}
                        animate={{ 
                            left: role === 'user' ? '4px' : '50%',
                            right: role === 'user' ? '50%' : '4px'
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                    <button
                        onClick={() => setRole('user')}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all relative z-10 ${role === 'user' ? 'text-emerald-600' : 'text-slate-400'}`}
                    >
                        {t('User')}
                    </button>
                    <button
                        onClick={() => setRole('worker')}
                        className={`flex-1 py-3 rounded-xl font-bold transition-all relative z-10 ${role === 'worker' ? 'text-emerald-600' : 'text-slate-400'}`}
                    >
                        {t('Worker')}
                    </button>
                </div>
            </div>

            {error && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 font-medium border border-red-200">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-6">

                {/* Profile Picture Uploader (Only for Workers) */}
                <AnimatePresence mode="wait">
                    {role === 'worker' && (
                        <motion.div 
                            key="worker-image"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col items-center justify-center mb-8 p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 relative min-h-[160px] overflow-hidden"
                        >
                            {imagePreview ? (
                                <div className="relative">
                                    <motion.img 
                                        initial={{ scale: 0.5 }}
                                        animate={{ scale: 1 }}
                                        src={imagePreview} alt="Preview" className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" />
                                    <button
                                        type="button"
                                        onClick={() => { setImageFile(null); setImagePreview(null); }}
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg hover:bg-red-600 transition"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                    <label className="cursor-pointer text-emerald-600 font-bold hover:underline">
                                        {t('UploadProfilePicture')}
                                        <input type="file" className="hidden" accept="image/jpeg, image/png, image/webp" onChange={handleImageChange} />
                                    </label>
                                    <p className="text-slate-500 text-sm mt-1">{t('Optional')}. JPEG, PNG {t('ar') === 'ar' ? 'أقل من 20 ميجابايت' : 'under 20MB'}.</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-slate-700 font-bold mb-2">{t('Name')}</label>
                        <input type="text" name="name" required className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.name} onChange={onChange} />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-bold mb-2">{t('Email')}</label>
                        <input type="email" name="email" required className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.email} onChange={onChange} />
                    </div>
                    <div>
                        <label className="block text-slate-700 font-bold mb-2">{t('Password')}</label>
                        <input type="password" name="password" required className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.password} onChange={onChange} />
                    </div>
                </div>

                <AnimatePresence mode="popLayout">
                    {role === 'worker' && (
                        <motion.div 
                            key="worker-details"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="space-y-6 overflow-hidden"
                        >
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">{t('Phone')}</label>
                                    <input type="text" name="phone" required className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.phone} onChange={onChange} />
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">{t('Category')}</label>
                                    <select 
                                        name="category" 
                                        required 
                                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium appearance-none cursor-pointer" 
                                        value={formData.category} 
                                        onChange={onChange}
                                    >
                                        <option value="">{t('SelectCategory')}</option>
                                        <option value="Worker">{t('Workers')}</option>
                                        <option value="Doctor">{t('Doctors')}</option>
                                        <option value="Engineer">{t('Engineers')}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">{t('SubCategory')}</label>
                                    <input 
                                        type="text" 
                                        name="jobType" 
                                        placeholder={formData.category === 'Doctor' ? "e.g. Surgeon" : formData.category === 'Engineer' ? "e.g. Architect" : "e.g. Plumber"} 
                                        required 
                                        disabled={!formData.category}
                                        className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium disabled:opacity-50" 
                                        value={formData.jobType} 
                                        onChange={onChange} 
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">{t('ExperienceYears')}</label>
                                    <input type="number" name="experienceYears" required className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.experienceYears} onChange={onChange} />
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">{t('City')}</label>
                                    <input type="text" name="city" required className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.city} onChange={onChange} />
                                </div>
                                <div>
                                    <label className="block text-slate-700 font-bold mb-2">{t('Area')}</label>
                                    <input type="text" name="area" required className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.area} onChange={onChange} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">{t('Address')}</label>
                                <input type="text" name="address" className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.address} onChange={onChange} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="pt-4">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl shadow-lg transition-all transform active:scale-95 disabled:bg-emerald-300 text-lg uppercase tracking-widest"
                    >
                        {loading ? '...' : (role === 'worker' ? t('RegisterAsWorker') : t('RegisterAsUser'))}
                    </motion.button>
                </div>
            </form>

            <p className="mt-8 text-center text-slate-600 font-bold text-sm">
                {t('AlreadyHaveAccount')} <Link to="/login" className="text-teal-600 font-black hover:underline ml-1">LOGIN</Link>
            </p>
        </motion.div>
    );
};

export default RegisterPage;
