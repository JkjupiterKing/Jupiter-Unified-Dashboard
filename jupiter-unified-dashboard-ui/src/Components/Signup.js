import React from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // Import custom styles

const Signup = () => {
  return (
    <div className="auth-container d-flex align-items-center justify-content-center">
      <div className="auth-box shadow-lg">
        <h2 className="text-center mb-4 fw-bold">Create an Account</h2>
        <hr style={{ backgroundColor: "black", height: "2px" }} />
        <div className="mb-3">
          <label className="form-label fw-semibold">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your full name"
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
          />
        </div>
        <button className="btn btn-primary w-100 py-2">Sign Up</button>
        <div className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/" className="text-primary">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
