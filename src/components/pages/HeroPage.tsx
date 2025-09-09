import React from 'react';
import { Button } from '../ui/button';
import { ParticleBackground } from '../ParticleBackground';
import { AnimatedVideoBackground } from '../AnimatedVideoBackground';
import { ArrowRight, Zap, Shield, TrendingUp } from 'lucide-react';

export function HeroPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      <AnimatedVideoBackground />
      <ParticleBackground particleCount={60} connectionDistance={100} />
      
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-outfit tracking-tight mb-6">
              <span className="text-white">Build the future.</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] to-[#66BB6A]">
                Ship relentlessly.
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-inter">
              Engineering systems that compound: RFID, SaaS, and industrial software.
              Co-Founder & Platform Architect at StitchOS.
            </p>
          </div>

          <div className="flex items-center justify-center gap-4 mb-12">
            <Button 
              className="bg-gradient-to-r from-[#4CAF50] to-[#66BB6A] hover:from-[#66BB6A] to-[#81C784] text-white px-8 py-6 rounded-xl shadow-lg shadow-[#4CAF50]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#4CAF50]/40 font-inter"
            >
              Get Started
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button 
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:text-white hover:bg-slate-800/50 px-8 py-6 rounded-xl font-inter"
            >
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Process data at unprecedented speeds with our optimized infrastructure"
              },
              {
                icon: Shield,
                title: "Enterprise Security",
                description: "Bank-grade security with end-to-end encryption and compliance"
              },
              {
                icon: TrendingUp,
                title: "Predictive Analytics",
                description: "AI-powered insights that help you stay ahead of market trends"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:bg-slate-800/50 transition-all duration-300 hover:border-[#00BFA6]/30">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00BFA6]/20 to-[#FF7F3F]/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <feature.icon className="text-[#00BFA6]" size={24} />
                </div>
                <h3 className="text-white mb-2 font-outfit">{feature.title}</h3>
                <p className="text-slate-400 font-inter">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
