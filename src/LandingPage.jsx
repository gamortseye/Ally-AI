import React from "react";
import HeroSection from "./components/HeroSection.jsx";
import ServicesCards from "./components/ServicesCards.jsx";
import AmazingServices from "./components/AmazingServices.jsx";
import SupportSection from "./components/SupportSection.jsx";
import PrivacySection from "./components/PrivacySection.jsx";
import TrustedProfiles from "./components/TrustedProfiles.jsx";
import ContactSection from "./components/ContactSection.jsx";


const LandingPage = () => {
return (
<div className="min-h-screen">
<HeroSection />
<ServicesCards />
<AmazingServices />
<SupportSection />
<PrivacySection />
<TrustedProfiles />
<ContactSection />
</div>
);
};


export default LandingPage;