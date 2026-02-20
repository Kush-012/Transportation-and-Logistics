import React, { useEffect, useState } from "react";
import api from "../services/apiClient";

export default function Shipperdashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const decodeToken = () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) return null;
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  const user = decodeToken();

  useEffect(() => {
    if (!user) return;

    api
      .get("/getbooking", {
        headers: { Authorization: "Bearer " + sessionStorage.getItem("token") },
      })
      .then((res) => setBookings(res.data))
      .catch(() => alert("Failed to load bookings!"))
      .finally(() => setLoading(false));
  }, []);

  const count = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "Pending").length,
    paid: bookings.filter((b) => b.status === "Paid").length,
    accepted: bookings.filter((b) => b.status === "Accepted").length,
    ongoing: bookings.filter((b) => b.status === "Ongoing").length,
    completed: bookings.filter((b) => b.status === "Completed").length,
    cancelled: bookings.filter((b) => b.status === "Cancelled").length,
  };

  const statusColor = {
    Pending: "text-yellow-300",
    Paid: "text-orange-300",
    Accepted: "text-indigo-300",
    Ongoing: "text-purple-300",
    Completed: "text-green-300",
    Cancelled: "text-red-300",
  };

  // Format backend lowercase statuses like "completed"
  const formatStatus = (status) => {
    if (!status) return "";
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  return (
    <div className="min-h-screen bg-[#0d1a2b] text-white p-6">
      
      <h1 className="text-4xl font-bold text-center mb-10 text-blue-400 tracking-wide">
        Shipper Dashboard
      </h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-10">
        {[
          ["Total", count.total, "text-blue-300"],
          ["Pending", count.pending, "text-yellow-300"],
          ["Paid", count.paid, "text-orange-300"],
          ["Accepted", count.accepted, "text-indigo-300"],
          ["Ongoing", count.ongoing, "text-purple-300"],
          ["Completed", count.completed, "text-green-300"],
        ].map(([label, value, color], i) => (
          <div
            key={i}
            className="bg-[#112337] p-4 rounded-xl border border-gray-700 shadow-md"
          >
            <h3 className="text-gray-400 text-sm">{label}</h3>
            <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* BOOKINGS */}
      {loading ? (
        <p className="text-center text-blue-400 animate-pulse text-xl">
          Loading bookings...
        </p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No bookings found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <div
              key={b.bookingid}
              className="bg-[#112337] p-5 rounded-xl border border-gray-700 shadow-lg 
              hover:shadow-blue-500/30 transition-all duration-300"
            >
              {/* Booking ID */}
              <h2 className="text-lg font-semibold text-blue-300 mb-3">
                Booking ID: <span className="text-white">{b.bookingid}</span>
              </h2>

              {/* STATUS */}
              <div className="mt-2">
                <p className="text-gray-400 text-sm font-semibold">Status:</p>
                <p
                  className={`text-lg font-bold ${
                    statusColor[formatStatus(b.status)]
                  }`}
                >
                  {formatStatus(b.status)}
                </p>
              </div>

              {/* Pickup */}
              <div className="mt-3">
                <p className="text-gray-400 text-sm font-semibold">Pickup:</p>
                <p className="text-white text-lg">{b.pickupLocation}</p>
              </div>

              {/* Drop */}
              <div className="mt-3">
                <p className="text-gray-400 text-sm font-semibold">
                  Destination:
                </p>
                <p className="text-white text-lg">{b.dropLocation}</p>
              </div>

              {/* Vehicle */}
              <div className="mt-3">
                <p className="text-gray-400 text-sm font-semibold">Vehicle:</p>
                <p className="text-white text-lg">{b.vehicleNo}</p>
              </div>

              {/* Fare */}
              <div className="mt-3">
                <p className="text-gray-400 text-sm font-semibold">Fare:</p>
                <p className="text-white text-lg font-semibold">
                  ₹{b.totalFare}
                </p>
              </div>

              {/* Date */}
              <p className="text-gray-400 text-xs mt-4 italic">
                Booked On: {new Date(b.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
