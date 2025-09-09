import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { ParticleBackground } from '../ParticleBackground';
import { ShoppingCart, Calculator, Smartphone, Coffee, Package, TrendingUp, Users, Zap } from 'lucide-react';

export function ProjectsPage() {
  const projects = [
    {
      title: "CartCount",
      description: "Mobile app for small food shops & tea stalls inventory management",
      icon: ShoppingCart,
      color: "#00BFA6",
      type: "Mobile App",
      status: "Active",
      features: [
        "Real-time inventory tracking",
        "Simple barcode scanning",
        "Sales analytics dashboard",
        "Low stock alerts",
        "Offline functionality"
      ],
      tech: ["Flutter", "SQLite", "Firebase"],
      targetUsers: "Small Food Shops & Tea Stalls"
    },
    {
      title: "QuickBill",
      description: "Lightweight accounting app for small businesses and freelancers",
      icon: Calculator,
      color: "#FF7F3F",
      type: "Accounting SaaS",
      status: "Beta",
      features: [
        "Invoice generation",
        "Expense tracking",
        "Tax calculations",
        "Payment reminders",
        "Financial reports"
      ],
      tech: ["React", "Node.js", "PostgreSQL"],
      targetUsers: "Small Businesses & Freelancers"
    }
  ];

  const additionalProjects = [
    {
      title: "Textile ERP Suite",
      description: "Comprehensive ERP solution for textile manufacturing",
      icon: Package,
      color: "#3B82F6",
      status: "Enterprise"
    },
    {
      title: "RFID Analytics Platform",
      description: "Data analytics platform for RFID tracking systems",
      icon: TrendingUp,
      color: "#8B5CF6",
      status: "B2B"
    },
    {
      title: "Factory Management System",
      description: "Complete factory floor management and monitoring",
      icon: Users,
      color: "#F59E0B",
      status: "Industrial"
    },
    {
      title: "IoT Device Manager",
      description: "Centralized management for industrial IoT devices",
      icon: Zap,
      color: "#10B981",
      status: "IoT"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative pt-20">
      <ParticleBackground particleCount={40} connectionDistance={90} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl text-white mb-4 font-outfit">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFA6] to-[#FF7F3F]">
              Other Projects
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-inter">
            A collection of innovative software solutions addressing diverse business needs, 
            from small-scale retail to enterprise manufacturing.
          </p>
        </div>

        {/* Main Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8 hover:bg-slate-800/70 transition-all duration-300">
              <div className="flex items-start gap-4 mb-6">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${project.color}20` }}
                >
                  <project.icon size={28} style={{ color: project.color }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl text-white font-outfit">{project.title}</h2>
                    <Badge 
                      variant="outline" 
                      className="border-slate-500/50"
                      style={{ borderColor: `${project.color}50`, color: project.color }}
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-slate-300 font-inter mb-3">{project.description}</p>
                  <div className="flex items-center gap-4 mb-4">
                    <Badge className="bg-slate-700/50 text-slate-300 border-slate-600/50">
                      {project.type}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Users size={14} className="text-slate-400" />
                      <span className="text-sm text-slate-400 font-inter">{project.targetUsers}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Features */}
                <div>
                  <h3 className="text-white mb-3 font-outfit">Key Features</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {project.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2 text-slate-300 font-inter">
                        <div 
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: project.color }}
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technology Stack */}
                <div>
                  <h3 className="text-white mb-3 font-outfit">Technology Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, techIndex) => (
                      <Badge 
                        key={techIndex}
                        className="bg-slate-700/50 text-slate-300 border-slate-600/50 hover:border-slate-500/50"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700/50 font-inter"
                    style={{ borderColor: `${project.color}50` }}
                  >
                    Learn More
                  </Button>
                  <Button 
                    className="font-inter"
                    style={{ 
                      background: `linear-gradient(90deg, ${project.color}40, ${project.color})`,
                      borderColor: project.color
                    }}
                  >
                    {project.status === 'Beta' ? 'Join Beta' : 'Try Demo'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Projects Grid */}
        <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-white mb-4 font-outfit">Additional Solutions</h2>
            <p className="text-slate-400 font-inter">Enterprise and industrial software solutions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalProjects.map((project, index) => (
              <div
                key={index}
                className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300 text-center"
              >
                <div 
                  className="w-12 h-12 mx-auto mb-4 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${project.color}20` }}
                >
                  <project.icon size={24} style={{ color: project.color }} />
                </div>
                <h3 className="text-white mb-3 font-outfit">{project.title}</h3>
                <p className="text-slate-300 font-inter mb-4 leading-relaxed">
                  {project.description}
                </p>
                <Badge 
                  variant="outline" 
                  className="border-slate-500/50"
                  style={{ borderColor: `${project.color}50`, color: project.color }}
                >
                  {project.status}
                </Badge>
              </div>
            ))}
          </div>
        </Card>

        {/* Development Philosophy */}
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border-slate-600/50 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl text-white mb-4 font-outfit">Development Philosophy</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00BFA6]/20 to-[#FF7F3F]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Smartphone className="text-[#00BFA6]" size={28} />
              </div>
              <h3 className="text-white mb-3 font-outfit">Mobile-First</h3>
              <p className="text-slate-300 font-inter">
                Every solution is designed with mobile accessibility and responsive design as a priority
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF7F3F]/20 to-[#3B82F6]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Coffee className="text-[#FF7F3F]" size={28} />
              </div>
              <h3 className="text-white mb-3 font-outfit">User-Centric</h3>
              <p className="text-slate-300 font-inter">
                Simple, intuitive interfaces that work for tea stall owners and enterprise managers alike
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="text-[#3B82F6]" size={28} />
              </div>
              <h3 className="text-white mb-3 font-outfit">Performance-Driven</h3>
              <p className="text-slate-300 font-inter">
                Optimized for speed and efficiency, whether serving 10 or 10,000 users
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
