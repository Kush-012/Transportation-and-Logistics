import React, { useEffect, useState } from "react";
import api from "../services/apiClient";

export default function Viewvehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVehicles();
  }, []);

  async function fetchVehicles() {
    try {
      const res = await api.get("/viewvehicle", {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      });
      setVehicles(res.data.vehicles);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load vehicles");
      setLoading(false);
    }
  }

  // 🟢 Open email window to contact driver
  const contactDriver = (driverEmail) => {
    const user = sessionStorage.getItem("email"); // store user email in session at login
    const mailURL = `mailto:${driverEmail}?subject=Transportation%20Booking%20Request&body=Hello,%20I%20want%20to%20book%20your%20vehicle.%20Please%20reply.%0A-%20${user}`;
    window.location.href = mailURL;
  };

  return (
    <div className="min-h-screen bg-[#0d1a2b] px-6 pt-6 pb-14">
      <h1 className="text-3xl font-bold text-center text-white mb-10 tracking-wide">
        Available Vehicles
      </h1>

      {loading && (
        <div className="text-center text-blue-400 text-lg font-semibold animate-pulse">
          Loading vehicles...
        </div>
      )}

      {error && (
        <div className="text-center text-red-500 font-medium">{error}</div>
      )}

      {!loading && vehicles.length === 0 && (
        <div className="text-center text-gray-300 font-medium">
          No vehicles found 😓
        </div>
      )}

      <div
        className="
        grid 
        xl:grid-cols-4 
        lg:grid-cols-3 
        sm:grid-cols-2 
        grid-cols-1 
        gap-8 
        justify-items-center
      ">
        {vehicles.map((v, index) => (
          <div
            key={index}
            className="bg-[#112337] w-[320px] rounded-xl overflow-hidden shadow-lg 
                       border border-transparent
                       hover:border-blue-500 hover:shadow-[0_0_18px_#3b82f6]
                       hover:bg-[#162d47]
                       transition-all duration-300"
          >
            <div className="bg-black/30 p-2 min-h-[220px] flex items-center justify-center">
              <img
                src={
                  v.images?.[0] ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrk2t-2he8tR186nZsgbgEPQkSm4tieTjzTg&s"
                }
                alt="Vehicle"
                className="h-60 w-full"
              />
            </div>
            <div className="p-4">
              <h2 className="text-lg text-white font-semibold flex justify-between">
                {v.vehicleType}
                <span className="text-sm text-indigo-300 font-normal">
                  📍 {v.location}
                </span>
              </h2>

              <p className="text-gray-300 text-sm mt-1">
                <span className="font-semibold text-purple-400">Owner:</span>{" "}
                {v.driverName}
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-semibold text-blue-400">Vehicle No:</span>{" "}
                {v.vehicleNumber}
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-semibold text-green-400">Capacity:</span>{" "}
                {v.capacityInKg} Kg
              </p>

              <p className="text-gray-300 text-sm">
                <span className="font-semibold text-yellow-400">Price/Km:</span>{" "}
                ₹{v.pricePerKm}
              </p>

              <button
                onClick={() => contactDriver(v.driverEmail)}
                className="mt-3 mb-1 w-full bg-blue-500 hover:bg-white hover:text-blue-500 text-white font-semibold py-2 rounded-lg transition-all duration-200 cursor-pointer"
              >
                Contact Driver
              </button>
            </div>


          </div>
        ))}
      </div>
    </div>
  );
} 
