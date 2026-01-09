import React, { useState } from "react";
import { sendOtp, verifyOtp } from "../services/authService";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const handleSendOtp = async () => {
    try {
      await sendOtp(email);
      setMessage("OTP sent to your email");
      setStep(2);
    } catch (error) {
      setMessage("Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await verifyOtp(email, otp);
      setMessage(res.data);
    } catch (error) {
      setMessage("Invalid OTP");
    }
  };

  return (
    <div style={{ width: "320px", margin: "80px auto", textAlign: "center" }}>
      <h2>Login</h2>

      {step === 1 && (
        <>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <button onClick={handleSendOtp} style={{ width: "100%" }}>
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
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
          />
          <button onClick={handleVerifyOtp} style={{ width: "100%" }}>
            Verify OTP
          </button>
        </>
      )}

      <p>{message}</p>

      <hr />

      {/* 👇 SIGNUP OPTION */}
      <p>
        Don’t have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}

export default Login;
