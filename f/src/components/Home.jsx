import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Truck,
  Shield,
  Zap,
  Wallet,
  ArrowRight,
  MapPin,
  Globe,
  Smartphone,
  Database,
  Headphones,
  SmartphoneNfc,
  FileCheck,
  Star,
  CheckCircle,
  UserCheck,
  Mail,
  TrendingUp,
  Users,
  Clock,
  Sparkles,
  Play
} from "lucide-react";

// Custom hook for scroll-triggered animations
const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [threshold]);

  return [ref, isVisible];
};

// Mouse parallax hook
const useMouseParallax = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return position;
};

const Home = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [currentFeature, setCurrentFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const mousePosition = useMouseParallax();

  // Scroll animation refs
  const [featuresRef, featuresVisible] = useScrollAnimation(0.1);
  const [testimonialsRef, testimonialsVisible] = useScrollAnimation(0.1);
  const [statsRef, statsVisible] = useScrollAnimation(0.1);
  const [footerRef, footerVisible] = useScrollAnimation(0.1);

  const fullText = "Empowering Indian Logistics with AI & Innovation";

  // Typing Animation
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.substring(0, i));
        i++;
      } else clearInterval(typing);
    }, 50);
    return () => clearInterval(typing);
  }, []);

  // Scroll tracking for parallax
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = (role = "shipper") => {
    navigate(`/signup?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-gradient-animated text-white overflow-hidden relative">

      {/* Full-page background (glowing blobs + grid) with parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute -top-60 -right-60 w-[800px] h-[800px] bg-gradient-to-br from-blue-500/20 to-cyan-500/10 rounded-full blur-3xl animate-float-slow transition-transform duration-300 ease-out" 
          style={{ transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30 - scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute top-40 -left-60 w-[700px] h-[700px] bg-gradient-to-br from-purple-500/15 to-pink-500/10 rounded-full blur-3xl animate-float transition-transform duration-300 ease-out" 
          style={{ transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20 - scrollY * 0.15}px)` }}
        />
        <div 
          className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-gradient-to-br from-cyan-400/15 to-emerald-400/10 rounded-full blur-3xl animate-float-reverse transition-transform duration-300 ease-out" 
          style={{ transform: `translate(${mousePosition.x * 25}px, ${mousePosition.y * 25 - scrollY * 0.05}px)` }}
        />
        <div 
          className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-violet-500/10 rounded-full blur-3xl animate-float-slow transition-transform duration-300 ease-out" 
          style={{ transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -15 - scrollY * 0.08}px)` }}
        />

        {/* grid lines with subtle parallax */}
        <div
          className="absolute inset-0 opacity-[0.03] transition-transform duration-500"
          style={{
            backgroundImage: `
              linear-gradient(to right, #fff 1px, transparent 1px),
              linear-gradient(to bottom, #fff 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: `translateY(${scrollY * 0.02}px)`,
          }}
        />
      </div>

      {/* PAGE CONTENT */}
      <div className="relative z-10">

        {/* HERO ────────────────────────────────────────────── */}
        <div className="pt-20 px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">

            {/* LEFT HERO */}
            <div className="animate-fade-in-up">
              <h1 className="text-6xl md:text-7xl font-bold leading-tight group">
                <span className="text-white hover:text-glow-blue transition-all duration-300">Bharat</span>
                <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-500 bg-clip-text text-transparent drop-shadow-md animate-gradient-shift bg-[length:200%_auto] hover:scale-105 inline-block transition-transform">Connect</span>
              </h1>

              <p className="pb-2 text-3xl md:text-4xl bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent font-medium tracking-wide animate-gradient-shift bg-[length:200%_auto]">
                Redefining Indian Logistics
              </p>

              <div className="text-2xl text-gray-300 mb-4 h-16 mt-8">
                {typedText}
                <span className="animate-blink text-cyan-400">|</span>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 items-center mt-6">
                <button
                  onClick={() => handleGetStarted("shipper")}
                  className="btn-shine px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 text-white font-semibold rounded-full hover:scale-110 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] transition-all duration-300 flex items-center group animate-glow-pulse"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-3 transition-transform duration-300" />
                </button>

                <Link
                  to="/viewvehicle"
                  className="btn-shine px-8 py-4 bg-white/5 border-2 border-white/20 text-white rounded-full hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-cyan-500/20 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)] transition-all duration-300 flex items-center group"
                >
                  <MapPin className="mr-3 w-5 h-5 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300 text-cyan-400" />
                  Explore Network
                </Link>
              </div>

              {/* Highlights */}
              <div className="mt-10 flex items-center space-x-6">
                <div className="flex items-center group px-4 py-2 rounded-full bg-white/5 hover:bg-emerald-500/20 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all duration-300 cursor-pointer">
                  <Shield className="w-5 h-5 text-emerald-400 mr-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                  <span className="text-sm text-gray-400 group-hover:text-emerald-300 transition-colors duration-300 font-medium">100% Secure</span>
                </div>
                <div className="flex items-center group px-4 py-2 rounded-full bg-white/5 hover:bg-amber-500/20 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all duration-300 cursor-pointer">
                  <Zap className="w-5 h-5 text-amber-400 mr-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                  <span className="text-sm text-gray-400 group-hover:text-amber-300 transition-colors duration-300 font-medium">AI-Powered</span>
                </div>
                <div className="flex items-center group px-4 py-2 rounded-full bg-white/5 hover:bg-blue-500/20 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 cursor-pointer">
                  <Wallet className="w-5 h-5 text-blue-400 mr-2 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                  <span className="text-sm text-gray-400 group-hover:text-blue-300 transition-colors duration-300 font-medium">Transparent Pricing</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - MODERN LOGISTICS IMAGE WITH OVERLAY */}
            <div className="relative lg:ml-8 group animate-slide-in-right">
              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl group hover:shadow-[0_0_60px_rgba(59,130,246,0.3)] transition-all duration-500">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-cyan-500/20" />
                
                {/* Main logistics image */}
                <div className="relative h-96 w-full">
                  {/* Placeholder for actual image - using a logistics-themed background */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 group-hover:scale-105 transition-transform duration-700"
                    style={{
                      backgroundImage: `url('/logic.JPG')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundBlendMode: 'overlay'
                    }}
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />
                  
                  {/* Floating UI elements overlay */}
                  <div className="absolute top-6 left-6">
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-3 shadow-lg hover:scale-105 transition-transform">
                      <div className="flex items-center gap-2">
                        <Truck className="w-6 h-6 text-white" />
                        <span className="text-white font-bold text-sm">1.2k Active</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent p-6">
                    <div className="flex items-center justify-between">
                      <div className="text-center group">
                        <p className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">98%</p>
                        <p className="text-xs text-gray-300 group-hover:text-blue-300 transition-colors">Accuracy</p>
                      </div>
                      <div className="text-center group">
                        <p className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">35%</p>
                        <p className="text-xs text-gray-300 group-hover:text-blue-300 transition-colors">Faster</p>
                      </div>
                      <div className="text-center group">
                        <p className="text-2xl font-bold text-white group-hover:scale-110 transition-transform">24/7</p>
                        <p className="text-xs text-gray-300 group-hover:text-blue-300 transition-colors">Tracking</p>
                      </div>
                    </div>
                  </div>
                 
                </div>
                
                {/* Decorative border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/30 rounded-2xl transition-all duration-300" />
              </div>
              
              {/* Small floating cards around the main image */}
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-xl p-4 border border-cyan-400/30 shadow-lg max-w-[180px] hover:-translate-y-3 hover:scale-110 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] animate-float-slow">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">AI Powered</p>
                    <p className="text-sm font-bold text-white">Real-time</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-4 -right-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-4 border border-purple-400/30 shadow-lg max-w-[180px] hover:-translate-y-3 hover:scale-110 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center group-hover:rotate-12 transition-transform">
                    <TrendingUp className="w-4 h-4 text-purple-300" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">Network</p>
                    <p className="text-sm font-bold text-white">500+ Cities</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* FEATURES  */}
        <div 
          ref={featuresRef}
          className={`max-w-7xl mx-auto mt-24 px-4 transition-all duration-1000 ${
            featuresVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >

   <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent drop-shadow mb-8 
               hover:scale-110 transition-transform duration-500 mx-auto block animate-gradient-shift bg-[length:200%_auto] text-glow-blue">
  Transforming Logistics with Technology
</h2>


          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-16 hover:text-cyan-200 transition-colors duration-500 text-lg leading-relaxed">
            BharatConnect bridges shippers and transporters using AI-powered
            tools, smart tracking, optimization engines, and deep logistics insights.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"> 

            {/* card 1 */}
            <FeatureCard
              delay={0}
              isVisible={featuresVisible}
              icon={<MapPin className="w-8 h-8 text-blue-400 group-hover:rotate-[360deg] transition-all duration-700" />}
              title="Smart Route Planning"
              desc="AI suggests the most fuel-efficient and fastest routes instantly."
              border="border-blue-500/30"
              glow="hover:shadow-[0_0_50px_rgba(59,130,246,0.4)]"
              gradient="from-blue-500/20 to-cyan-500/20"
            /> 

            {/* card 2 */}
            <FeatureCard
              delay={100}
              isVisible={featuresVisible}
              icon={<Truck className="w-8 h-8 text-cyan-400 group-hover:rotate-[360deg] transition-all duration-700" />}
              title="Fleet Optimization"
              desc="Deploy vehicles efficiently using demand prediction."
              border="border-cyan-500/30"
              glow="hover:shadow-[0_0_50px_rgba(34,211,238,0.4)]"
              gradient="from-cyan-500/20 to-teal-500/20"
            />

            {/* card 3 */}
            <FeatureCard
              delay={200}
              isVisible={featuresVisible}
              icon={<Globe className="w-8 h-8 text-purple-400 group-hover:rotate-[360deg] transition-all duration-700" />}
              title="Nationwide Network"
              desc="Connect with trusted transporters across India."
              border="border-purple-500/30"
              glow="hover:shadow-[0_0_50px_rgba(168,85,247,0.4)]"
              gradient="from-purple-500/20 to-pink-500/20"
            />

            {/* card 4 */}
            <FeatureCard
              delay={300}
              isVisible={featuresVisible}
              icon={<Zap className="w-8 h-8 text-amber-400 group-hover:rotate-[360deg] transition-all duration-700" />}
              title="Real-Time Tracking"
              desc="Live GPS tracking with intelligent movement alerts."
              border="border-amber-500/30"
              glow="hover:shadow-[0_0_50px_rgba(245,158,11,0.4)]"
              gradient="from-amber-500/20 to-orange-500/20"
            />

            {/* card 5 */}
            <FeatureCard
              delay={400}
              isVisible={featuresVisible}
              icon={<Shield className="w-8 h-8 text-emerald-400 group-hover:rotate-[360deg] transition-all duration-700" />}
              title="Secure & Verified"
              desc="All accounts verified for authenticity and safety."
              border="border-emerald-500/30"
              glow="hover:shadow-[0_0_50px_rgba(16,185,129,0.4)]"
              gradient="from-emerald-500/20 to-green-500/20"
            />

            {/* card 6 */}
            <FeatureCard
              delay={500}
              isVisible={featuresVisible}
              icon={<Wallet className="w-8 h-8 text-rose-400 group-hover:rotate-[360deg] transition-all duration-700" />}
              title="Transparent Pricing"
              desc="Pay only for the distance you travel. No surprises."
              border="border-rose-500/30"
              glow="hover:shadow-[0_0_50px_rgba(244,63,94,0.4)]"
              gradient="from-rose-500/20 to-pink-500/20"
            />

          </div>
        </div>

        {/*TESTIMONIALS*/}
        <div 
          ref={testimonialsRef}
          className={`mt-40 max-w-7xl mx-auto px-4 transition-all duration-1000 ${
            testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow mb-6 hover:scale-110 transition-transform duration-500 inline-block animate-gradient-shift bg-[length:200%_auto]">
              Trusted by Industry Leaders
            </h2>
            
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-12 leading-relaxed hover:text-blue-200 transition-colors duration-500">
              Transporters, logistics managers, and shippers trust BharatConnect
              to simplify operations and deliver excellence.
            </p>
          </div>

          {/* Stats Bar */}
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div 
              className={`glass-card rounded-2xl p-6 hover:border-blue-400/50 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)] transition-all duration-700 group ${
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '0ms' }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 animate-glow-pulse">
                  <TrendingUp className="w-7 h-7 text-blue-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">10,000+</p>
                  <p className="text-gray-400 group-hover:text-blue-300 transition-colors duration-300">Active Vehicles</p>
                </div>
              </div>
            </div>
            
            <div 
              className={`glass-card rounded-2xl p-6 hover:border-emerald-400/50 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] transition-all duration-700 group ${
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '150ms' }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500/30 to-green-500/30 flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 animate-glow-pulse-cyan">
                  <Users className="w-7 h-7 text-emerald-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">5,000+</p>
                  <p className="text-gray-400 group-hover:text-emerald-300 transition-colors duration-300">Happy Clients</p>
                </div>
              </div>
            </div>
            
            <div 
              className={`glass-card rounded-2xl p-6 hover:border-purple-400/50 hover:-translate-y-3 hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] transition-all duration-700 group ${
                statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 animate-glow-pulse-purple">
                  <Clock className="w-7 h-7 text-purple-400" />
                </div>
                <div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">24/7</p>
                  <p className="text-gray-400 group-hover:text-purple-300 transition-colors duration-300">Support Available</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial Cards */}
         <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow mb-10 animate-gradient-shift bg-[length:200%_auto]">
  Testimonials
</h1>


          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <TestimonialCard
              text="Booking a truck now takes seconds. AI route planning is extremely accurate! Our delivery efficiency has improved by 60%."
              img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
              name="Rohit Sharma"
              role="Shipper • Delhi"
              rating={5}
              company="Delhi Transport Co."
            />

            <TestimonialCard
              text="I get more bookings and better trip planning. My income has doubled! The platform is incredibly user-friendly."
              img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
              name="Mahesh Yadav"
              role="Driver • Jaipur"
              rating={5}
              company="Independent Transporter"
            />

            <TestimonialCard
              text="Excellent tracking system. Our logistics team relies on it daily. The real-time updates have transformed our operations."
              // Fixed the image URL - using a reliable Unsplash image
              img="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face"
              name="Sneha Patel"
              role="Logistics Manager • Mumbai"
              rating={5}
              company="Mumbai Logistics Pvt Ltd"
            />

          </div>
        </div>

        {/* FOOTER*/}
        <footer 
          ref={footerRef}
          className={`mt-40 py-20 bg-gradient-to-b from-transparent via-gray-900/80 to-gray-950 backdrop-blur-xl border-t border-white/10 px-6 relative overflow-hidden transition-all duration-1000 ${
            footerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
          }`}
        >
          
          {/* Animated Background Effects */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-cyan-500/5 rounded-full blur-3xl animate-float-slow" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/10 to-pink-500/5 rounded-full blur-3xl animate-float" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/5 to-violet-500/5 rounded-full blur-3xl animate-float-reverse" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Main Footer Content */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
              
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6 group cursor-pointer">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] animate-glow-pulse">
                    <Truck className="w-9 h-9 text-white" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white group-hover:scale-105 transition-transform inline-block">
                      Bharat<span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-gradient-shift bg-[length:200%_auto]">Connect</span>
                    </h1> 
                    <p className="text-sm text-gray-400 group-hover:text-cyan-300 transition-colors duration-300">Swadeshi Logistics Network</p>
                  </div>
                </div>
                <p className="text-gray-400 mb-8 max-w-md hover:text-gray-200 transition-colors duration-300 leading-relaxed">
                  AI-powered logistics connecting India's transport ecosystem with cutting-edge technology,
                  real-time tracking, and intelligent optimization.
                </p>
               
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2 group cursor-pointer">
                  <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/40 transition-all duration-300">
                    <MapPin className="w-5 h-5 text-blue-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <span className="group-hover:text-blue-300 transition-colors duration-300">Quick Links</span>
                </h3>
                <ul className="space-y-4">
                  {[
                    { label: "Home", link: "/" },
                    { label: "Browse Vehicles", link: "/viewvehicle" },
                    { label: "Book Transport", link: "/bookvehicle" },
                    { label: "Checkout", link: "/checkout" },
                    { label: "SignUp", link: "/signup" },
                  ].map((item, idx) => (
                    <li key={idx}>
                      <Link
                        to={item.link}
                        className="text-gray-400 hover:text-cyan-300 transition-all duration-300 flex items-center group link-underline"
                      >
                        <ArrowRight className="w-4 h-4 mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 text-cyan-400" />
                        <span className="group-hover:translate-x-2 transition-transform duration-300">{item.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Features */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2 group cursor-pointer">
                  <div className="p-2 rounded-lg bg-amber-500/20 group-hover:bg-amber-500/40 transition-all duration-300">
                    <Zap className="w-5 h-5 text-amber-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <span className="group-hover:text-amber-300 transition-colors duration-300">Features</span>
                </h3>
                <ul className="space-y-4">
                  {[
                    "AI Route Optimization",
                    "Live GPS Tracking",
                    "Smart Vehicle Matching",
                    "Predictive Analytics",
                    "Secure Payments"
                  ].map((feature, idx) => (
                    <li key={idx} className="text-gray-400 hover:text-emerald-300 transition-all duration-300 flex items-center group cursor-pointer">
                      <CheckCircle className="w-4 h-4 mr-3 text-emerald-400 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                      <span className="group-hover:translate-x-2 transition-transform duration-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2 group cursor-pointer">
                  <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/40 transition-all duration-300">
                    <Headphones className="w-5 h-5 text-purple-400 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300" />
                  </div>
                  <span className="group-hover:text-purple-300 transition-colors duration-300">Contact Us</span>
                </h3>
                <ul className="space-y-4">
                  <li className="text-gray-400 hover:text-blue-300 transition-all duration-300 flex items-start group cursor-pointer">
                    <div className="p-2 rounded-lg bg-blue-500/20 group-hover:bg-blue-500/40 transition-all duration-300 mr-3">
                      <Headphones className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="group-hover:translate-x-1 transition-transform duration-300">
                      <p className="font-medium text-white">Support</p>
                      <p className="text-sm">1800-XXX-XXXX</p>
                      <p className="text-xs text-gray-500 group-hover:text-blue-300 transition-colors duration-300">Mon-Sun, 24/7</p>
                    </div>
                  </li>
                  <li className="text-gray-400 hover:text-emerald-300 transition-all duration-300 flex items-start group cursor-pointer">
                    <div className="p-2 rounded-lg bg-emerald-500/20 group-hover:bg-emerald-500/40 transition-all duration-300 mr-3">
                      <Mail className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="group-hover:translate-x-1 transition-transform duration-300">
                      <p className="font-medium text-white">Email</p>
                      <p className="text-sm group-hover:text-emerald-300 transition-colors duration-300">support@bharatconnect.in</p>
                    </div>
                  </li>
                  <li className="text-gray-400 hover:text-amber-300 transition-all duration-300 flex items-start group cursor-pointer">
                    <div className="p-2 rounded-lg bg-amber-500/20 group-hover:bg-amber-500/40 transition-all duration-300 mr-3">
                      <SmartphoneNfc className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <div className="group-hover:translate-x-1 transition-transform duration-300">
                      <p className="font-medium text-white">Mobile App</p>
                      <p className="text-sm">Coming Soon</p>
                      <p className="text-xs text-gray-500 group-hover:text-amber-300 transition-colors duration-300">iOS & Android</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center gap-6 mb-4 md:mb-0">
                <p className="text-gray-400 text-sm hover:text-cyan-300 transition-colors duration-300 cursor-pointer">
                  © {new Date().getFullYear()} BharatConnect. All Rights Reserved.
                </p>
                <div className="flex items-center gap-2 group cursor-pointer px-3 py-1 rounded-full bg-white/5 hover:bg-emerald-500/20 transition-all duration-300">
                  <Shield className="w-4 h-4 text-emerald-400 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300" />
                  <span className="text-xs text-gray-500 group-hover:text-emerald-300 transition-colors duration-300">ISO 27001 Certified</span>
                </div>
              </div>
              
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-sm text-gray-400 group-hover:text-emerald-300 transition-colors duration-300">All systems operational</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <Link to="/privacy" className="text-sm text-gray-400 hover:text-cyan-300 transition-all duration-300 hover:scale-110 inline-block link-underline">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="text-sm text-gray-400 hover:text-purple-300 transition-all duration-300 hover:scale-110 inline-block link-underline">
                    Terms of Service
                  </Link>
                  <Link to="/cookies" className="text-sm text-gray-400 hover:text-amber-300 transition-all duration-300 hover:scale-110 inline-block link-underline">
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, desc, border, glow, gradient, delay = 0, isVisible = true }) => (
  <div
    className={`glass-card hover-lift p-8 rounded-2xl border-2 ${border}
                transition-all duration-700 ${glow}
                text-center group relative overflow-hidden
                ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
    style={{ transitionDelay: `${delay}ms` }}
  >
    {/* Background gradient overlay */}
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient || 'from-blue-500/10 to-purple-500/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
    
    {/* Shimmer effect */}
    <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100" />
    
    <div className="relative z-10">
      <div className="mx-auto mb-6 bg-gradient-to-br from-white/10 to-white/5 p-5 rounded-2xl w-20 h-20 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-500 border border-white/10 group-hover:border-white/30">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-white mb-3 text-center group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-cyan-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
        {title}
      </h3>

      <p className="text-gray-400 text-center group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">{desc}</p>
    </div>
  </div>
);


// TESTIMONIAL CARD COMPONENT
const TestimonialCard = ({ text, img, name, role, rating = 5, company }) => (
  <div className="group relative glass-card rounded-2xl p-8 transition-all duration-500 hover:-translate-y-4 hover:border-purple-400/50 hover:shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden">
    
    {/* Animated background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    
    {/* Top quote mark */}
    <div className="absolute top-6 right-6 text-7xl bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-500">"</div>
    
    {/* Rating */}
    <div className="flex gap-1 mb-6 relative z-10">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'} group-hover:scale-125 transition-all duration-300`}
          style={{ transitionDelay: `${i * 50}ms` }}
        />
      ))}
    </div>
    
    {/* Testimonial text */}
    <p className="text-gray-300 italic leading-relaxed mb-8 relative z-10 group-hover:text-white transition-colors duration-300">"{text}"</p>
    
    {/* User info */}
    <div className="flex items-center relative z-10">
      <div className="relative">
        <img
          src={img}
          alt={name}
          className="w-16 h-16 rounded-full border-3 border-purple-400/50 object-cover group-hover:border-cyan-400 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)]"
        />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-400 rounded-full border-2 border-gray-900 flex items-center justify-center group-hover:scale-150 transition-transform duration-300 animate-bounce-scale">
          <UserCheck className="w-3 h-3 text-white" />
        </div>
      </div>
      <div className="ml-4">
        <h4 className="text-white font-bold group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-purple-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">{name}</h4>
        <p className="text-gray-400 text-sm group-hover:text-blue-200 transition-colors duration-300">{role}</p>
        {company && <p className="text-purple-300 text-sm font-medium group-hover:text-cyan-300 transition-colors duration-300">{company}</p>}
      </div>
    </div>
    
    {/* Bottom decorative gradient line */}
    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>
);

export default Home;