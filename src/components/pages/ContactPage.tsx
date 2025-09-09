import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ParticleBackground } from '../ParticleBackground';
import { Mail, MessageCircle, Globe, MapPin, Calendar, ExternalLink } from 'lucide-react';

export function ContactPage() {
  const contactMethods = [
    {
      title: "Email",
      value: "sayedimam.fahim@gmail.com",
      icon: Mail,
      color: "#00BFA6",
      action: "mailto:sayedimam.fahim@gmail.com",
      description: "Best for detailed discussions and project inquiries"
    },
    {
      title: "WhatsApp",
      value: "+8801729809879",
      icon: MessageCircle,
      color: "#FF7F3F",
      action: "https://wa.me/8801729809879",
      description: "Quick messages and real-time communication"
    },
    {
      title: "Website",
      value: "www.stitchos.app",
      icon: Globe,
      color: "#3B82F6",
      action: "https://www.stitchos.app",
      description: "Explore StitchOS platform and capabilities"
    }
  ];

  const availability = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM", timezone: "GMT+6 (Dhaka)" },
    { day: "Saturday", hours: "10:00 AM - 2:00 PM", timezone: "GMT+6 (Dhaka)" },
    { day: "Sunday", hours: "By Appointment", timezone: "GMT+6 (Dhaka)" }
  ];

  const expertise = [
    "SaaS Platform Architecture",
    "RFID & IoT Integration",
    "Textile Industry Solutions",
    "Digital Transformation",
    "Mobile App Development",
    "Enterprise Software",
    "Cloud Infrastructure",
    "API Development"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative pt-20">
      <ParticleBackground particleCount={40} connectionDistance={100} />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl text-white mb-4 font-outfit">
            Let's Build{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4CAF50] to-[#66BB6A]">
              Together
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-inter">
            Ready to transform your business with innovative software solutions? 
            Let's discuss how we can build systems that compound value for your organization.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8 hover:bg-slate-800/70 transition-all duration-300 text-center">
              <div 
                className="w-16 h-16 mx-auto mb-6 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${method.color}20` }}
              >
                <method.icon size={28} style={{ color: method.color }} />
              </div>
              
              <h3 className="text-xl text-white mb-3 font-outfit">{method.title}</h3>
              <p className="text-slate-300 mb-4 font-inter">{method.description}</p>
              
              <div className="mb-6">
                <p className="font-inter" style={{ color: method.color }}>
                  {method.value}
                </p>
              </div>
              
              <Button 
                className="w-full font-inter"
                style={{ 
                  background: `linear-gradient(90deg, ${method.color}40, ${method.color})`,
                  borderColor: method.color
                }}
                onClick={() => window.open(method.action, '_blank')}
              >
                <ExternalLink className="mr-2" size={16} />
                Connect
              </Button>
            </Card>
          ))}
        </div>

        {/* Location & Availability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-[#00BFA6]" size={24} />
              <h3 className="text-2xl text-white font-outfit">Location</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                <h4 className="text-white mb-2 font-outfit">Based in Chittagong, Bangladesh</h4>
                <p className="text-slate-300 font-inter">
                  Working with clients globally, with extensive experience in USA and Canadian markets 
                  through textile export operations.
                </p>
              </div>
              
              {/* Google Maps Embed */}
              <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                <h4 className="text-white mb-3 font-outfit">Location Map</h4>
                <div className="w-full h-64 rounded-lg overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d465934.3469181049!2d91.13150919999999!3d22.329977049999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd8a64095dfd3%3A0x5015cc5bcb6905d9!2sChittagong%2C%20Bangladesh!5e0!3m2!1sen!2s!4v1642678901234!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
              
              <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                <h4 className="text-white mb-2 font-outfit">Remote Collaboration</h4>
                <p className="text-slate-300 font-inter">
                  Experienced in remote project management and global team coordination. 
                  Comfortable working across time zones.
                </p>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-[#FF7F3F]" size={24} />
              <h3 className="text-2xl text-white font-outfit">Availability</h3>
            </div>
            
            <div className="space-y-3">
              {availability.map((schedule, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-slate-700/30">
                  <div>
                    <div className="text-white font-inter">{schedule.day}</div>
                    <div className="text-sm text-slate-400 font-inter">{schedule.timezone}</div>
                  </div>
                  <div className="text-[#FF7F3F] font-inter">{schedule.hours}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
              <p className="text-slate-300 font-inter">
                <strong className="text-white">Urgent Projects:</strong> Available for emergency consultations 
                and critical system issues outside regular hours.
              </p>
            </div>
          </Card>
        </div>

        {/* Expertise Areas */}
        <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl text-white mb-4 font-outfit">Areas of Expertise</h2>
            <p className="text-slate-400 font-inter">Technologies and domains where I can add immediate value</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {expertise.map((skill, index) => (
              <div 
                key={index}
                className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 text-center hover:bg-slate-700/50 hover:border-slate-500/50 transition-all duration-300"
              >
                <span className="text-slate-300 font-inter">{skill}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm border-slate-600/50 p-8 text-center">
          <h2 className="text-2xl text-white mb-4 font-outfit">Ready to Start Your Project?</h2>
          <p className="text-slate-300 font-inter mb-8 max-w-2xl mx-auto">
            Whether you need a complete digital transformation, RFID integration, or a custom SaaS solution, 
            let's discuss how we can build systems that drive real business value.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-gradient-to-r from-[#00BFA6] to-[#00A693] hover:from-[#00A693] to-[#008A7B] text-white px-8 py-6 rounded-xl shadow-lg shadow-[#00BFA6]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#00BFA6]/40 font-inter"
              onClick={() => window.open('mailto:sayedimam.fahim@gmail.com?subject=Project Discussion', '_blank')}
            >
              <Mail className="mr-2" size={20} />
              Start a Project
            </Button>
            <Button 
              variant="outline"
              className="border-[#FF7F3F] text-[#FF7F3F] hover:bg-[#FF7F3F]/10 px-8 py-6 rounded-xl font-inter"
              onClick={() => window.open('https://wa.me/8801729809879?text=Hi%20Saaed,%20I%27d%20like%20to%20discuss%20a%20project', '_blank')}
            >
              <MessageCircle className="mr-2" size={20} />
              Quick Chat
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
