import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(""); // For storing OTP entered by user
  const [otpSent, setOtpSent] = useState(false); // To track if OTP has been sent
  const [error, setError] = useState(""); // For error messages
  const [success, setSuccess] = useState(""); // For success message
  const [isOtpVerified, setIsOtpVerified] = useState(false); // To track OTP verification status
  const navigate = useNavigate(); // Initialize useNavigate

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
    if (!password || !validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and contain both letters and numbers."
      );
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/otp/send?email=${email}`
      );
      if (response.status === 200) {
        setOtpSent(true);
      }
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    }
  };

  // Verify the OTP
  const handleVerifyOtp = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/otp/verify?email=${email}&otp=${otp}`
      );
      if (response.data === "OTP verified successfully") {
        setIsOtpVerified(true);
        setError("");
        setSuccess("OTP verified successfully!");
      } else {
        setError("Invalid or expired OTP.");
      }
    } catch (error) {
      setError("Error verifying OTP. Please try again.");
    }
  };

  // Handle the form submission after OTP verification
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all fields are filled in
    if (!username || !email || !password) {
      setError("Enter username, email, and password.");
      return;
    }

    // Validate email and password
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters long and contain both letters and numbers."
      );
      return;
    }

    if (isOtpVerified) {
      try {
        const response = await axios.post(
          "http://localhost:8080/users/register",
          {
            username,
            email,
            password,
          }
        );
        if (response.status === 200) {
          setSuccess("Registration Successful!");
          setTimeout(() => {
            navigate("/"); // Redirect to login page after 2 seconds
          }, 2000);
        }
      } catch (error) {
        if (
          error.response &&
          error.response.data === "Email is already in use."
        ) {
          setError("Email is already in use.");
        } else {
          setError("Registration failed. Please try again.");
        }
      }
    } else {
      setError("Please verify the OTP first.");
    }
  };

  // Check if all fields and conditions are valid to enable the signup button
  const isFormValid = () => {
    return (
      username &&
      validateEmail(email) &&
      validatePassword(password) &&
      isOtpVerified
    );
  };

  return (
    <div className="auth-container d-flex align-items-center justify-content-center">
      <div className="auth-box shadow-lg">
        <h2 className="text-center mb-4 fw-bold">Create an Account</h2>
        <hr style={{ backgroundColor: "black", height: "2px" }} />

        {/* Username Field */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        {/* Email Field */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password Field */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* OTP Section (Visible after email is provided) */}
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
              disabled={!otp}
            >
              Verify OTP
            </button>
          </div>
        )}

        {/* Button to send OTP */}
        {!otpSent && !isOtpVerified && (
          <button
            className="btn btn-primary w-100 py-2"
            onClick={handleSendOtp}
            disabled={!validateEmail(email) || !validatePassword(password)} // Disable until email and password are valid
          >
            Send OTP
          </button>
        )}

        {/* Submit Button for Registration */}
        {isOtpVerified && (
          <button
            className="btn btn-primary w-100 py-2"
            onClick={handleSubmit}
            disabled={!isFormValid()} // Disable submit if form is invalid
          >
            Sign Up
          </button>
        )}

        {/* Error Handling */}
        {error && <div className="alert alert-danger mt-3">{error}</div>}

        {/* Success Message */}
        {success && <div className="alert alert-success mt-3">{success}</div>}

        {/* Link to Login */}
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
