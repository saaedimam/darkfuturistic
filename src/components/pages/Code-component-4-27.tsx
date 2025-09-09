import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ParticleBackground } from '../ParticleBackground';
import { ExternalLink, Database, Cpu, Shield, GitBranch, Docker, Globe } from 'lucide-react';

export function StitchOSPage() {
  const features = [
    {
      title: "Edge Ingest",
      description: "Real-time RFID data collection and preprocessing at the edge",
      icon: Database,
      color: "#00BFA6"
    },
    {
      title: "Core API",
      description: "FastAPI-powered backend with high-performance endpoints",
      icon: Cpu,
      color: "#FF7F3F"
    },
    {
      title: "Ledger",
      description: "Immutable transaction logging for full audit trails",
      icon: Shield,
      color: "#3B82F6"
    },
    {
      title: "Trace",
      description: "Complete asset tracking and movement history",
      icon: GitBranch,
      color: "#8B5CF6"
    },
    {
      title: "Control",
      description: "Automated workflows and business rule enforcement",
      icon: Cpu,
      color: "#F59E0B"
    }
  ];

  const techStack = [
    { name: "Supabase Postgres", icon: Database, color: "#00BFA6" },
    { name: "FastAPI", icon: Cpu, color: "#FF7F3F" },
    { name: "Next.js 14", icon: Globe, color: "#3B82F6" },
    { name: "Docker", icon: Docker, color: "#8B5CF6" },
    { name: "GitLab CI/CD", icon: GitBranch, color: "#F59E0B" }
  ];

  const metrics = [
    { label: "Real-time Processing", value: "< 100ms", color: "#00BFA6" },
    { label: "Asset Tracking", value: "99.9%", color: "#FF7F3F" },
    { label: "Uptime", value: "99.95%", color: "#3B82F6" },
    { label: "Scalability", value: "1M+ assets", color: "#8B5CF6" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative pt-20">
      <ParticleBackground particleCount={60} connectionDistance={120} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl text-white mb-4 font-outfit">
            StitchOS — <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFA6] to-[#FF7F3F]">The Connected Loom</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-inter mb-8">
            SaaS + IoT platform for real-time RFID tracking of textile assets. 
            Modular architecture designed for industrial-scale operations.
          </p>
          
          <Button 
            className="bg-gradient-to-r from-[#00BFA6] to-[#00A693] hover:from-[#00A693] to-[#008A7B] text-white px-8 py-6 rounded-xl shadow-lg shadow-[#00BFA6]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#00BFA6]/40 font-inter"
          >
            <ExternalLink className="mr-2" size={20} />
            Visit www.stitchos.app
          </Button>
        </div>

        {/* Performance Metrics */}
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

        {/* Architecture Features */}
        <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-white mb-4 font-outfit">Modular Architecture</h2>
            <p className="text-slate-400 font-inter">Five core modules working in perfect harmony</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300 text-center"
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${feature.color}20` }}
                >
                  <feature.icon size={28} style={{ color: feature.color }} />
                </div>
                <h3 className="text-white mb-3 font-outfit">{feature.title}</h3>
                <p className="text-slate-300 font-inter leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* Tech Stack & Implementation */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8">
            <h3 className="text-2xl text-white mb-6 font-outfit">Technology Stack</h3>
            <div className="space-y-4">
              {techStack.map((tech, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-slate-500/50 transition-all duration-300">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${tech.color}20` }}
                  >
                    <tech.icon size={20} style={{ color: tech.color }} />
                  </div>
                  <span className="text-slate-300 font-inter">{tech.name}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8">
            <h3 className="text-2xl text-white mb-6 font-outfit">Key Capabilities</h3>
            <div className="space-y-4">
              {[
                { title: "Real-time RFID Tracking", desc: "Instant asset location and status updates" },
                { title: "Industrial IoT Integration", desc: "Seamless connection with textile machinery" },
                { title: "Scalable Cloud Architecture", desc: "Auto-scaling infrastructure on AWS" },
                { title: "Advanced Analytics", desc: "Predictive insights and performance metrics" },
                { title: "Mobile-First Design", desc: "Responsive interfaces for factory floor use" }
              ].map((capability, index) => (
                <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                  <h4 className="text-white mb-2 font-outfit">{capability.title}</h4>
                  <p className="text-slate-400 font-inter">{capability.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Implementation Highlights */}
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border-slate-600/50 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl text-white mb-4 font-outfit">Platform Highlights</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00BFA6]/20 to-[#FF7F3F]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Database className="text-[#00BFA6]" size={28} />
              </div>
              <h3 className="text-white mb-3 font-outfit">Edge Computing</h3>
              <p className="text-slate-300 font-inter">Process RFID data at the source for minimal latency and maximum reliability</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#FF7F3F]/20 to-[#00BFA6]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Shield className="text-[#FF7F3F]" size={28} />
              </div>
              <h3 className="text-white mb-3 font-outfit">Enterprise Security</h3>
              <p className="text-slate-300 font-inter">Bank-grade encryption and compliance with textile industry standards</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#3B82F6]/20 to-[#8B5CF6]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Cpu className="text-[#3B82F6]" size={28} />
              </div>
              <h3 className="text-white mb-3 font-outfit">AI-Powered Insights</h3>
              <p className="text-slate-300 font-inter">Machine learning algorithms optimize production workflows and predict maintenance</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
