import React, { useState, useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const WorkerSettingsPage = () => {
    const { t } = useTranslation();
    const { user: worker, loading, isAuthenticated, updateProfile, uploadImage, addToGallery, removeFromGallery, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '', phone: '', city: '', area: '', address: '', description: '', jobType: '', category: '', experienceYears: '', services: []
    });

    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [uploadingGallery, setUploadingGallery] = useState(false);

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, loading, navigate]);

    useEffect(() => {
        if (worker) {
            setFormData({
                name: worker.name || '',
                phone: worker.phone || '',
                city: worker.city || '',
                area: worker.area || '',
                address: worker.address || '',
                description: worker.description || '',
                jobType: worker.jobType || '',
                category: worker.category || '',
                experienceYears: worker.experienceYears || '',
                services: worker.services || []
            });
        }
    }, [worker]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleAddService = () => {
        setFormData({ ...formData, services: [...formData.services, ''] });
    };

    const handleRemoveService = (index) => {
        const newServices = [...formData.services];
        newServices.splice(index, 1);
        setFormData({ ...formData, services: newServices });
    };

    const handleServiceChange = (index, value) => {
        const newServices = [...formData.services];
        newServices[index] = value;
        setFormData({ ...formData, services: newServices });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            // filter out empty services before submitting
            const formattedData = {
                ...formData,
                services: formData.services.map(s => s.trim()).filter(s => s)
            };
            await updateProfile(worker._id, formattedData);
            setSuccessMsg('Profile updated successfully!');
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploadingImage(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            await uploadImage(worker._id, formData);
            setSuccessMsg('Profile picture updated successfully!');
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Failed to upload image. Make sure it is less than 20MB.');
        } finally {
            setUploadingImage(false);
        }
    };

    const handleGalleryUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        setUploadingGallery(true);
        setErrorMsg('');
        setSuccessMsg('');
        try {
            await addToGallery(worker._id, formData);
            setSuccessMsg('Photo added to gallery!');
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Failed to upload photo. Make sure it is less than 20MB.');
        } finally {
            setUploadingGallery(false);
        }
    };

    const handleRemoveGalleryPhoto = async (imagePath) => {
        if (!window.confirm('Are you sure you want to remove this photo?')) return;

        setErrorMsg('');
        setSuccessMsg('');
        try {
            await removeFromGallery(worker._id, imagePath);
            setSuccessMsg('Photo removed from gallery!');
        } catch (err) {
            setErrorMsg(err.response?.data?.message || 'Failed to remove photo.');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) return <div className="text-center py-20 animate-spin text-emerald-600 text-4xl">↻</div>;
    if (!worker) return null;

    return (
        <div className="max-w-4xl mx-auto mt-10 animate-fadeIn">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-4xl font-extrabold text-slate-900">{t('Dashboard')}</h2>
                <button
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 font-bold px-6 py-2 rounded-xl border border-red-200 hover:bg-red-600 hover:text-white transition"
                >
                    {t('Logout')}
                </button>
            </div>

            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
                {successMsg && <div className="bg-green-50 text-green-700 p-4 rounded-xl mb-6 font-bold border border-green-200">{successMsg}</div>}
                {errorMsg && <div className="bg-red-50 text-red-700 p-4 rounded-xl mb-6 font-bold border border-red-200">{errorMsg}</div>}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Profile Picture Upload */}
                    <section className="flex flex-col sm:flex-row items-center gap-8 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                        <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden shrink-0 bg-slate-200">
                            <img
                                src={worker.images?.length > 0 ? `https://khadamati-backend-mifb.onrender.com${worker.images[0]}` : "https://placehold.co/400x300?text=Profile"}
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Profile Picture</h3>
                            <p className="text-slate-500 text-sm mb-4 font-medium max-w-sm">
                                Upload a clear photo of yourself so users know who they are hiring. JPEG, PNG, or WebP under 20MB.
                            </p>
                            <label className={`cursor-pointer bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-6 py-2.5 rounded-xl font-bold transition flex items-center gap-2 ${uploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                {uploadingImage ? 'Uploading...' : 'Change Picture'}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/jpeg, image/png, image/webp"
                                    onChange={handleImageUpload}
                                    disabled={uploadingImage}
                                />
                            </label>
                        </div>
                    </section>

                    {/* Basic Info */}
                    <section>
                        <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Basic Info</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">{t('Name')}</label>
                                <input type="text" name="name" className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.name} onChange={onChange} />
                            </div>
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">{t('Email')} (Read Only)</label>
                                <input type="email" readOnly className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-100 font-medium text-slate-500 cursor-not-allowed" value={worker.email} />
                            </div>
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">{t('Category')}</label>
                                <select
                                    name="category"
                                    required
                                    className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium appearance-none cursor-pointer"
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
                                <label className="block text-slate-700 font-bold mb-2">{t('JobType')}</label>
                                <input type="text" name="jobType" className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.jobType} onChange={onChange} />
                            </div>
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">{t('ExperienceYears')}</label>
                                <input type="number" name="experienceYears" className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.experienceYears} onChange={onChange} />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-slate-700 font-bold mb-2">Description</label>
                                <textarea name="description" rows="4" className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.description} onChange={onChange}></textarea>
                            </div>
                            <div className="md:col-span-2">
                                <label className="flex items-center justify-between text-slate-700 font-bold mb-4">
                                    <span>Services</span>
                                    <button
                                        type="button"
                                        onClick={handleAddService}
                                        className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 px-4 py-2 rounded-xl text-sm transition font-bold"
                                    >
                                        + Add Service
                                    </button>
                                </label>
                                {formData.services.length === 0 && (
                                    <p className="text-slate-500 text-sm mb-4">No services added yet. Click "+ Add Service" to add one.</p>
                                )}
                                <div className="space-y-3">
                                    {formData.services.map((service, index) => (
                                        <div key={index} className="flex gap-3 animate-fadeIn">
                                            <input
                                                type="text"
                                                placeholder="e.g. Pipe fitting, Drain cleaning"
                                                className="flex-grow px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium"
                                                value={service}
                                                onChange={(e) => handleServiceChange(index, e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveService(index)}
                                                title="Remove service"
                                                className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-3 rounded-xl transition font-bold border border-red-200 flex-shrink-0"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Location Info */}
                    <section>
                        <h3 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Contact & Location</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">{t('Phone')}</label>
                                <input type="text" name="phone" className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.phone} onChange={onChange} />
                            </div>
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">{t('City')}</label>
                                <input type="text" name="city" className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.city} onChange={onChange} />
                            </div>
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">{t('Area')}</label>
                                <input type="text" name="area" className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.area} onChange={onChange} />
                            </div>
                            <div>
                                <label className="block text-slate-700 font-bold mb-2">{t('Address')}</label>
                                <input type="text" name="address" className="w-full px-5 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-slate-50 font-medium" value={formData.address} onChange={onChange} />
                            </div>
                        </div>
                    </section>

                    {/* Work Gallery */}
                    <section>
                        <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center justify-between border-b pb-2">
                            <span>Work Gallery</span>
                            <label className={`cursor-pointer bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-4 py-2 rounded-xl text-sm transition font-bold ${uploadingGallery ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                {uploadingGallery ? 'Adding...' : '+ Add Work Photo'}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleGalleryUpload}
                                    disabled={uploadingGallery}
                                />
                            </label>
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {/* Skip the first image as it's the profile pic */}
                            {worker.images?.slice(1).map((img, index) => (
                                <div key={index} className="relative group aspect-square rounded-2xl overflow-hidden border border-slate-100 shadow-sm animate-fadeIn">
                                    <img
                                        src={`https://khadamati-backend-mifb.onrender.com${img}`}
                                        alt={`Work ${index + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveGalleryPhoto(img)}
                                        className="absolute top-2 right-2 bg-red-500/90 text-white w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-600 transition shadow-lg backdrop-blur-sm"
                                        title="Remove photo"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            {(!worker.images || worker.images.length <= 1) && !uploadingGallery && (
                                <div className="col-span-full py-10 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl">
                                    <p className="text-slate-500 font-medium">Your work gallery is empty. Upload photos of your projects!</p>
                                </div>
                            )}
                        </div>
                    </section>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={saving}
                            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-10 rounded-xl shadow-lg transition-transform transform active:scale-95 disabled:bg-teal-300 text-lg"
                        >
                            {saving ? 'Saving...' : 'Update Profile'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default WorkerSettingsPage;
