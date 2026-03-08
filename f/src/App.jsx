import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Nav from "./components/Nav";
import ViewVehicle from "./pages/ViewVehicle";
import AddVehicle from "./pages/AddVehicle";
import Book from "./pages/Book";
import Checkout from "./pages/Checkout";
import UpdateVehicle from "./pages/UpdateVehicle";
import DriverDashboard from "./pages/DriverDashboard";
import ShipperDashboard from "./pages/ShipperDashboard";
import AI from "./components/AI";
import ResetPassword from "./pages/ResetPassword";
import ScrollToTopButton from "./components/ScrollToTop";

function AppRoutes() {
  const { userData, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0d1a2b] text-blue-300">
        Checking authentication...
      </div>
    );
  }

  const ShipperRoute = (el) =>
    !userData ? <Navigate to="/login" /> :
    userData.role !== "shipper" ? <Navigate to="/" /> :
    el;

  const DriverRoute = (el) =>
    !userData ? <Navigate to="/login" /> :
    userData.role !== "driver" ? <Navigate to="/" /> :
    el;

  return (
    <>
      <ScrollToTopButton/>
      <Nav />
      <AI />

      <div className="pt-20 bg-[#0d1a2b] min-h-screen text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          <Route path="/viewvehicle" element={ShipperRoute(<ViewVehicle />)} />
          <Route path="/bookvehicle" element={ShipperRoute(<Book />)} />
          <Route path="/checkout" element={ShipperRoute(<Checkout />)} />
          <Route path="/shipperdashboard" element={ShipperRoute(<ShipperDashboard />)} />

          <Route path="/addvehicle" element={DriverRoute(<AddVehicle />)} />
          <Route path="/updatevehicle" element={DriverRoute(<UpdateVehicle />)} />
          <Route path="/driverdashboard" element={DriverRoute(<DriverDashboard />)} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}