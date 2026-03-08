import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/apiClient";
import {
  FaMapMarkerAlt,
  FaTruckLoading,
  FaSearch,
  FaRoad,
  FaHashtag,
  FaRupeeSign,
} from "react-icons/fa";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function Book() {
  const [vehicles, setVehicles] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const [filter, setFilter] = useState({
    pickupLocation: "",
    dropLocation: "",
    distance: "",
    vehicleNumber: "",
    totalFare: "",
  });

  const [map, setMap] = useState(null);
  const [routeLayer, setRouteLayer] = useState(null);
  const [startMarker, setStartMarker] = useState(null);
  const [endMarker, setEndMarker] = useState(null);
  const [tripInfo, setTripInfo] = useState({ distance: "", time: "" });

  const navigate = useNavigate();

  // 🔔 Notification
  const notify = (text, type) => {
    setMsg({ text, type });
    setTimeout(() => setMsg({ text: "", type: "" }), 2500);
  };

  // 🔓 Decode JWT
  const decodeToken = () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return null;
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  // 🚚 Load Vehicles
  useEffect(() => {
    (async () => {
      try {
        const res = await api.get("/viewvehicle", {
          headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
        });

        setVehicles(res.data.vehicles);
        setFiltered(res.data.vehicles);
      } catch {
        setVehicles([]);
        setFiltered([]);
      }
      setLoading(false);
    })();
  }, []);

  // 🔍 Filter vehicles
  useEffect(() => {
    const pick = filter.pickupLocation.toLowerCase();
    const drop = filter.dropLocation.toLowerCase();

    if (!pick && !drop) return setFiltered(vehicles);

    const temp = vehicles.filter(
      (v) =>
        v.location.toLowerCase().includes(pick) ||
        v.location.toLowerCase().includes(drop)
    );
    setFiltered(temp);
  }, [filter.pickupLocation, filter.dropLocation, vehicles]);

  // 🗺 Initialize map
  useEffect(() => {
    const container = L.DomUtil.get("routeMap");
    if (container != null && container._leaflet_id) container._leaflet_id = null;

    const m = L.map("routeMap").setView([22.9734, 78.6569], 5);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(m);

    setMap(m);
    return () => m.remove();
  }, []);

  // 🛣 Auto draw route
  useEffect(() => {
    if (filter.pickupLocation && filter.dropLocation) {
      const t = setTimeout(() => {
        drawRoute(filter.pickupLocation, filter.dropLocation);
      }, 500);
      return () => clearTimeout(t);
    } else {
      setTripInfo({ distance: "", time: "" });
      setFilter((o) => ({ ...o, distance: "", totalFare: "" }));

      if (routeLayer) {
        map.removeLayer(routeLayer);
        setRouteLayer(null);
      }
      if (startMarker) {
        map.removeLayer(startMarker);
        setStartMarker(null);
      }
      if (endMarker) {
        map.removeLayer(endMarker);
        setEndMarker(null);
      }
    }
  }, [filter.pickupLocation, filter.dropLocation]);

  async function drawRoute(pick, drop) {
    if (!map) return;

    const fetchCoords = async (location) => {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${location}&format=json`
      );
      const data = await res.json();
      if (!data[0]) return null;

      return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
    };

    const s = await fetchCoords(pick);
    const e = await fetchCoords(drop);

    if (!s || !e) return notify("Invalid pickup or drop!", "error");

    if (routeLayer) {
      map.removeLayer(routeLayer);
      setRouteLayer(null);
    }
    if (startMarker) {
      map.removeLayer(startMarker);
      setStartMarker(null);
    }
    if (endMarker) {
      map.removeLayer(endMarker);
      setEndMarker(null);
    }

    const markerIcon = (url) =>
      L.icon({ iconUrl: url, iconSize: [30, 30], iconAnchor: [15, 30] });

    setStartMarker(
      L.marker(s, {
        icon: markerIcon("https://cdn-icons-png.flaticon.com/512/1673/1673221.png"),
      }).addTo(map)
    );

    setEndMarker(
      L.marker(e, {
        icon: markerIcon("https://cdn-icons-png.flaticon.com/512/64/64113.png"),
      }).addTo(map)
    );

    const resp = await fetch("http://localhost:4500/map/route", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        coordinates: [
          [s[1], s[0]],
          [e[1], e[0]],
        ],
      }),
    });

    const json = await resp.json();

    if (!json.features || json.features.length === 0)
      return notify("Route not found!", "error");

    const data = json.features[0];
    const summary = data.properties.summary;

    const distKm = (summary.distance / 1000).toFixed(2);
    let totalSeconds = summary.duration;

    let hr = Math.floor(totalSeconds / 3600);
    let min = Math.floor((totalSeconds % 3600) / 60);

    let timeStr = hr > 0 ? `${hr} hr ` : "";
    timeStr += min > 0 ? `${min} min` : "";
    if (timeStr === "") timeStr = "1 min";

    setTripInfo({ distance: distKm, time: timeStr.trim() });

    const route = L.geoJSON(data.geometry, {
      style: { color: "#00A2FF", weight: 4 },
    });

    setRouteLayer(route);
    route.addTo(map);
    map.fitBounds(route.getBounds());

    setFilter((o) => ({ ...o, distance: distKm }));
  }

  // 💰 Fare Calculation
  useEffect(() => {
    if (filter.distance && filter.vehicleNumber) {
      const selected = vehicles.find((v) => v.vehicleNumber === filter.vehicleNumber);
      if (selected) {
        const fare = (Number(filter.distance) * selected.pricePerKm).toFixed(2);
        setFilter((o) => ({ ...o, totalFare: fare }));
      }
    }
  }, [filter.distance, filter.vehicleNumber, vehicles]);

  // ✔ Select Vehicle
  const selectVehicle = (v) => {
    if (!v.isAvailable) return notify("This vehicle is not available!", "error");

    setFilter((o) => ({
      ...o,
      pickupLocation: o.pickupLocation || v.location,
      vehicleNumber: v.vehicleNumber,
    }));
    notify("Vehicle Selected", "success");
  };

  // 📝 Book Vehicle
  const handleBooking = async () => {
    const user = decodeToken();
    if (!user) return notify("Please login first!", "error");

    if (!filter.pickupLocation || !filter.dropLocation || !filter.distance || !filter.vehicleNumber)
      return notify("Fill all fields first!", "error");

    const selected = vehicles.find((v) => v.vehicleNumber === filter.vehicleNumber);
    if (!selected) return notify("Invalid vehicle!", "error");

    if (!selected.isAvailable)
      return notify("Vehicle is not available for booking!", "error");

    try {
      await api.post(
        "/createbooking",
        {
          shipperEmail: user.email,
          driverEmail: selected.driverEmail,
          vehicleNo: selected.vehicleNumber,

          pickupLocation: filter.pickupLocation,
          dropLocation: filter.dropLocation,
          distanceInKm: Number(filter.distance),
          totalFare: Number(filter.totalFare),

          status: "Pending",
        },
        {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        }
      );

      notify("Booking Successful! Redirecting...", "success");
      setTimeout(() => navigate("/checkout"), 1200);
    } catch (err) {
      console.log(err.response?.data);
      notify("Booking Failed", "error");
    }
  };

  // --------------------------------------------------------------------
  // JSX UI
  // --------------------------------------------------------------------

  return (
    <div className="min-h-screen bg-[#0d1a2b] text-white flex">

      {/* 🔔 Notification */}
      {msg.text && (
        <div
          className={`fixed right-4 top-[100px] z-[9999] px-4 py-2 rounded shadow-xl text-white font-semibold ${
            msg.type === "success" ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* Left Panel */}
      <div className="w-1/3 border-r border-gray-700 p-6">
        <h2 className="text-2xl font-semibold mb-6 flex gap-2 items-center">
          <FaSearch /> Book Transport
        </h2>

        <label className="block mb-2 flex gap-2 items-center text-gray-300">
          <FaMapMarkerAlt /> Pickup Location
        </label>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 text-white mb-5"
          value={filter.pickupLocation}
          placeholder="Enter pickup location"
          onChange={(e) => setFilter({ ...filter, pickupLocation: e.target.value })}
        />

        <label className="block mb-2 flex gap-2 items-center text-gray-300">
          <FaTruckLoading /> Drop Location
        </label>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 text-white mb-5"
          value={filter.dropLocation}
          placeholder="Enter drop location"
          onChange={(e) => setFilter({ ...filter, dropLocation: e.target.value })}
        />

        <label className="block mb-2 flex gap-2 items-center text-gray-300">
          <FaRoad /> Distance (Km)
        </label>
        <input
          type="text"
          readOnly
          className="w-full p-2 rounded bg-gray-700 text-white mb-5"
          value={filter.distance}
        />

        <label className="block mb-2 flex gap-2 items-center text-gray-300">
          <FaRupeeSign /> Total Fare (₹)
        </label>
        <input
          type="text"
          readOnly
          className="w-full p-2 rounded bg-gray-700 text-white mb-5 font-bold text-blue-300"
          value={filter.totalFare ? `₹ ${filter.totalFare}` : ""}
        />

        <label className="block mb-2 flex gap-2 items-center text-gray-300">
          <FaHashtag /> Vehicle No.
        </label>
        <input
          type="text"
          className="w-full p-2 rounded bg-gray-700 text-white mb-5"
          value={filter.vehicleNumber}
          placeholder="Select vehicle first"
          onChange={(e) => setFilter({ ...filter, vehicleNumber: e.target.value })}
        />

        <button
          onClick={handleBooking}
          className="bg-blue-500 hover:bg-blue-600 w-full p-2 font-bold rounded"
        >
          Book Vehicle
        </button>
      </div>

      {/* Right Side */}
      <div className="flex-1 p-6">
        <div className="w-full h-[280px] rounded-lg overflow-hidden border border-blue-500 mb-4">
          <div id="routeMap" className="w-full h-full"></div>
        </div>

        {tripInfo.distance && (
          <p className="text-center text-blue-300 font-bold mb-6">
            Distance: {tripInfo.distance} km &nbsp; | &nbsp; Time: {tripInfo.time}
          </p>
        )}

        <h1 className="text-2xl font-bold text-center text-white mb-5 tracking-wide mt-5">
          Available Vehicles
        </h1>

        {loading ? (
          <div className="text-center text-blue-400 text-lg font-semibold animate-pulse">
            Loading vehicles...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center text-gray-300 font-medium mt-10">
            No vehicles found 😓
          </div>
        ) : (
          <div className="grid xl:grid-cols-3 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 justify-items-center">
            {filtered.map((v, index) => (
              <div
                key={index}
                className="bg-[#112337] w-[320px] rounded-xl overflow-hidden shadow-lg 
                border border-transparent hover:border-blue-500 hover:shadow-[0_0_18px_#3b82f6]
                hover:bg-[#162d47] transition-all duration-300"
              >
                <div className="bg-black/30 p-2 min-h-[220px] flex items-center justify-center">
                  <img
                    src={
                      v.images?.[0] ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrk2t-2he8tR186nZsgbgEPQkSm4tieTjzTg&s"
                    }
                    alt="Vehicle"
                    className="h-60 w-full object-cover"
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-lg text-white font-semibold flex justify-between">
                    {v.vehicleType}
                    <span className="text-sm text-indigo-300">📍 {v.location}</span>
                  </h2>

                  {/* ⭐ Availability Badge */}
                  <div className="mt-2 mb-2">
                    {v.isAvailable ? (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-green-600 text-white">
                        ● Available
                      </span> 
                    ) : (
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-red-600 text-white">
                        Not Available
                      </span>
                    )}
                  </div>

                  <p className="text-gray-300 text-sm mt-1">
                    <strong>Owner:</strong> {v.driverName}
                  </p>
                  <p className="text-gray-300 text-sm">
                    <strong>Vehicle No:</strong> {v.vehicleNumber}
                  </p>
                  <p className="text-gray-300 text-sm">
                    <strong>Capacity:</strong> {v.capacityInKg} Kg
                  </p>
                  <p className="text-gray-300 text-sm">
                    <strong>Price/Km:</strong> ₹{v.pricePerKm}
                  </p>

                  <button
                    onClick={() => selectVehicle(v)}
                    disabled={!v.isAvailable}
                    className={`mt-3 mb-1 w-full py-2 rounded-lg font-semibold transition-all duration-200 
                      ${
                        v.isAvailable
                          ? "bg-blue-500 hover:bg-white hover:text-blue-500 text-white cursor-pointer"
                          : "bg-gray-500 text-gray-300 cursor-not-allowed"
                      }`}
                  >
                    {v.isAvailable ? "Select Vehicle" : "Not Available"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
