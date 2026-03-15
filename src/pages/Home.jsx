import React from 'react';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import HowItWorks from '../components/home/HowItWorks';
import AboutUs from '../components/home/AboutUs';
import CTA from '../components/home/CTA';

const Home = () => {
    return (
        <div className="animate-fadeIn pb-12">
            <Hero />
            <Features />
            <HowItWorks />
            <AboutUs />
            <CTA />
        </div>
    );
};

export default Home;
