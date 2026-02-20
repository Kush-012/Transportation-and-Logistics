import React, { useState } from "react";
import api from "../services/apiClient";
import { useNavigate } from "react-router-dom";

export default function Resetpassword() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); 
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [toast, setToast] = useState({ msg: "", type: "" });

  // Toast Handler
  const notify = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "" }), 2500);
  };

  // -------------------------
  // STEP 1 → SEND OTP
  // -------------------------
  const sendOTP = async () => {
    if (!email) return notify("Email is required", "error");

    try {
      await api.post("/resetpassword", { email });
      notify("OTP sent to your email", "success");
      setStep(2);
    } catch (err) {
      notify(err.response?.data?.message || "Failed to send OTP", "error");
    }
  };

  // -------------------------
  // STEP 2 → RESET PASSWORD
  // -------------------------
  const resetPassword = async () => {
    if (!otp || !newPassword || !confirm)
      return notify("All fields are required", "error");

    if (newPassword !== confirm)
      return notify("Passwords do not match", "error");

    try {
      await api.post("/resetpassword", {
        email,
        otp,
        newPassword,
      });

      notify("Password reset successful!", "success");

      // CLEAR FORM
      setEmail("");
      setOtp("");
      setNewPassword("");
      setConfirm("");

      setStep(3); // Move to success screen
    } catch (err) {
      notify(err.response?.data?.message || "Password reset failed", "error");
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {toast.msg && (
        <div
          className={`fixed top-24 right-5 px-4 py-2 rounded-md shadow-lg text-white font-semibold 
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.msg}
        </div>
      )}

      <div className="min-h-screen bg-gray-900 flex justify-center items-center px-4">
        <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-xl border border-gray-700">

          <h2 className="text-white text-3xl font-bold text-center mb-6">
            Reset Password
          </h2>

        
          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md mb-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={sendOTP}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-all"
              >
                Send OTP
              </button>
            </>
          )}

         
          {step === 2 && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md mb-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md mb-4 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-md mb-6 outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                onClick={resetPassword}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-md transition-all"
              >
                Reset Password
              </button>

              <p
                onClick={() => setStep(1)}
                className="text-blue-400 mt-4 text-center cursor-pointer hover:text-blue-300"
              >
                ← Go back
              </p>
            </>
          )}

         
          {step === 3 && (
            <div className="text-center">
              <h3 className="text-green-400 text-xl font-bold mb-4">
              Password changed successfully!
              </h3>

              <button
                onClick={() => navigate("/login")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition-all"
              >
                Go to Login →
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
