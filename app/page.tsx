"use client"

import { useState } from "react"
import { Navigation } from "../src/components/Navigation"
import { HeroPage } from "../src/components/pages/HeroPage"
import { ScrollLandingPage } from "../src/components/pages/ScrollLandingPage"
import { ProfilePage } from "../src/components/pages/ProfilePage"
import { StitchOSPage } from "../src/components/pages/StitchOSPage"
import { KattaliPage } from "../src/components/pages/KattaliPage"
import { ProjectsPage } from "../src/components/pages/ProjectsPage"
import { ContactPage } from "../src/components/pages/ContactPage"

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState("hero")

  // Handle navigation from scroll demo back to main app
  const handleScrollDemoNavigation = (page: string) => {
    setCurrentPage(page)
  }

  const renderPage = () => {
    switch (currentPage) {
      case "hero":
        return <HeroPage />
      case "scroll-demo":
        return <ScrollLandingPage />
      case "about":
        return <ProfilePage />
      case "stitchos":
        return <StitchOSPage />
      case "kattali":
        return <KattaliPage />
      case "projects":
        return <ProjectsPage />
      case "contact":
        return <ContactPage />
      default:
        return <HeroPage />
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 font-inter">
      {currentPage === "scroll-demo" ? (
        <ScrollLandingPage onNavigate={handleScrollDemoNavigation} />
      ) : (
        <>
          <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
          {renderPage()}
        </>
      )}
    </div>
  )
}
