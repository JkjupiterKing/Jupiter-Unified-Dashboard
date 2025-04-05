import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Login.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState(""); // For storing the email entered by user
  const [otp, setOtp] = useState(""); // For storing OTP entered by user
  const [newPassword, setNewPassword] = useState(""); // For storing new password
  const [otpSent, setOtpSent] = useState(false); // To track if OTP has been sent
  const [isOtpVerified, setIsOtpVerified] = useState(false); // To track OTP verification status
  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success message
  const navigate = useNavigate();

  // Password validation
  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|-]).{8,}$/; // At least 8 characters, 1 letter, 1 number, and 1 symbol
    return regex.test(password);
  };

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA0-9]{2,}$/; // Simple regex for valid email format
    return regex.test(email);
  };

  // Send OTP to the email
  const handleSendOtp = async () => {
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/otp/send?email=${email}`
      );
      if (response.status === 200) {
        setOtpSent(true);
        setSuccess("OTP has been sent to your email.");
      }
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  // Verify OTP entered by the user
  const handleVerifyOtp = async () => {
    if (!otp) {
      setError("Please enter the OTP.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/otp/verify?email=${email}&otp=${otp}`
      );
      if (response.data === "OTP verified successfully") {
        setIsOtpVerified(true);
        setError(""); // Clear error on successful OTP verification
        setSuccess("OTP verified successfully!.");
      } else {
        setError("Invalid or expired OTP.");
      }
    } catch (error) {
      setError("Error verifying OTP. Please try again.");
    }
  };

  // Handle the new password submission after OTP is verified
  const handleSetNewPassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !validatePassword(newPassword)) {
      setError(
        "Password must be at least 8 characters long and contain letters, numbers, and a symbol."
      );
      return;
    }

    try {
      // Send new password via query parameters using @RequestParam
      const response = await axios.post(
        `http://localhost:8080/users/forgot-password?email=${email}&newPassword=${newPassword}`
      );
      if (response.status === 200) {
        setSuccess("Password has been successfully reset.");
        setTimeout(() => {
          navigate("/"); // Redirect to login page after a successful password reset
        }, 2000);
      }
    } catch (error) {
      setError("Failed to reset password. Please try again.");
    }
  };

  return (
    <>
      {/* Toast Container */}
      <div
        id="toast-container"
        className="position-fixed top-0 end-0 p-3"
        style={{ zIndex: 11 }}
      >
        {error && (
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <strong className="me-auto">Error</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">{error}</div>
          </div>
        )}

        {success && (
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="toast-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
            <div className="toast-body">{success}</div>
          </div>
        )}
      </div>

      <div className="auth-container d-flex align-items-center justify-content-center">
        <div className="auth-box shadow-lg">
          <h2 className="text-center mb-4 fw-bold">Forgot Password?</h2>
          <p className="text-center text-muted">
            Enter your email to reset your password.
          </p>

          {/* Email Input */}
          {!otpSent && (
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Send OTP Button */}
          {!otpSent && (
            <button
              className="btn btn-primary w-100 py-2"
              onClick={handleSendOtp}
              disabled={!validateEmail(email)} // Disable until email is valid
            >
              Send OTP
            </button>
          )}

          {/* OTP Verification */}
          {otpSent && !isOtpVerified && (
            <div className="mb-3">
              <label className="form-label fw-semibold">Enter OTP</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter OTP sent to your email"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button
                className="btn btn-secondary mt-2 w-100 py-2"
                onClick={handleVerifyOtp}
                disabled={!otp} // Disable until OTP is entered
              >
                Verify OTP
              </button>
            </div>
          )}

          {/* New Password Input */}
          {isOtpVerified && (
            <form onSubmit={handleSetNewPassword}>
              <div className="mb-3">
                <label className="form-label fw-semibold">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <button className="btn btn-primary w-100 py-2" type="submit">
                Set New Password
              </button>
            </form>
          )}

          {/* Link to Login */}
          <div className="text-center mt-3">
            <Link to="/" className="text-primary">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
