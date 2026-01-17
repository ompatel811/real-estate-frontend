import React, { useState } from "react";
import { addProperty } from "../services/propertyService";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./Auth.css"; // Reuse auth styles for the form

function AddProperty() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const submit = async () => {
    // Basic validation
    if (!title || !price) return;

    await addProperty({
      title,
      price,
      location,
      description,
    });

    navigate("/home");
  };

  return (
    <>
      <Navbar />
      <div className="auth-container" style={{ alignItems: 'flex-start', paddingTop: '40px' }}>
        <div className="auth-card" style={{ width: '500px' }}>
          <h2>Add New Property</h2>

          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Property Title</label>
          <input
            placeholder="e.g. Luxury Villa in Mumbai"
            onChange={e => setTitle(e.target.value)}
          />

          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Price (INR)</label>
          <input
            type="number"
            placeholder="e.g. 25000000"
            onChange={e => setPrice(e.target.value)}
          />

          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Location</label>
          <input
            placeholder="e.g. Bandra West"
            onChange={e => setLocation(e.target.value)}
          />

          <label style={{ display: 'block', marginBottom: '8px', color: 'var(--color-text-light)', fontSize: '0.9rem' }}>Description</label>
          <textarea
            placeholder="Describe the property details..."
            rows="5"
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'rgba(0,0,0,0.2)',
              color: 'var(--color-surface)',
              fontFamily: 'var(--font-sans)',
              marginBottom: '20px',
              resize: 'vertical'
            }}
            onChange={e => setDescription(e.target.value)}
          />

          <button onClick={submit}>Publish Listing</button>

          <button
            onClick={() => navigate("/home")}
            style={{ background: 'transparent', border: '1px solid var(--color-text-light)', color: 'var(--color-text-light)', marginTop: '10px' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}

export default AddProperty;
