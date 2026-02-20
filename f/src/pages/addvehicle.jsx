import React, { useState } from "react";
import api from "../services/apiClient";

export default function Addvehicle() {
  const [form, setForm] = useState({
    vehicleType: "",
    vehicleNumber: "",
    capacityInKg: "",
    pricePerKm: "",
    location: "", 
  });

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [message, setMessage] = useState("");

  // Handle Inputs
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    setImages([...e.target.files]);
    setPreviewImages([...e.target.files].map((file) => URL.createObjectURL(file)));
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formData = new FormData();
    formData.append("vehicleType", form.vehicleType);
    formData.append("vehicleNumber", form.vehicleNumber);
    formData.append("capacityInKg", form.capacityInKg);
    formData.append("pricePerKm", form.pricePerKm);
    formData.append("location", form.location); 

    images.forEach((img) => formData.append("images", img));

    try {
      await api.post("/addvehicle", formData, {
        headers: {
          Authorization: "Bearer " + sessionStorage.getItem("token"),
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Vehicle added successfully");
      setTimeout(() => setMessage(""), 2000);

      // Reset Form
      setForm({ vehicleType: "", vehicleNumber: "", capacityInKg: "", pricePerKm: "", location: "" });
      setImages([]);
      setPreviewImages([]);

    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to add vehicle");
      setTimeout(() => setMessage(""), 2000);
    }
  };

  return (
    <>
      {/* Toast Message */}
      {message && (
        <div
          className={`fixed top-24 right-4 px-4 py-2 rounded-md shadow-lg text-white font-semibold animate-fade-in 
          ${message.includes("success") || message.includes("added")
            ? "bg-green-600"
            : "bg-red-600"}`}
        >
          {message}
        </div>
      )}

      <div className="min-h-screen bg-gray-900 flex justify-center items-center p-6">
        <div className="bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-lg">
          <h2 className="text-white text-3xl font-bold text-center mb-6">
            Add Vehicle
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Dropdown */}
            <div className="relative">
              <select
                name="vehicleType"
                value={form.vehicleType}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-700 text-white rounded-md appearance-none focus:ring-2 focus:ring-blue-500 pr-10"
              >
                <option value="">Select Vehicle Type</option>
                <option value="Truck">Truck</option>
                <option value="Lorry">Lorry</option>
                <option value="E-Rickshaw">E-Rickshaw</option>
                <option value="Van">Van</option>
                <option value="Tractor Trailer">Tractor Trailer</option>
                <option value="Cargo Bike">Cargo Bike</option>
              </select>

              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white pointer-events-none">
                ▼
              </span>
            </div>

            <input
              type="text"
              name="vehicleNumber"
              placeholder="Vehicle Number (e.g., HR16 AB 1234)"
              value={form.vehicleNumber}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              name="capacityInKg"
              placeholder="Capacity (in Kg)"
              value={form.capacityInKg}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="number"
              name="pricePerKm"
              placeholder="Price per Km (₹)"
              value={form.pricePerKm}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-blue-500"
            />

            {/* Input */}
            <input
              type="text"
              name="location"
              placeholder="Location (e.g., Delhi)"
              value={form.location}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:ring-2 focus:ring-purple-500"
            />

            {/* Image Upload */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 bg-gray-700 text-white rounded-md file:bg-gray-600 file:border-none file:text-white file:px-3 file:py-2 file:rounded-md file:hover:bg-gray-500"
            />

            {/* Preview */}
            {previewImages.length > 0 && (
              <div className="flex gap-3 flex-wrap mt-2">
                {previewImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="preview"
                    className="w-16 h-16 rounded-lg object-cover border border-gray-600"
                  />
                ))}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-blue-500 hover:text-blue-500 text-white hover:bg-white font-bold py-3 rounded-md transition duration-200"
            >
              Add Vehicle
            </button>

          </form>
        </div>
      </div>
    </>
  );
}
