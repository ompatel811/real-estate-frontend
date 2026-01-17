import React, { useState } from "react";
import { verifyOtp } from "../services/authService";
import { useLocation, useNavigate } from "react-router-dom";
import "./Auth.css";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleVerify = async () => {
    if (!otp) {
      setMessage("Enter OTP");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const res = await verifyOtp(email, otp);

      setMessage(res.data);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(
        typeof err.response?.data === "string"
          ? err.response.data
          : "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Verify OTP</h2>

        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button onClick={handleVerify} disabled={loading}>
          {loading ? "Verifying..." : "Verify"}
        </button>

        {message && (
          <div className="auth-message auth-success">{message}</div>
        )}
      </div>
    </div>
  );
}

export default VerifyOtp;
