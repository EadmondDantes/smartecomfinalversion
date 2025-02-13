import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AnnouncementBar from './components/AnnouncementBar';
import Home from './pages/Home';
import Brands from './pages/Brands';
import Apps from './pages/Apps';
import Agencies from './pages/Agencies';
import ServiceProviders from './pages/ServiceProviders';
import About from './pages/About';
import Contact from './pages/Contact';
import BrandProfile from './pages/BrandProfile';
import AppProfile from './pages/AppProfile';
import AgencyProfile from './pages/AgencyProfile';
import Guides from './pages/Guides';
import BlogPost from './pages/BlogPost';
import SubmitBrand from './pages/SubmitBrand';
import RegisterAgency from './pages/RegisterAgency';
import SubmitTool from './pages/SubmitTool';
import SubmitReview from './pages/SubmitReview';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <AnnouncementBar />
        <Navbar />
        <div className="pt-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/brands/:id" element={<BrandProfile />} />
            <Route path="/apps" element={<Apps />} />
            <Route path="/apps/:id" element={<AppProfile />} />
            <Route path="/agencies" element={<Agencies />} />
            <Route path="/agencies/:id" element={<AgencyProfile />} />
            <Route path="/service-providers" element={<ServiceProviders />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:id" element={<BlogPost />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/submit-brand" element={<SubmitBrand />} />
            <Route path="/register-agency" element={<RegisterAgency />} />
            <Route path="/submit-tool" element={<SubmitTool />} />
            <Route path="/submit-review" element={<SubmitReview />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;