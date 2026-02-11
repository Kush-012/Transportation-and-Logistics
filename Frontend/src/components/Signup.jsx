import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    otp: "",
    role: "shipper",
  });

  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Auto-hide message after 2 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const requestOTP = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post("http://localhost:4500/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      setStep(2);
      setMessage("OTP sent to your email.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Server error");
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:4500/signup", form);
      sessionStorage.setItem("token", res.data.token);
      setMessage("Signup Successful! Redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP");
    }
  };

  const selectRole = (role) => {
    setForm({ ...form, role });
  };

  return (
    <>
      {message && (
        <div
          className={`fixed top-24 right-6 px-6 py-3 rounded-xl shadow-xl text-white font-semibold z-50 animate-fadeIn 
            ${message.includes("Successful") || message.includes("OTP sent") 
              ? "bg-green-500" 
              : "bg-red-500"}`}
        >
          {message}
        </div>
      )}

      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 px-4">
        <div 
          className="flex bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-700"
          style={{ height: "580px", maxWidth: "950px" }}
        >
          {/* LEFT — Form Section */}
          <div className="w-110 p-8 flex flex-col justify-center bg-gray-800/80">
            <div className="text-center mb-6">
              <h2 className="text-white text-2xl font-bold mb-1">Create Account</h2>
              <p className="text-gray-400 text-sm">Join our logistics platform</p>
            </div>

            {/* Role Selection */}
            <div className="flex mb-4 bg-gray-700/50 rounded-lg p-1">
              <button
                type="button"
                onClick={() => selectRole("shipper")}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  form.role === "shipper"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <span>Shipper</span>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => selectRole("driver")}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  form.role === "driver"
                    ? "bg-green-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                  <span>Driver</span>
                </div>
              </button>
            </div>

            {/* Role Description */}
            <div className="mb-4 p-3 bg-gray-700/30 rounded-lg border border-gray-600/30">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  form.role === "shipper" ? "bg-blue-500/20" : "bg-green-500/20"
                }`}>
                  <svg className={`w-4 h-4 ${
                    form.role === "shipper" ? "text-blue-400" : "text-green-400"
                  }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {form.role === "shipper" ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                    )}
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-sm font-medium">
                    {form.role === "shipper" ? "Shipper Account" : "Driver Account"}
                  </h3>
                  <p className="text-gray-400 text-xs">
                    {form.role === "shipper" 
                      ? "Ship goods, track shipments, and manage logistics operations."
                      : "Accept delivery jobs, manage routes, and track your earnings."
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* STEP 1: User Details */}
            {step === 1 && (
              <form onSubmit={requestOTP} className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-700/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-700/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-300 text-xs font-medium mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2.5 bg-gray-700/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`w-full py-2.5 text-white font-semibold rounded-lg shadow hover:shadow-md transition-all duration-200 text-sm ${
                    form.role === "shipper" 
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800" 
                      : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                  }`}
                >
                  Send OTP
                </button>
              </form>
            )}

            {/* STEP 2: OTP Verification */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="text-center p-4 bg-gray-700/30 rounded-lg border border-gray-600/30">
                  <div className="w-12 h-12 mx-auto mb-3 bg-blue-500/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-white text-sm font-bold mb-1">Check Your Email</h3>
                  <p className="text-gray-400 text-xs">
                    OTP sent to: <span className="text-blue-400">{form.email}</span>
                  </p>
                </div>

                <form onSubmit={verifyOTP} className="space-y-4">
                  <div>
                    <label className="block text-gray-300 text-xs font-medium mb-1">
                      Enter OTP
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <input
                        type="text"
                        name="otp"
                        placeholder="Enter 6-digit OTP"
                        value={form.otp}
                        onChange={handleChange}
                        required
                        maxLength="6"
                        className="w-full pl-10 pr-3 py-2.5 bg-gray-700/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-transparent text-sm text-center tracking-widest"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg shadow hover:shadow-md transition-all duration-200 text-sm"
                  >
                    Verify OTP & Create Account
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-full py-2 text-gray-400 hover:text-white text-xs font-medium transition duration-200"
                  >
                    ← Back to details
                  </button>
                </form>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-500 text-xs">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium">
                  Login here
                </Link>
              </p>
            </div>
          </div>

          {/* RIGHT — Same Image as Login Page */}
          <div className="w-110 relative overflow-hidden">
            {/* Same Background Image as Login Page */}
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Transportation Logistics"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-800/50 to-transparent"></div>
            </div>

            {/* Same Content Overlay as Login Page */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8 text-white">
              <div className="mb-8">
                <h3 className="text-3xl font-bold mb-4">Global Logistics Platform</h3>
                <p className="text-blue-100 mb-6">
                  Streamline your supply chain with cutting-edge transportation management
                </p>
                
                {/* Same Features Grid as Login Page */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-sm">Real-time Tracking</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                      </svg>
                    </div>
                    <span className="text-sm">Fleet Management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <span className="text-sm">Warehouse Ops</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="text-sm">Analytics</span>
                  </div>
                </div>
              </div>

              {/* Same Stats as Login Page */}
              <div className="flex justify-between border-t border-white/20 pt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <div className="text-sm text-blue-200">Active Vehicles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">24/7</div>
                  <div className="text-sm text-blue-200">Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">50+</div>
                  <div className="text-sm text-blue-200">Countries</div>
                </div>
              </div>
            </div>

            {/* Same Logo/Watermark as Login Page */}
            <div className="absolute top-6 left-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <span className="text-white font-bold text-lg">BharatConnect</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}