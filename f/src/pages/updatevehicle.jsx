import React, { useEffect, useState } from "react";
import api from "../services/apiClient";
import { jwtDecode } from "jwt-decode";

export default function Updatevehicle() {
  const [vehicles, setVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error

  const [form, setForm] = useState({
    vehicleType: "",
    location: "",
    capacityInKg: "",
    pricePerKm: "",
    isAvailable: true,
  });

  const showMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(""), 3000);
  };

  const fetchVehicles = () => {
    const token = sessionStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const driverEmail = decoded.email;

    api
      .get(`/viewvehiclebydriverEmail/${driverEmail}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setVehicles(res.data.vehicles))
      .catch(() => showMessage("Failed to load vehicles", "error"));
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setForm({
      vehicleType: vehicle.vehicleType,
      location: vehicle.location,
      capacityInKg: vehicle.capacityInKg,
      pricePerKm: vehicle.pricePerKm,
      isAvailable: vehicle.isAvailable,
    });
    setImageFile(null);
  };

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");

      const formData = new FormData();
      Object.keys(form).forEach((key) => formData.append(key, form[key]));
      if (imageFile) formData.append("image", imageFile);

      await api.put(
        `/updatevehicle/${selectedVehicle.vehicleNumber}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      showMessage("Vehicle updated successfully", "success");
      setSelectedVehicle(null);
      fetchVehicles();
    } catch (error) {
      showMessage("Error updating vehicle", "error");
    }
  };

  const handleDelete = async (vehicleNumber) => {
    if (!window.confirm(`Delete ${vehicleNumber}?`)) return;

    try {
      const token = sessionStorage.getItem("token");

      await api.delete(
        `/deletevehicle/${vehicleNumber}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showMessage("Vehicle deleted successfully", "success");
      fetchVehicles();
    } catch (error) {
      showMessage("Error deleting vehicle", "error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0d1a2b] text-white p-6 relative">

      {/* TOP-RIGHT NOTIFICATION */}
      {message && (
        <div
          className={`fixed top-24 right-4 px-5 py-3 rounded-lg text-white shadow-lg transition-all duration-300
            ${messageType === "success" ? "bg-blue-500" : "bg-red-600"}`}
        >
          {message}
        </div>
      )}

      <h1 className="text-3xl font-bold text-center mb-8 tracking-wide">
        Manage Your Vehicles
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

        {/* LEFT SIDE VEHICLE GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {vehicles.map((v) => (
            <div
              key={v._id}
              className="bg-[#112337] rounded-xl overflow-hidden shadow-lg 
                         border border-transparent hover:border-blue-500 
                         hover:shadow-[0_0_15px_#3b82f6] transition-all duration-300"
            >
              <div className="bg-black/20 p-2 h-[200px] flex items-center justify-center">
                <img
                  src={v.images?.[0] || "https://via.placeholder.com/300?text=No+Image"}
                  alt="Vehicle"
                  className="h-full object-contain"
                />
              </div>

              <div className="p-4">
                <h2 className="text-lg font-semibold flex justify-between">
                  {v.vehicleType}
                  <span className="text-sm text-pink-300">{v.location}</span>
                </h2>

                <p className="text-gray-300 text-sm mt-1">
                  <span className="font-semibold text-purple-400">Owner:</span> {v.driverName}
                </p>

                <p className="text-gray-300 text-sm">
                  <span className="font-semibold text-blue-400">Vehicle No:</span> {v.vehicleNumber}
                </p>

                <p className="text-gray-300 text-sm">
                  <span className="font-semibold text-green-400">Capacity:</span> {v.capacityInKg} Kg
                </p>

                <p className="text-gray-300 text-sm">
                  <span className="font-semibold text-yellow-400">Price/Km:</span> ₹{v.pricePerKm}
                </p>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleSelect(v)}
                    className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded-lg"
                  >
                    Update
                  </button> 
                  <button
                    onClick={() => handleDelete(v.vehicleNumber)}
                    className="w-full py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE UPDATE FORM */}
        {selectedVehicle && (
          <div className="bg-gray-800 p-6 w-full max-w-md rounded-xl shadow-lg border border-gray-700 self-start">
            <h2 className="text-xl font-bold mb-4">
              Update Vehicle - {selectedVehicle.vehicleNumber}
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">

              <input
                type="text"
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-700"
                required
              />

              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-700"
                required
              />

              <input
                type="number"
                name="capacityInKg"
                value={form.capacityInKg}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-700"
                required
              />

              <input
                type="number"
                name="pricePerKm"
                value={form.pricePerKm}
                onChange={handleChange}
                className="w-full p-3 rounded-md bg-gray-700"
                required
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="isAvailable"
                  checked={form.isAvailable}
                  onChange={handleChange}
                />
                Available To Book
              </label>

              <div>
                <p className="mb-1">Upload New Image (optional)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full bg-gray-700 p-2 rounded-md"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 hover:text-blue-500 hover:bg-white rounded-lg font-bold mt-2"
              >
                Save Changes
              </button> 
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
