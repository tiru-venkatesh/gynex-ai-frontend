import React from 'react';
import { Button } from "@/app/components/ui/button";
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Zap, FileText, Search, MessageSquare, BarChart, Shield } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { motion } from "motion/react";
import { cn } from "@/app/components/ui/utils";

const features = [
  { icon: FileText, title: "OCR Engine", desc: "Extract text from scanned documents with 99% accuracy." },
  { icon: BarChart, title: "Image to Excel", desc: "Convert tables in images directly into editable spreadsheets." },
  { icon: Search, title: "Smart Search", desc: "Find any information across thousands of documents instantly." },
  { icon: MessageSquare, title: "Chat with Files", desc: "Interact with your PDFs using natural language AI chat." },
  { icon: Shield, title: "Secure & Private", desc: "Enterprise-grade encryption keeps your sensitive data safe." },
  { icon: Zap, title: "Automated Workflows", desc: "Set up triggers to process files as soon as they arrive." }
];

const pricing = [
  { name: "Starter", price: "$0", desc: "Perfect for individuals.", features: ["50 pages / month", "Basic OCR", "Email Support"] },
  { name: "Pro", price: "$29", desc: "For professionals.", popular: true, features: ["500 pages / month", "Advanced Tables", "Priority Support", "API Access"] },
  { name: "Enterprise", price: "Custom", desc: "For large teams.", features: ["Unlimited Processing", "Custom Models", "Dedicated Manager", "SLA & SSO"] }
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans selection:bg-[#FADADD] selection:text-[#111111]">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Gradients - Subtle Pink */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-[#FADADD]/30 to-transparent rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-t from-[#FADADD]/20 to-transparent rounded-full blur-[100px] -z-10" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAFA] border border-[#F0F0F0] text-[#F6A5C0] text-xs font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F6A5C0] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#F6A5C0]"></span>
              </span>
              v2.0 is live now
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-[#111111] tracking-tight leading-[1.1] mb-6">
              One AI Platform.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6A5C0] to-[#EC8AAE]">
                Infinite Possibilities.
              </span>
            </h1>
            <p className="text-lg text-[#666666] mb-8 max-w-lg leading-relaxed">
              Upload files, extract data, analyze documents, generate insights, and automate workflows using Gynex AI. The future of document intelligence is here.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/auth">
                <Button className="h-12 px-8 bg-[#F6A5C0] hover:bg-[#EC8AAE] text-white font-bold rounded-full text-base shadow-sm transition-all hover:scale-105 border-none">
                  Try Gynex Free
                </Button>
              </Link>
              <Button variant="outline" className="h-12 px-8 border-[#F0F0F0] bg-white text-[#666666] hover:bg-[#FAFAFA] hover:text-[#F6A5C0] hover:border-[#F6A5C0] rounded-full text-base transition-all">
                Watch Demo
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
             <div className="relative z-10 rounded-2xl overflow-hidden border border-[#F0F0F0] bg-white shadow-xl">
                <img 
                    src="https://images.unsplash.com/photo-1758598305014-2e8daf37b2b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMGJyaWdodCUyMG1vZGVybiUyMHNvZnR3YXJlJTIwZGFzaGJvYXJkJTIwbW9ja3VwJTIwb24lMjBsYXB0b3AlMjBzY3JlZW58ZW58MXx8fHwxNzcxMDEzMjQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                    alt="AI Visualization" 
                    className="w-full h-auto object-cover"
                />
                
                {/* Floating Cards UI Overlay Mockup */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-white/90 border border-[#F0F0F0] backdrop-blur-md shadow-lg">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-2 h-2 rounded-full bg-[#F6A5C0]"/>
                        <div className="w-2 h-2 rounded-full bg-gray-300"/>
                        <div className="w-2 h-2 rounded-full bg-gray-300"/>
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 bg-gray-100 rounded w-3/4 animate-pulse"></div>
                        <div className="h-2 bg-gray-100 rounded w-1/2 animate-pulse delay-75"></div>
                    </div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Logos */}
      <section className="py-10 border-y border-[#F0F0F0] bg-[#FAFAFA]">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm text-[#999999] mb-6 uppercase tracking-widest font-semibold">Trusted by industry leaders</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                {['Acme Corp', 'GlobalBank', 'TechNova', 'FutureSoft', 'DataFlow'].map(logo => (
                    <div key={logo} className="text-xl font-bold text-[#111111] cursor-default">{logo}</div>
                ))}
            </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-4">Powerful Tools for Modern Teams</h2>
                <p className="text-[#666666] max-w-2xl mx-auto text-lg">Everything you need to transform unstructured documents into actionable data.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, i) => (
                    <div key={i} className="group p-8 rounded-2xl bg-white border border-[#F0F0F0] hover:border-[#F6A5C0]/50 hover:shadow-lg hover:shadow-[#F6A5C0]/5 transition-all duration-300">
                        <div className="w-12 h-12 rounded-lg bg-[#FAFAFA] flex items-center justify-center text-[#666666] group-hover:bg-[#F6A5C0]/10 group-hover:text-[#F6A5C0] transition-colors mb-6">
                            <feature.icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-[#111111] mb-3">{feature.title}</h3>
                        <p className="text-[#666666] leading-relaxed">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 px-6 bg-[#FAFAFA] relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-16 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { step: "01", title: "Upload File", desc: "Drag and drop any PDF, Image, or Doc." },
                    { step: "02", title: "AI Processes", desc: "Our advanced models analyze and extract data." },
                    { step: "03", title: "Download Result", desc: "Get structured data in Excel, JSON, or Text." }
                ].map((item, i) => (
                    <div key={i} className="relative p-8 bg-white rounded-2xl border border-[#F0F0F0] shadow-sm">
                        <div className="text-6xl font-bold text-[#F0F0F0] absolute top-4 right-4 z-0 opacity-50">{item.step}</div>
                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold text-[#111111] mb-4">{item.title}</h3>
                            <p className="text-[#666666]">{item.desc}</p>
                        </div>
                        {i !== 2 && <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2 z-20 bg-white rounded-full p-1 border border-[#F0F0F0]">
                            <ArrowRight className="w-4 h-4 text-[#F6A5C0]" />
                        </div>}
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
             <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-bold text-[#111111] mb-4">Simple, Transparent Pricing</h2>
                <p className="text-[#666666]">Start for free, scale as you grow.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
                {pricing.map((plan, i) => (
                    <div key={i} className={cn(
                        "p-8 rounded-2xl border flex flex-col relative transition-all",
                        plan.popular 
                            ? "bg-white border-[#F6A5C0] shadow-xl shadow-[#F6A5C0]/10 scale-105 z-10" 
                            : "bg-[#FAFAFA] border-[#F0F0F0] hover:bg-white hover:shadow-md"
                    )}>
                        {plan.popular && (
                            <div className="absolute top-0 right-0 -mt-3 mr-6 bg-gradient-to-r from-[#F6A5C0] to-[#EC8AAE] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                Most Popular
                            </div>
                        )}
                        <h3 className="text-xl font-semibold text-[#111111] mb-2">{plan.name}</h3>
                        <div className="text-4xl font-bold text-[#111111] mb-2">{plan.price}</div>
                        <p className="text-[#666666] text-sm mb-6">{plan.desc}</p>
                        <ul className="space-y-4 mb-8 flex-1">
                            {plan.features.map((feat) => (
                                <li key={feat} className="flex items-center text-[#666666] text-sm">
                                    <Check className="w-4 h-4 text-[#F6A5C0] mr-3" />
                                    {feat}
                                </li>
                            ))}
                        </ul>
                        <Button className={cn(
                            "w-full rounded-full font-semibold border-none",
                            plan.popular 
                                ? "bg-[#F6A5C0] text-white hover:bg-[#EC8AAE]" 
                                : "bg-white border border-[#F0F0F0] text-[#111111] hover:border-[#F6A5C0] hover:text-[#F6A5C0]"
                        )}>
                            Choose {plan.name}
                        </Button>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-[#F0F0F0] bg-white text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
            <div>
                 <Link to="/" className="flex items-center justify-center md:justify-start gap-2 mb-4">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-[#FADADD] to-[#F6A5C0] flex items-center justify-center text-white font-bold text-xs">
                        G
                    </div>
                    <span className="text-lg font-bold text-[#111111]">GynexAI</span>
                </Link>
                <p className="text-sm text-[#666666]">
                    Empowering businesses with next-generation document intelligence.
                </p>
            </div>
            <div>
                <h4 className="text-[#111111] font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-sm text-[#666666]">
                    <li><Link to="#" className="hover:text-[#F6A5C0]">Features</Link></li>
                    <li><Link to="#" className="hover:text-[#F6A5C0]">Integrations</Link></li>
                    <li><Link to="#" className="hover:text-[#F6A5C0]">Pricing</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="text-[#111111] font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-[#666666]">
                    <li><Link to="#" className="hover:text-[#F6A5C0]">Documentation</Link></li>
                    <li><Link to="#" className="hover:text-[#F6A5C0]">API Reference</Link></li>
                    <li><Link to="#" className="hover:text-[#F6A5C0]">Blog</Link></li>
                </ul>
            </div>
            <div>
                <h4 className="text-[#111111] font-semibold mb-4">Legal</h4>
                <ul className="space-y-2 text-sm text-[#666666]">
                    <li><Link to="#" className="hover:text-[#F6A5C0]">Privacy Policy</Link></li>
                    <li><Link to="#" className="hover:text-[#F6A5C0]">Terms of Service</Link></li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-[#F0F0F0] text-center text-sm text-[#999999]">
            © 2026 Gynex AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
