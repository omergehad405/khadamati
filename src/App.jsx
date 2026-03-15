import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import CategoriesPage from './pages/CategoriesPage';
import WorkerProfile from './pages/WorkerProfile';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WorkerSettingsPage from './pages/WorkerSettingsPage';
import AuthProvider from './context/AuthProvider';

function App() {
    const { i18n } = useTranslation();

    useEffect(() => {
        document.dir = i18n.dir();
        document.documentElement.lang = i18n.language;
    }, [i18n, i18n.language]);

    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-teal-200 flex flex-col">
                    <Navbar />
                    <main className="container mx-auto px-4 py-8 flex-grow">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/search" element={<SearchPage />} />
                            <Route path="/categories" element={<CategoriesPage />} />
                            <Route path="/worker/:id" element={<WorkerProfile />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/register" element={<RegisterPage />} />
                            <Route path="/settings" element={<WorkerSettingsPage />} />
                        </Routes>
                    </main>
                    <footer className="bg-slate-900 text-slate-400 py-8 text-center mt-12 border-t border-slate-800">
                        <p className="font-bold">&copy; 2026 Khadamati Platform. All rights reserved.</p>
                    </footer>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
