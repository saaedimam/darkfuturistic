import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { ParticleBackground } from '../ParticleBackground';
import { Check, Star, Zap, Crown } from 'lucide-react';

export function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for small teams and startups",
      icon: Zap,
      color: "#00BFA6",
      popular: false,
      features: [
        "Up to 10,000 API calls/month",
        "Basic analytics dashboard",
        "Email support",
        "2 team members",
        "Standard security",
        "Basic integrations"
      ],
      buttonText: "Start Free Trial",
      buttonVariant: "outline" as const
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "Ideal for growing businesses",
      icon: Star,
      color: "#FF7F3F",
      popular: true,
      features: [
        "Up to 100,000 API calls/month",
        "Advanced analytics & reporting",
        "Priority support (24/7)",
        "10 team members",
        "Enhanced security features",
        "All integrations included",
        "Custom webhooks",
        "API rate limiting"
      ],
      buttonText: "Get Started",
      buttonVariant: "default" as const
    },
    {
      name: "Enterprise",
      price: "$299",
      period: "per month",
      description: "For large-scale operations",
      icon: Crown,
      color: "#8B5CF6",
      popular: false,
      features: [
        "Unlimited API calls",
        "Custom analytics solutions",
        "Dedicated support manager",
        "Unlimited team members",
        "Enterprise-grade security",
        "Custom integrations",
        "SLA guarantees",
        "White-label options",
        "On-premise deployment",
        "Custom training sessions"
      ],
      buttonText: "Contact Sales",
      buttonVariant: "outline" as const
    }
  ];

  const faqs = [
    {
      question: "Can I upgrade or downgrade my plan at any time?",
      answer: "Yes, you can change your plan at any time. Changes take effect immediately and billing is prorated."
    },
    {
      question: "What happens if I exceed my API limits?",
      answer: "We'll notify you when you approach your limits. You can upgrade your plan or purchase additional capacity."
    },
    {
      question: "Do you offer custom enterprise solutions?",
      answer: "Absolutely! Our enterprise team can create custom solutions tailored to your specific needs."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes, all plans come with a 14-day free trial. No credit card required to get started."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative pt-20">
      <ParticleBackground particleCount={40} connectionDistance={100} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl text-white mb-4 font-outfit">
            Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00BFA6] to-[#FF7F3F]">Perfect Plan</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto font-inter">
            Scale your business with our flexible pricing options. Start free and upgrade as you grow.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8 hover:bg-slate-800/70 transition-all duration-300 ${
                plan.popular ? 'border-[#FF7F3F]/50 shadow-lg shadow-[#FF7F3F]/20' : ''
              }`}
            >
              {plan.popular && (
                <Badge 
                  className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#FF7F3F] to-[#FF6B2B] text-white border-none"
                >
                  Most Popular
                </Badge>
              )}
              
              <div className="text-center mb-8">
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${plan.color}20` }}
                >
                  <plan.icon size={32} style={{ color: plan.color }} />
                </div>
                
                <h3 className="text-2xl text-white mb-2 font-outfit">{plan.name}</h3>
                <p className="text-slate-400 mb-4 font-inter">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl text-white font-outfit">{plan.price}</span>
                  <span className="text-slate-400 ml-2 font-inter">{plan.period}</span>
                </div>
                
                <Button 
                  variant={plan.buttonVariant}
                  className={`w-full py-6 font-inter ${
                    plan.buttonVariant === 'default' 
                      ? 'bg-gradient-to-r from-[#FF7F3F] to-[#FF6B2B] hover:from-[#FF6B2B] to-[#FF5722] text-white shadow-lg shadow-[#FF7F3F]/30' 
                      : `border-2 text-white hover:bg-slate-700/50`
                  }`}
                  style={plan.buttonVariant === 'outline' ? { borderColor: plan.color } : {}}
                >
                  {plan.buttonText}
                </Button>
              </div>

              <div className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <Check size={16} style={{ color: plan.color }} />
                    <span className="text-slate-300 font-inter">{feature}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Enterprise Features */}
        <Card className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50 p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl text-white mb-4 font-outfit">Enterprise Features</h2>
            <p className="text-slate-400 font-inter">Additional capabilities available for Enterprise customers</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Advanced Security",
                description: "SSO, SAML, custom authentication flows, and advanced encryption options",
                icon: "🔒"
              },
              {
                title: "Custom Integrations",
                description: "Dedicated integration team to connect with your existing systems",
                icon: "🔗"
              },
              {
                title: "Dedicated Support",
                description: "24/7 dedicated support manager and priority technical assistance",
                icon: "🎯"
              },
              {
                title: "SLA Guarantees",
                description: "99.99% uptime guarantee with compensation for any downtime",
                icon: "⚡"
              },
              {
                title: "Custom Analytics",
                description: "Tailored reporting and analytics solutions for your specific needs",
                icon: "📊"
              },
              {
                title: "Training & Onboarding",
                description: "Comprehensive training sessions and dedicated onboarding support",
                icon: "🎓"
              }
            ].map((feature, index) => (
              <div key={index} className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30">
                <div className="text-2xl mb-3">{feature.icon}</div>
                <h3 className="text-white mb-2 font-outfit">{feature.title}</h3>
                <p className="text-slate-400 font-inter">{feature.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl text-white mb-4 font-outfit">Frequently Asked Questions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, index) => (
              <div key={index} className="space-y-3">
                <h3 className="text-white font-outfit">{faq.question}</h3>
                <p className="text-slate-400 font-inter leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
