import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./components/AuthContext";

import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Viewvehicle from "./components/viewvehicle";
import Addvehicle from "./components/addvehicle";
import Book from "./components/book";
import Checkout from "./components/checkout";
import Updatevehicle from "./components/updatevehicle";
import Driverdashboard from "./components/driverdashboard";
import Shipperdashboard from "./components/shipperdashboard";
import AI from "./components/ai";
import Resetpassword from "./components/resetpassword";
import ScrollToTopButton from "./components/scrollToTop";

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
          <Route path="/resetpassword" element={<Resetpassword />} />

          <Route path="/viewvehicle" element={ShipperRoute(<Viewvehicle />)} />
          <Route path="/bookvehicle" element={ShipperRoute(<Book />)} />
          <Route path="/checkout" element={ShipperRoute(<Checkout />)} />
          <Route path="/shipperdashboard" element={ShipperRoute(<Shipperdashboard />)} />

          <Route path="/addvehicle" element={DriverRoute(<Addvehicle />)} />
          <Route path="/updatevehicle" element={DriverRoute(<Updatevehicle />)} />
          <Route path="/driverdashboard" element={DriverRoute(<Driverdashboard />)} />
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