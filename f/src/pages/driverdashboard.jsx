import React, { useEffect, useState } from "react";
import api from "../services/apiClient";
import { jwtDecode } from "jwt-decode";
import {
  MapPin,
  ArrowRight,
  Truck,
  IndianRupee,
  Clock,
  CheckCircle,
  XCircle,
  BarChart2,
  Activity,
} from "lucide-react";

export default function Driverdashboard() {
  const [bookings, setBookings] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  const token = sessionStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : {};
  const email = decoded.email;

  // Notification
  const notify = (text) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 2000);
  };

  // Fetch dashboard data
  const fetchDashboardData = async () => {
    try {
      const bookingRes = await api.get("/getbooking", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(bookingRes.data);

      const vehicleRes = await api.get(
        `/viewvehiclebydriverEmail/${email}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setVehicles(vehicleRes.data.vehicles);
    } catch (err) {
      console.log("Dashboard fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Update booking status
  const updateStatus = async (bookingid, status) => {
    try {
      await api.post(
        `/updatebooking/${bookingid}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      notify(`Status updated → ${status}`);
      fetchDashboardData();
    } catch (err) {
      notify(" Update failed");
      console.log(err);
    }
  };

  // Dashboard Analytics
  const totalBookings = bookings.length;
  const totalVehicles = vehicles.length;
  const completed = bookings.filter((b) => b.status === "Completed").length;
  const ongoing = bookings.filter((b) => b.status === "Ongoing").length;

  const statusColor = {
    Pending: "bg-yellow-500/20 text-yellow-300",
    Paid: "bg-blue-500/20 text-blue-300",
    Accepted: "bg-indigo-500/20 text-indigo-300",
    Ongoing: "bg-purple-500/20 text-purple-300",
    Completed: "bg-green-500/20 text-green-300",
    Cancelled: "bg-red-500/20 text-red-300",
  };

  return (
    <div className="min-h-screen bg-[#0d1a2b] text-white p-6">

      {/* NOTIFICATION */}
      {msg && (
        <div className="fixed top-20 right-6 px-4 py-2 bg-blue-600 text-white rounded shadow-lg z-50 animate-pulse">
          {msg}
        </div>
      )}

      <h1 className="text-4xl font-bold text-center mb-10 text-blue-400">
        Driver Dashboard
      </h1>

      {/* ANALYTICS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-[#112337] p-6 rounded-xl border border-blue-600 shadow-lg">
          <div className="flex items-center gap-4">
            <BarChart2 className="text-blue-400 w-10 h-10" />
            <div>
              <p className="text-gray-300 text-sm">Total Bookings</p>
              <h2 className="text-3xl font-bold text-blue-300">{totalBookings}</h2>
            </div>
          </div>
        </div>

        <div className="bg-[#112337] p-6 rounded-xl border border-cyan-600 shadow-lg">
          <div className="flex items-center gap-4">
            <Truck className="text-cyan-300 w-10 h-10" />
            <div>
              <p className="text-gray-300 text-sm">Your Vehicles</p>
              <h2 className="text-3xl font-bold text-cyan-300">{totalVehicles}</h2>
            </div>
          </div>
        </div>

        <div className="bg-[#112337] p-6 rounded-xl border border-yellow-600 shadow-lg">
          <div className="flex items-center gap-4">
            <Activity className="text-yellow-300 w-10 h-10" />
            <div>
              <p className="text-gray-300 text-sm">Ongoing Trips</p>
              <h2 className="text-3xl font-bold text-yellow-300">{ongoing}</h2>
            </div>
          </div>
        </div>

        <div className="bg-[#112337] p-6 rounded-xl border border-green-600 shadow-lg">
          <div className="flex items-center gap-4">
            <CheckCircle className="text-green-400 w-10 h-10" />
            <div>
              <p className="text-gray-300 text-sm">Completed</p>
              <h2 className="text-3xl font-bold text-green-400">{completed}</h2>
            </div>
          </div>
        </div>

      </div>

      {/* BOOKINGS LIST */}
      {loading ? (
        <p className="text-center text-gray-300 text-lg">Loading bookings...</p>
      ) : bookings.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">No bookings assigned to you.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {bookings.map((b) => (
            <div
              key={b.bookingid}
              className="bg-[#112337] p-6 rounded-xl border border-gray-700 shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-blue-300">
                  Booking #{b.bookingid}
                </h2>
                <span className={`px-3 py-1 rounded-full text-sm ${statusColor[b.status]}`}>
                  {b.status}
                </span>
              </div>

              {/* DETAILS */}
              <p className="text-gray-300">Pickup: <span className="text-white">{b.pickupLocation}</span></p>
              <p className="text-gray-300">Drop: <span className="text-white">{b.dropLocation}</span></p>
              <p className="text-gray-300">Vehicle: <span className="text-white">{b.vehicleNo}</span></p>
              <p className="text-gray-300">Fare: <span className="text-green-300 font-bold">₹{b.totalFare}</span></p>

              <p className="text-gray-400 text-sm mt-4">
                Booked On: {new Date(b.createdAt).toLocaleString()}
              </p>

              {/* ACTION BUTTONS */}
              <div className="mt-5 flex flex-wrap gap-3">

                {b.status === "Paid" && (
                  <button
                    onClick={() => updateStatus(b.bookingid, "Accepted")}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
                  >
                    Accept
                  </button>
                )}

                {b.status === "Accepted" && (
                  <button
                    onClick={() => updateStatus(b.bookingid, "Ongoing")}
                    className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 rounded-lg"
                  >
                    Start Trip
                  </button>
                )}

                {b.status === "Ongoing" && (
                  <button
                    onClick={() => updateStatus(b.bookingid, "Completed")}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg"
                  >
                    Complete Trip
                  </button>
                )}

                {(b.status === "Paid" || b.status === "Accepted") && (
                  <button
                    onClick={() => updateStatus(b.bookingid, "Cancelled")}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                  >
                    Cancel
                  </button>
                )}

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
