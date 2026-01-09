import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // future use
    navigate("/");
  };

  return (
    <div style={{ width: "400px", margin: "50px auto", textAlign: "center" }}>
      <h2>🏠 Home Page</h2>
      <p>Welcome to Online Real Estate System</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
