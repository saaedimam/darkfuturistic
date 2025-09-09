import React from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { ParticleBackground } from '../ParticleBackground';
import { Building2, Users, Globe, Leaf, TrendingUp, Cpu, Package, Settings } from 'lucide-react';

export function KattaliPage() {
  const projects = [
    {
      title: "Corporate Website",
      description: "Modern, responsive website showcasing company capabilities and sustainability initiatives",
      icon: Globe,
      color: "#00BFA6",
      status: "Launched",
      impact: "40% increase in B2B inquiries"
    },
    {
      title: "RFID Production Tracking",
      description: "Real-time tracking system for textile production line with IoT integration",
      icon: Package,
      color: "#FF7F3F",
      status: "Active",
      impact: "25% efficiency improvement"
    },
    {
      title: "Uniform & Laundry SaaS",
      description: "Digital transformation of uniform management and laundry operations",
      icon: Settings,
      color: "#3B82F6",
      status: "Deployed",
      impact: "60% cost reduction"
    },
    {
      title: "ERP Integrations",
      description: "Seamless integration with existing enterprise resource planning systems",
      icon: Cpu,
      color: "#8B5CF6",
      status: "Ongoing",
      impact: "100% data accuracy"
    }
  ];

  const metrics = [
    { label: "Employees", value: "850+", color: "#00BFA6" },
    { label: "Digital Systems", value: "12", color: "#FF7F3F" },
    { label: "Efficiency Gain", value: "35%", color: "#3B82F6" },
    { label: "Export Markets", value: "2", color: "#8B5CF6" }
  ];

  const exportMarkets = [
    { country: "United States", percentage: "65%", color: "#00BFA6" },
    { country: "Canada", percentage: "35%", color: "#FF7F3F" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative pt-20">
      <ParticleBackground particleCount={50} connectionDistance={100} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl text-white mb-4 font-outfit">
            Digital Transformation at{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFA6] to-[#FF7F3F]">
              KTLBD
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-inter mb-8">
            Leading digital transformation for 850+ employee factory operations at Kattali Textile Ltd. 
            Sustainability-focused B2B textile manufacturer exporting to USA & Canada.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <Badge className="bg-gradient-to-r from-[#00BFA6]/20 to-[#00BFA6]/10 text-[#00BFA6] border-[#00BFA6]/30 px-4 py-2">
              <Leaf className="mr-2" size={16} />
              Sustainability Focused
            </Badge>
            <Badge className="bg-gradient-to-r from-[#FF7F3F]/20 to-[#FF7F3F]/10 text-[#FF7F3F] border-[#FF7F3F]/30 px-4 py-2">
              <TrendingUp className="mr-2" size={16} />
              Export Leader
            </Badge>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
              <div className="text-3xl font-outfit mb-2" style={{ color: metric.color }}>
                {metric.value}
              </div>
              <div className="text-slate-400 font-inter">{metric.label}</div>
            </Card>
          ))}
        </div>

        {/* Digital Transformation Projects */}
        <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-white mb-4 font-outfit">Transformation Projects</h2>
            <p className="text-slate-400 font-inter">Comprehensive digitization across all factory operations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${project.color}20` }}
                  >
                    <project.icon size={24} style={{ color: project.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-white font-outfit">{project.title}</h3>
                      <Badge 
                        variant="outline" 
                        className="border-slate-500/50 text-slate-300"
                        style={{ borderColor: `${project.color}50`, color: project.color }}
                      >
                        {project.status}
                      </Badge>
                    </div>
                    <p className="text-slate-300 font-inter mb-3 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="text-sm" style={{ color: project.color }}>
                      Impact: {project.impact}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Company Overview & Export Markets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="text-[#00BFA6]" size={28} />
              <h3 className="text-2xl text-white font-outfit">Company Profile</h3>
            </div>
            
            <div className="space-y-4">
              {[
                { label: "Industry", value: "B2B Textile Manufacturing" },
                { label: "Workforce", value: "850+ Employees" },
                { label: "Focus", value: "Sustainability & Innovation" },
                { label: "Markets", value: "USA & Canada Export" },
                { label: "Specialization", value: "Corporate Uniforms" },
                { label: "Technology", value: "RFID & IoT Integration" }
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-slate-700/30">
                  <span className="text-slate-300 font-inter">{item.label}</span>
                  <span className="text-[#00BFA6] font-inter">{item.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Globe className="text-[#FF7F3F]" size={28} />
              <h3 className="text-2xl text-white font-outfit">Export Markets</h3>
            </div>
            
            <div className="space-y-6">
              {exportMarkets.map((market, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 font-inter">{market.country}</span>
                    <span className="font-inter" style={{ color: market.color }}>{market.percentage}</span>
                  </div>
                  <div className="w-full bg-slate-700/50 rounded-full h-3">
                    <div
                      className="h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: market.percentage,
                        background: `linear-gradient(90deg, ${market.color}40, ${market.color})`
                      }}
                    />
                  </div>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                <div className="flex items-center gap-2 mb-2">
                  <Leaf className="text-[#00BFA6]" size={16} />
                  <span className="text-white font-inter">Sustainability Impact</span>
                </div>
                <p className="text-slate-300 font-inter">
                  Digital transformation reduced paper usage by 80% and improved energy efficiency by 25% 
                  across all factory operations.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Technology Implementation */}
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border-slate-600/50 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl text-white mb-4 font-outfit">Digital Infrastructure</h2>
            <p className="text-slate-400 font-inter">Modern technology stack powering factory operations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "RFID Systems", desc: "Real-time asset tracking", icon: "📡" },
              { title: "IoT Integration", desc: "Connected machinery", icon: "🔗" },
              { title: "Cloud Infrastructure", desc: "Scalable AWS deployment", icon: "☁️" },
              { title: "Mobile Apps", desc: "Factory floor interfaces", icon: "📱" }
            ].map((tech, index) => (
              <div key={index} className="text-center p-6 bg-slate-700/30 rounded-lg border border-slate-600/30">
                <div className="text-3xl mb-3">{tech.icon}</div>
                <h3 className="text-white mb-2 font-outfit">{tech.title}</h3>
                <p className="text-slate-400 font-inter">{tech.desc}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
