import React from 'react';
import { Card } from '../ui/card';
import { ParticleBackground } from '../ParticleBackground';
import { ArrowRight, Database, Cpu, Cloud, Shield, Zap, CheckCircle } from 'lucide-react';

export function ProcessPage() {
  const processSteps = [
    {
      id: 1,
      title: "Data Ingestion",
      description: "Collect and normalize data from multiple sources including APIs, databases, and real-time streams",
      icon: Database,
      color: "#00BFA6",
      connections: [2, 3]
    },
    {
      id: 2,
      title: "Processing Engine",
      description: "Advanced algorithms and machine learning models process incoming data for insights",
      icon: Cpu,
      color: "#FF7F3F",
      connections: [4]
    },
    {
      id: 3,
      title: "Security Layer",
      description: "End-to-end encryption and compliance checks ensure data integrity and privacy",
      icon: Shield,
      color: "#3B82F6",
      connections: [4]
    },
    {
      id: 4,
      title: "Cloud Infrastructure",
      description: "Scalable cloud infrastructure automatically adjusts to workload demands",
      icon: Cloud,
      color: "#8B5CF6",
      connections: [5, 6]
    },
    {
      id: 5,
      title: "Performance Optimization",
      description: "Real-time optimization algorithms ensure maximum efficiency and speed",
      icon: Zap,
      color: "#F59E0B",
      connections: [7]
    },
    {
      id: 6,
      title: "Quality Assurance",
      description: "Automated testing and validation ensures reliability and accuracy",
      icon: CheckCircle,
      color: "#10B981",
      connections: [7]
    },
    {
      id: 7,
      title: "Delivery & Analytics",
      description: "Results are delivered through APIs, dashboards, and real-time notifications",
      icon: ArrowRight,
      color: "#00BFA6",
      connections: []
    }
  ];

  const metrics = [
    { label: "Processing Speed", value: "10M req/sec", color: "#00BFA6" },
    { label: "Uptime Guarantee", value: "99.99%", color: "#FF7F3F" },
    { label: "Data Accuracy", value: "99.8%", color: "#3B82F6" },
    { label: "Response Time", value: "<50ms", color: "#8B5CF6" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative pt-20">
      <ParticleBackground particleCount={50} connectionDistance={150} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl text-white mb-4 font-outfit">Process Flow Architecture</h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-inter">
            Our advanced processing pipeline ensures maximum efficiency, security, and reliability 
            for your business-critical operations.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-6 text-center hover:bg-slate-800/70 transition-all duration-300">
              <div className="text-2xl font-outfit mb-2" style={{ color: metric.color }}>
                {metric.value}
              </div>
              <div className="text-slate-400 font-inter">{metric.label}</div>
            </Card>
          ))}
        </div>

        {/* Process Flow Diagram */}
        <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 p-8 mb-8">
          <div className="relative">
            {/* Connection Lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
              {processSteps.map(step => 
                step.connections.map(connectionId => {
                  const fromIndex = step.id - 1;
                  const toIndex = connectionId - 1;
                  const fromRow = Math.floor(fromIndex / 3);
                  const fromCol = fromIndex % 3;
                  const toRow = Math.floor(toIndex / 3);
                  const toCol = toIndex % 3;
                  
                  const fromX = (fromCol * 33.33) + 16.665;
                  const fromY = (fromRow * 33.33) + 16.665;
                  const toX = (toCol * 33.33) + 16.665;
                  const toY = (toRow * 33.33) + 16.665;

                  return (
                    <line
                      key={`${step.id}-${connectionId}`}
                      x1={`${fromX}%`}
                      y1={`${fromY}%`}
                      x2={`${toX}%`}
                      y2={`${toY}%`}
                      stroke="#00BFA6"
                      strokeWidth="2"
                      strokeOpacity="0.4"
                      markerEnd="url(#arrowhead)"
                    />
                  );
                })
              )}
              <defs>
                <marker
                  id="arrowhead"
                  markerWidth="10"
                  markerHeight="7"
                  refX="9"
                  refY="3.5"
                  orient="auto"
                >
                  <polygon
                    points="0 0, 10 3.5, 0 7"
                    fill="#00BFA6"
                    fillOpacity="0.4"
                  />
                </marker>
              </defs>
            </svg>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative" style={{ zIndex: 2 }}>
              {processSteps.map((step, index) => (
                <div
                  key={step.id}
                  className="bg-slate-700/30 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300 relative"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-12 h-12 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}20` }}
                    >
                      <step.icon size={24} style={{ color: step.color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-outfit">{step.title}</h3>
                      <div 
                        className="text-sm font-inter"
                        style={{ color: step.color }}
                      >
                        Step {step.id}
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-300 font-inter leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Technical Specifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8">
            <h3 className="text-xl text-white mb-6 font-outfit">Infrastructure Details</h3>
            <div className="space-y-4">
              {[
                { label: "Load Balancers", value: "Multi-zone with auto-failover" },
                { label: "Database", value: "Distributed PostgreSQL clusters" },
                { label: "Cache Layer", value: "Redis with clustering support" },
                { label: "Message Queue", value: "Apache Kafka for real-time streaming" },
                { label: "Monitoring", value: "24/7 observability with alerts" }
              ].map((spec, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-slate-700/30">
                  <span className="text-slate-300 font-inter">{spec.label}</span>
                  <span className="text-[#00BFA6] font-inter">{spec.value}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8">
            <h3 className="text-xl text-white mb-6 font-outfit">Security & Compliance</h3>
            <div className="space-y-4">
              {[
                { label: "Encryption", value: "AES-256 end-to-end" },
                { label: "Authentication", value: "Multi-factor with SSO" },
                { label: "Compliance", value: "SOC 2, GDPR, HIPPAA" },
                { label: "Audit Logs", value: "Immutable transaction logs" },
                { label: "Backup", value: "Real-time with geo-replication" }
              ].map((spec, index) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-slate-700/30">
                  <span className="text-slate-300 font-inter">{spec.label}</span>
                  <span className="text-[#FF7F3F] font-inter">{spec.value}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
