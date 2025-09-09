"use client"
import { Home, User, Package, Building2, FolderOpen, Mail, Monitor } from "lucide-react"
import { VectorLogo } from "./VectorLogo"

interface NavigationProps {
  currentPage: string
  setCurrentPage: (page: string) => void
}

const navItems = [
  { id: "hero", label: "Home", icon: Home },
  { id: "scroll-demo", label: "Scroll Demo", icon: Monitor },
  { id: "about", label: "About", icon: User },
  { id: "stitchos", label: "StitchOS", icon: Package },
  { id: "kattali", label: "Kattali", icon: Building2 },
  { id: "projects", label: "Projects", icon: FolderOpen },
  { id: "contact", label: "Contact", icon: Mail },
]

export function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <VectorLogo />

          <div className="flex items-center gap-1">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setCurrentPage(id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 magnetic-hover ${
                  currentPage === id
                    ? "bg-[#00BFA6]/20 text-[#00BFA6] shadow-lg shadow-[#00BFA6]/20"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                }`}
              >
                <Icon size={18} />
                <span className="font-inter">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
