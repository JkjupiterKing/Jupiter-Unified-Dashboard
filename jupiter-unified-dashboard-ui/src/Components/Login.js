import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <div className="auth-container d-flex align-items-center justify-content-center">
      <div className="auth-box shadow-lg">
        <h2 className="text-center mb-4 fw-bold">Login</h2>

        <div className="social-login d-flex justify-content-center gap-3">
          <button className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2">
            <i className="bi bi-google"></i> Sign in with Google
          </button>
        </div>

        <div className="divider text-center my-3">or</div>

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

        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="bi bi-lock"></i>
            </span>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
            />
          </div>
        </div>

        <div className="text-end mb-3">
          <Link to="/forgot-password" className="text-primary">
            Forgot Password?
          </Link>
        </div>

        <button className="btn btn-primary w-100 py-2">Log In</button>

        <div className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
