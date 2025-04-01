import React from "react";
import { Link } from "react-router-dom";
import "./Login.css"; // Import custom styles

const ForgotPassword = () => {
  return (
    <div className="auth-container d-flex align-items-center justify-content-center">
      <div className="auth-box shadow-lg">
        <h2 className="text-center mb-4 fw-bold">Forgot Password?</h2>
        <p className="text-center text-muted">
          Enter your email to receive a password reset link.
        </p>

        <div className="mb-3">
          <label className="form-label fw-semibold">Email Address</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <button className="btn btn-primary w-100 py-2">Send Reset Link</button>

        <div className="text-center mt-3">
          <Link to="/" className="text-primary">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
