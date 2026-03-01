import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Truck,
  User,
  LogOut,
  KeyRound,
  ChevronDown,
  Package,
  MapPin,
  Home,
  Menu,
  X,
  ClipboardEdit,
  PlusCircle,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { userData, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getNavItems = (role) => {
    if (role === "driver") {
      return [
        { path: "/", name: "Home", icon: <Home className="w-5 h-5 text-white" /> },
        { path: "/addvehicle", name: "Add Vehicle", icon: <PlusCircle className="w-5 h-5 text-white" /> },
        { path: "/updatevehicle", name: "Update Vehicle", icon: <ClipboardEdit className="w-5 h-5 text-white" /> },
        { path: "/driverdashboard", name: "Dashboard", icon: <LayoutDashboard className="w-5 h-5 text-white" /> },
      ];
    }

    return [
      { path: "/", name: "Home", icon: <Home className="w-5 h-5 text-white" /> },
      { path: "/bookvehicle", name: "Book Transport", icon: <Package className="w-5 h-5 text-white" /> },
      { path: "/viewvehicle", name: "Vehicles", icon: <Truck className="w-5 h-5 text-white" /> },
      { path: "/shipperdashboard", name: "My Bookings", icon: <MapPin className="w-5 h-5 text-white" /> },
    ];
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-3 left-4 right-4 z-50 bg-gray-200/15 backdrop-blur-xl border border-white/20 rounded-3xl shadow-lg">
      <div className="container mx-auto px-8 py-3">
        <div className="flex items-center justify-between">

          <Link to="/" className="flex items-center space-x-3">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Bharat<span className="text-blue-400">Connect</span>
              </h1>
              <p className="text-xs text-gray-200 -mt-1">
                Swadeshi Logistics Network
              </p>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {getNavItems(userData?.role).map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-4 py-2.5 rounded-full transition-all ${
                  isActive(item.path)
                    ? "bg-white/30 text-blue-300 shadow-lg"
                    : "text-gray-200 hover:bg-white/20 hover:text-blue-300"
                }`}
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            {userData && (
              <div className="hidden md:block relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 hover:bg-white/30 shadow-sm text-white transition-all"
                >
                  <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {userData?.name?.charAt(0)}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-white transition-transform ${
                      isUserMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-black/90 text-white rounded-xl shadow-xl border border-white/10 overflow-hidden">
                    <div className="p-4 border-b border-white/10">
                      <p className="font-bold">{userData?.name}</p>
                      <p className="text-sm text-gray-300 truncate">{userData?.email}</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => navigate("/resetpassword")}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-white/10 transition-colors"
                      >
                        <KeyRound className="w-5 h-5 text-gray-200" />
                        <span>Change Password</span>
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-red-600/20 transition-colors"
                      >
                        <LogOut className="w-5 h-5 text-red-400" />
                        <span className="text-red-300">Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!userData && (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/signup" className="px-6 py-2.5 rounded-full border-2 border-blue-400 text-blue-300 font-medium">
                  Sign Up
                </Link>
                <Link to="/login" className="px-6 py-2.5 rounded-full bg-blue-500 text-white font-medium">
                  Login
                </Link>
              </div>
            )}

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-white/30 text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Nav;