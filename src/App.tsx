import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroPage } from './components/pages/HeroPage';
import { ScrollLandingPage } from './components/pages/ScrollLandingPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { StitchOSPage } from './components/pages/StitchOSPage';
import { KattaliPage } from './components/pages/KattaliPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { ContactPage } from './components/pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('hero');
  
  // Handle navigation from scroll demo back to main app
  const handleScrollDemoNavigation = (page: string) => {
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'hero':
        return <HeroPage />;
      case 'scroll-demo':
        return <ScrollLandingPage />;
      case 'about':
        return <ProfilePage />;
      case 'stitchos':
        return <StitchOSPage />;
      case 'kattali':
        return <KattaliPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HeroPage />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-inter">
      {currentPage === 'scroll-demo' ? (
        <ScrollLandingPage onNavigate={handleScrollDemoNavigation} />
      ) : (
        <>
          <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
          {renderPage()}
        </>
      )}
    </div>
  );
}
