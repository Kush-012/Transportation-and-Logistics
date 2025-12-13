import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = () => {
      const token = sessionStorage.getItem("token");
      if (!token) return setUser(null);
      try { setUser(jwtDecode(token)); } catch { setUser(null); }
    };

    loadUser();
    window.addEventListener("authUpdate", loadUser);
    return () => window.removeEventListener("authUpdate", loadUser);
  }, []);

  const ShipperRoute = (el) => (!user ? <Navigate to="/login" /> : user.role !== "shipper" ? <Navigate to="/" /> : el);
  const DriverRoute  = (el) => (!user ? <Navigate to="/login" /> : user.role !== "driver"  ? <Navigate to="/" /> : el);

  return (
    <Router>
      <div className="pt-20 bg-[#0d1a2b] min-h-screen text-white">
        <Nav />
        <AI />

        <Routes>

          {/* PUBLIC ROUTES */}
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<Resetpassword />} />

          {/* SHIPPER ROUTES*/}
          <Route path="/viewvehicle"       element={ShipperRoute(<Viewvehicle />)} />
          <Route path="/bookvehicle"       element={ShipperRoute(<Book />)} />
          <Route path="/checkout"          element={ShipperRoute(<Checkout />)} />
          <Route path="/shipperdashboard"  element={ShipperRoute(<Shipperdashboard />)} />

          {/* DRIVER ROUTES */}
          <Route path="/addvehicle"        element={DriverRoute(<Addvehicle />)} />
          <Route path="/updatevehicle"     element={DriverRoute(<Updatevehicle />)} />
          <Route path="/driverdashboard"   element={DriverRoute(<Driverdashboard />)} />

        </Routes>

      </div>
    </Router>
  );
}
