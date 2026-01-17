import React, { useEffect, useState } from "react";
import { getCurrentUser } from "../services/authService";
import { getAllProperties } from "../services/propertyService";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Home.css";

function Home() {
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUser()
      .then((res) => setUser(res.data))
      .catch(() => {
        localStorage.clear();
        navigate("/login");
      });

    getAllProperties()
      .then((res) => setProperties(res.data))
      .catch((err) => console.error(err));
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="home-container">
        
        {/* HERO SECTION */}
        <div className="hero-section">
          <h1>Find Your Dream Home</h1>
          <p>Discover luxury properties in prime locations. Experience the finest in modern living.</p>
          <button className="cta-button" onClick={() => navigate("/add-property")}>
            List Your Property
          </button>
        </div>

        {/* USER WELCOME (Optional, can be subtle) */}
        {user && (
          <div className="user-welcome-header">
            <div className="user-info">
              <p>Welcome back, <strong>{user.username}</strong></p>
            </div>
            <button className="cta-button" style={{ fontSize: '0.8rem', padding: '8px 16px' }} onClick={() => navigate("/add-property")}>
              + Add New Listing
            </button>
          </div>
        )}

        {/* PROPERTY LIST */}
        <h3 className="section-title">Latest Listings</h3>

        {properties.length === 0 ? (
          <div className="no-properties">
            <p>No properties found. Be the first to list one!</p>
          </div>
        ) : (
          <div className="property-grid">
            {properties.map((p) => (
              <div key={p.id} className="property-card">
                <div className="property-image-placeholder">
                  🏠
                  <span className="property-price-tag">₹{p.price.toLocaleString()}</span>
                </div>
                <div className="property-details">
                  <h3>{p.title}</h3>
                  <div className="location">📍 {p.location}</div>
                  <p className="description">{p.description}</p>
                  
                  <div className="property-footer">
                    <span>Listed by {p.owner?.username || 'Unknown'}</span>
                    <button className="cta-button" style={{ padding: '6px 12px', fontSize: '0.75rem', marginLeft: 'auto' }}>
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
