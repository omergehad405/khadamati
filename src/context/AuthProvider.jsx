import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [role, setRole] = useState(localStorage.getItem('role') || 'user');
    const [loading, setLoading] = useState(true);

    const loadUser = async () => {
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const endpoint = role === 'worker' ? 'workers/auth/me' : 'users/auth/me';
            const res = await axios.get(`https://khadamati-backend-mifb.onrender.com/api/${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const data = role === 'worker' ? res.data.data.worker : res.data.data.user;
            setUser({ ...data, role });
        } catch (err) {
            // On 401 or any auth error, clear the token silently without
            // calling logout() to prevent a useEffect re-render loop
            if (err.response?.status === 401 || err.response?.status === 403) {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('userId');
                setToken(null);
                setUser(null);
                setRole('user');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUser();
    }, []);  // Only run on mount, not on every token/role change

    const login = async (email, password, loginRole = 'user') => {
        const endpoint = loginRole === 'worker' ? 'workers/auth/login' : 'users/auth/login';
        const res = await axios.post(`https://khadamati-backend-mifb.onrender.com/api/${endpoint}`, { email, password });

        const { token: newToken, id, worker, user: userData } = res.data.data;

        setToken(newToken);
        setRole(loginRole);
        setUser({ ...(worker || userData), role: loginRole });

        localStorage.setItem('token', newToken);
        localStorage.setItem('role', loginRole);
        localStorage.setItem('userId', id);

        return res.data;
    };

    const register = async (formData, registerRole = 'user') => {
        const endpoint = registerRole === 'worker' ? 'workers/auth/register' : 'users/auth/register';
        const res = await axios.post(`https://khadamati-backend-mifb.onrender.com/api/${endpoint}`, formData);

        const { token: newToken, id, worker, user: userData } = res.data.data;

        setToken(newToken);
        setRole(registerRole);
        setUser({ ...(worker || userData), role: registerRole });

        localStorage.setItem('token', newToken);
        localStorage.setItem('role', registerRole);
        localStorage.setItem('userId', id);

        return id || res.data.data.id;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('userId');
        setToken(null);
        setUser(null);
        setRole('user');
    };

    const updateProfile = async (id, updatedData) => {
        if (role !== 'worker') return;
        const res = await axios.put(`https://khadamati-backend-mifb.onrender.com/api/workers/${id}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const workerData = res.data.data.worker;
        setUser({ ...workerData, role });
        return workerData;
    };

    const uploadImage = async (id, formData) => {
        if (role !== 'worker') return;
        const res = await axios.put(`https://khadamati-backend-mifb.onrender.com/api/workers/${id}/photo`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUser(prev => ({ ...prev, images: res.data.data.images }));
        return res.data.data.images;
    };

    const addToGallery = async (id, formData) => {
        if (role !== 'worker') return;
        const res = await axios.post(`https://khadamati-backend-mifb.onrender.com/api/workers/${id}/gallery`, formData, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setUser(prev => ({ ...prev, images: res.data.data.images }));
        return res.data.data.images;
    };

    const removeFromGallery = async (id, imagePath) => {
        if (role !== 'worker') return;
        const res = await axios.delete(`https://khadamati-backend-mifb.onrender.com/api/workers/${id}/gallery`, {
            headers: { Authorization: `Bearer ${token}` },
            data: { imagePath }
        });
        setUser(prev => ({ ...prev, images: res.data.data.images }));
        return res.data.data.images;
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            role,
            loading,
            isAuthenticated: !!token,
            login,
            register,
            logout,
            updateProfile,
            uploadImage,
            addToGallery,
            removeFromGallery
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
