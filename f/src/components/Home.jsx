import React, { useState, useEffect } from "react";
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

const Home = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [currentFeature, setCurrentFeature] = useState(0);

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

  const handleGetStarted = (role = "shipper") => {
    navigate(`/signup?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-900 to-blue-950 text-white overflow-hidden relative">

      {/* Full-page background (glowing blobs + grid) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-60 -right-60 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-40 -left-60 w-[700px] h-[700px] bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '10s' }} />
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }} />

        {/* grid lines */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #fff 1px, transparent 1px),
              linear-gradient(to bottom, #fff 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* PAGE CONTENT */}
      <div className="relative z-10">

        {/* HERO ────────────────────────────────────────────── */}
        <div className="pt-16 sm:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 pb-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl mx-auto">

            {/* LEFT HERO */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
                  <span className="text-white block">Bharat</span>
                  <span className="text-blue-400 block">Connect</span>
                </h1>
              </div>

              <div>
                <p className="text-2xl sm:text-3xl lg:text-4xl bg-linear-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent font-medium tracking-tight">
                  Redefining Indian Logistics
                </p>
              </div>

              <div className="h-auto sm:h-16 py-2 sm:py-0">
                <p className="text-lg sm:text-2xl text-gray-300 font-medium leading-relaxed">
                  {typedText}
                  <span className="animate-pulse ml-1">|</span>
                </p>
              </div>

              {/* Buttons */}
              <div className="flex flex-col xs:flex-row gap-4 items-start sm:items-center pt-4">
                <button
                  onClick={() => handleGetStarted("shipper")}
                  className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-linear-to-r from-blue-400 to-blue-700 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300 flex items-center justify-center group active:scale-95"
                  aria-label="Get started button"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>

                <Link
                  to="/viewvehicle"
                  className="w-full sm:w-auto px-8 py-3 sm:py-4 bg-white/5 border border-white/20 text-white rounded-full hover:bg-white/10 hover:border-white/40 transition-all duration-300 flex items-center justify-center group active:scale-95"
                  aria-label="Explore network link"
                >
                  <MapPin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span>Explore Network</span>
                </Link>
              </div>

              {/* Highlights */}
              <div className="pt-4 flex flex-col xs:flex-row gap-4 sm:gap-6 flex-wrap">
                <div className="flex items-center group">
                  <Shield className="w-5 h-5 text-green-300 mr-2 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-gray-400 group-hover:text-green-300 transition-colors">100% Secure</span>
                </div>
                <div className="flex items-center group">
                  <Zap className="w-5 h-5 text-amber-100 mr-2 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-gray-400 group-hover:text-amber-100 transition-colors">AI-Powered</span>
                </div>
                <div className="flex items-center group">
                  <Wallet className="w-5 h-5 text-blue-400 mr-2 shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-sm text-gray-400 group-hover:text-blue-400 transition-colors">Transparent Pricing</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - MODERN LOGISTICS IMAGE WITH OVERLAY */}
            <div className="relative mt-8 lg:mt-0 group">
              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 via-purple-500/10 to-cyan-500/20 z-10" />
                
                {/* Main logistics image */}
                <div className="relative h-80 sm:h-96 w-full bg-linear-to-br from-gray-800 to-gray-900 overflow-hidden">
                  {/* Image placeholder */}
                  <div 
                    className="absolute inset-0 group-hover:scale-105 transition-transform duration-700"
                    style={{
                      backgroundImage: `url('/logic.JPG')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundBlendMode: 'overlay'
                    }}
                  />
                  
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/60 to-transparent" />
                  
                  {/* Floating UI elements overlay */}
                  <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
                    <div className="bg-linear-to-r from-blue-500 to-cyan-500 rounded-xl p-3 shadow-lg hover:scale-105 transition-transform">
                      <div className="flex items-center gap-2">
                        <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        <span className="text-white font-bold text-xs sm:text-sm">1.2k Active</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Stats overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-gray-900 to-transparent p-4 sm:p-6 z-20">
                    <div className="flex items-center justify-between gap-3 sm:gap-0">
                      <div className="text-center">
                        <p className="text-xl sm:text-2xl font-bold text-white">98%</p>
                        <p className="text-xs text-gray-300">Accuracy</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl sm:text-2xl font-bold text-white">35%</p>
                        <p className="text-xs text-gray-300">Faster</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl sm:text-2xl font-bold text-white">24/7</p>
                        <p className="text-xs text-gray-300">Tracking</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative border effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400/30 rounded-2xl transition-all duration-300" />
              </div>
              
              {/* Small floating cards around the main image */}
              <div className="hidden sm:block absolute -bottom-4 -left-4 bg-linear-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-lg rounded-xl p-4 border border-cyan-400/30 shadow-lg max-w-[180px] hover:-translate-y-1 hover:scale-105 transition-all duration-300 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center group-hover:rotate-12 transition-transform shrink-0">
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-300">AI Powered</p>
                    <p className="text-sm font-bold text-white">Real-time</p>
                  </div>
                </div>
              </div>
              
              <div className="hidden sm:block absolute -top-4 -right-4 bg-linear-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-4 border border-purple-400/30 shadow-lg max-w-[180px] hover:-translate-y-1 hover:scale-105 transition-all duration-300 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-linear-to-br from-purple-500/30 to-pink-500/30 flex items-center justify-center group-hover:rotate-12 transition-transform shrink-0">
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

        {/* FEATURES SECTION */}
        <div className="max-w-7xl mx-auto mt-20 sm:mt-24 lg:mt-32 px-4 sm:px-6 lg:px-8 py-16">

          <div className="mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-center text-blue-300 drop-shadow mb-6 hover:scale-105 transition-transform duration-300">
              Transforming Logistics with Technology
            </h2>

            <p className="text-gray-300 text-base sm:text-lg text-center max-w-3xl mx-auto hover:text-blue-100 transition-colors duration-300 leading-relaxed">
              BharatConnect bridges shippers and transporters using AI-powered tools, smart tracking, optimization engines, and deep logistics insights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"> 

            {/* card 1 */}
            <FeatureCard
              icon={<MapPin className="w-8 h-8 text-blue-300 group-hover:rotate-12 transition-transform" />}
              title="Smart Route Planning"
              desc="AI suggests the most fuel-efficient and fastest routes instantly."
              border="border-blue-700/40"
              glow="hover:shadow-blue-500/40"
            /> 

            {/* card 2 */}
            <FeatureCard
              icon={<Truck className="w-8 h-8 text-cyan-300 group-hover:rotate-12 transition-transform" />}
              title="Fleet Optimization"
              desc="Deploy vehicles efficiently using demand prediction."
              border="border-cyan-700/40"
              glow="hover:shadow-cyan-400/40"
            />

            {/* card 3 */}
            <FeatureCard
              icon={<Globe className="w-8 h-8 text-purple-300 group-hover:rotate-12 transition-transform" />}
              title="Nationwide Network"
              desc="Connect with trusted transporters across India."
              border="border-purple-700/40"
              glow="hover:shadow-purple-500/40"
            />

            {/* card 4 */}
            <FeatureCard
              icon={<Zap className="w-8 h-8 text-amber-300 group-hover:rotate-12 transition-transform" />}
              title="Real-Time Tracking"
              desc="Live GPS tracking with intelligent movement alerts."
              border="border-amber-700/40"
              glow="hover:shadow-amber-400/40"
            />

            {/* card 5 */}
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-green-300 group-hover:rotate-12 transition-transform" />}
              title="Secure & Verified"
              desc="All accounts verified for authenticity and safety."
              border="border-green-700/40"
              glow="hover:shadow-green-400/40"
            />

            {/* card 6 */}
            <FeatureCard
              icon={<Wallet className="w-8 h-8 text-rose-300 group-hover:rotate-12 transition-transform" />}
              title="Transparent Pricing"
              desc="Pay only for the distance you travel. No surprises."
              border="border-red-700/40"
              glow="hover:shadow-red-400/40"
            />

          </div>
        </div>

        {/* TESTIMONIALS SECTION */}
        <div className="mt-20 sm:mt-32 lg:mt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-blue-300 drop-shadow mb-6 hover:scale-105 transition-transform duration-300">
              Trusted by Industry Leaders
            </h2>
            
            <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed hover:text-blue-100 transition-colors duration-300">
              Transporters, logistics managers, and shippers trust BharatConnect to simplify operations and deliver excellence.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            <StatsCard
              icon={<TrendingUp className="w-6 h-6 text-blue-300" />}
              number="10,000+"
              label="Active Vehicles"
              colorClass="blue"
            />
            
            <StatsCard
              icon={<Users className="w-6 h-6 text-green-300" />}
              number="5,000+"
              label="Happy Clients"
              colorClass="green"
            />
            
            <StatsCard
              icon={<Clock className="w-6 h-6 text-purple-300" />}
              number="24/7"
              label="Support Available"
              colorClass="purple"
            />
          </div>

          {/* Testimonials Heading */}
          <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center text-blue-300 drop-shadow mb-10 sm:mb-12">
            Testimonials
          </h3>

          {/* Testimonial Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            
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

        {/* FOOTER */}
        <footer className="mt-20 sm:mt-32 lg:mt-40 py-16 sm:py-20 bg-linear-to-b from-transparent to-gray-900/50 backdrop-blur-xl border-t border-white/10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
          
          {/* Background Effects */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-12 sm:mb-16">
              
              {/* Brand Section */}
              <div className="lg:col-span-2">
                <div className="flex items-center gap-4 mb-6 group">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-linear-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform shrink-0">
                    <Truck className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-medium text-white group-hover:scale-105 transition-transform inline-block">
                      Bharat<span className="text-blue-400">Connect</span>
                    </h1> 
                    <p className="text-xs sm:text-sm text-gray-400 group-hover:text-blue-300 transition-colors">Swadeshi Logistics Network</p>
                  </div>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6 sm:mb-8 max-w-md">
                  AI-powered logistics connecting India's transport ecosystem with cutting-edge technology, real-time tracking, and intelligent optimization.
                </p>
              </div>

              {/* Quick Links */}
              <FooterLinkSection
                title="Quick Links"
                icon={<MapPin className="w-5 h-5 text-blue-400" />}
                links={[
                  { label: "Home", link: "/" },
                  { label: "Browse Vehicles", link: "/viewvehicle" },
                  { label: "Book Transport", link: "/bookvehicle" },
                  { label: "Checkout", link: "/checkout" },
                  { label: "SignUp", link: "/signup" },
                ]}
              />

              {/* Features */}
              <FooterFeatureSection
                title="Features"
                icon={<Zap className="w-5 h-5 text-amber-400" />}
                features={[
                  "AI Route Optimization",
                  "Live GPS Tracking",
                  "Smart Vehicle Matching",
                  "Predictive Analytics",
                  "Secure Payments"
                ]}
              />

              {/* Contact Info */}
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-6 text-white flex items-center gap-2 group">
                  <Headphones className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
                  <span className="group-hover:scale-105 transition-transform inline-block">Contact Us</span>
                </h3>
                <ul className="space-y-4 text-sm">
                  <li className="text-gray-400 hover:text-white transition-colors flex items-start group">
                    <Headphones className="w-5 h-5 mr-3 text-blue-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium text-gray-300">Support</p>
                      <p className="text-xs sm:text-sm text-gray-400">1800-XXX-XXXX</p>
                      <p className="text-xs text-gray-500 group-hover:text-blue-300 transition-colors">Mon-Sun, 24/7</p>
                    </div>
                  </li>
                  <li className="text-gray-400 hover:text-white transition-colors flex items-start group">
                    <Mail className="w-5 h-5 mr-3 text-green-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium text-gray-300">Email</p>
                      <p className="text-xs sm:text-sm group-hover:text-green-300 transition-colors">support@bharatconnect.in</p>
                    </div>
                  </li>
                  <li className="text-gray-400 hover:text-white transition-colors flex items-start group">
                    <SmartphoneNfc className="w-5 h-5 mr-3 text-amber-400 mt-0.5 shrink-0 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-medium text-gray-300">Mobile App</p>
                      <p className="text-xs sm:text-sm text-gray-400">Coming Soon</p>
                      <p className="text-xs text-gray-500 group-hover:text-amber-300 transition-colors">iOS & Android</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between gap-6 sm:gap-4 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                <p className="text-gray-400 hover:text-blue-300 transition-colors">
                  © {new Date().getFullYear()} BharatConnect. All Rights Reserved.
                </p>
                <div className="flex items-center gap-2 group">
                  <Shield className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                  <span className="text-gray-500 group-hover:text-green-300 transition-colors">ISO 27001 Certified</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-8">
                <div className="flex items-center gap-2 group">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse group-hover:scale-150 transition-transform" />
                  <span className="text-gray-400 group-hover:text-green-300 transition-colors">All systems operational</span>
                </div>
                
                <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
                  <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors hover:scale-105 inline-block">
                    Privacy Policy
                  </Link>
                  <Link to="/terms" className="text-gray-400 hover:text-white transition-colors hover:scale-105 inline-block">
                    Terms of Service
                  </Link>
                  <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors hover:scale-105 inline-block">
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

const FeatureCard = ({ icon, title, desc, border, glow }) => (
  <div
    className={`bg-white/5 backdrop-blur-xl p-6 sm:p-8 rounded-xl border ${border} hover:-translate-y-2 transition-all duration-300 ${glow} text-center group hover:bg-white/10 h-full`}   
  >
    <div className="mx-auto mb-4 bg-white/10 p-3 sm:p-4 rounded-xl w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center group-hover:bg-white/20 transition-colors">
      {icon}
    </div>

    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2 sm:mb-3 group-hover:text-blue-300 transition-colors">
      {title}
    </h3>

    <p className="text-sm sm:text-base text-gray-300 group-hover:text-blue-100 transition-colors leading-relaxed">{desc}</p>
  </div>
);


const StatsCard = ({ icon, number, label, colorClass }) => (
  <div className={`bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10 hover:border-${colorClass}-400/30 transition-all duration-300 group hover:-translate-y-1`}>
    <div className="flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl bg-linear-to-br from-${colorClass}-500/20 to-${colorClass}-600/10 flex items-center justify-center group-hover:rotate-12 transition-transform`}>
        {icon}
      </div>
      <div>
        <p className="text-2xl sm:text-3xl font-bold text-white">
          {number}
        </p>
        <p className="text-xs sm:text-sm text-gray-400">{label}</p>
      </div>
    </div>
  </div>
);


const FooterLinkSection = ({ title, icon, links }) => (
  <div>
    <h3 className="text-lg sm:text-xl font-semibold mb-6 text-white flex items-center gap-2 group">
      {icon}
      <span className="group-hover:scale-105 transition-transform inline-block">{title}</span>
    </h3>
    <ul className="space-y-3 text-sm">
      {links.map((item, idx) => (
        <li key={idx}>
          <Link
            to={item.link}
            className="text-gray-400 hover:text-white transition-all flex items-center group"
          >
            <ArrowRight className="w-4 h-4 mr-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            <span className="group-hover:translate-x-1 transition-transform">{item.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);


const FooterFeatureSection = ({ title, icon, features }) => (
  <div>
    <h3 className="text-lg sm:text-xl font-semibold mb-6 text-white flex items-center gap-2 group">
      {icon}
      <span className="group-hover:scale-105 transition-transform inline-block">{title}</span>
    </h3>
    <ul className="space-y-3 text-sm">
      {features.map((feature, idx) => (
        <li key={idx} className="text-gray-400 hover:text-white transition-colors flex items-center group">
          <CheckCircle className="w-4 h-4 mr-3 text-green-400 group-hover:scale-110 transition-transform shrink-0" />
          <span className="group-hover:translate-x-1 transition-transform">{feature}</span>
        </li>
      ))}
    </ul>
  </div>
);


// TESTIMONIAL CARD COMPONENT
const TestimonialCard = ({ text, img, name, role, rating = 5, company }) => (
  <div className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 hover:border-blue-400/30 hover:bg-white/10 h-full flex flex-col">
    
    {/* Top quote mark */}
    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-4xl sm:text-6xl text-blue-500/20 group-hover:text-blue-400/30 transition-colors">"</div>
    
    {/* Rating */}
    <div className="flex gap-1 mb-4 sm:mb-6">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 sm:w-5 sm:h-5 ${i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-600'} group-hover:scale-110 transition-transform`}
        />
      ))}
    </div>
    
    {/* Testimonial text */}
    <p className="text-gray-200 text-sm sm:text-base italic leading-relaxed mb-6 sm:mb-8 relative z-10 group-hover:text-white transition-colors grow">"{text}"</p>
    
    {/* User information */}
    <div className="flex items-center pt-4 border-t border-white/10">
      <div className="relative">
        <img
          src={img}
          alt={name}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-blue-400/50 object-cover group-hover:border-blue-400 group-hover:scale-110 transition-all"
        />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-gray-900 flex items-center justify-center group-hover:scale-125 transition-transform shrink-0">
          <UserCheck className="w-3 h-3 text-white" />
        </div>
      </div>
      <div className="ml-3 sm:ml-4">
        <h4 className="text-sm sm:text-base text-white font-bold group-hover:text-blue-300 transition-colors">{name}</h4>
        <p className="text-xs sm:text-sm text-gray-400 group-hover:text-blue-100 transition-colors">{role}</p>
        {company && <p className="text-xs sm:text-sm text-blue-300 font-medium group-hover:text-blue-200 transition-colors">{company}</p>}
      </div>
    </div>
    
    {/* Bottom decorative element */}
    <div className="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  </div>
);

export default Home;