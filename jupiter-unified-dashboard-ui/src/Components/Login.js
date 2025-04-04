import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google"; // Import both GoogleOAuthProvider and GoogleLogin
import "./Login.css";

// Your Google Client ID
const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your actual Google Client ID

const Login = () => {
  const navigate = useNavigate(); // For navigation after successful login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle normal email/password login
  const handleEmailPasswordLogin = (e) => {
    e.preventDefault();

    // Basic form validation
    if (email === "" || password === "") {
      setError("Please enter both email and password.");
      return;
    }

    // Send email and password to your backend for validation
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          navigate("/homepage"); // Redirect to homepage on success
        } else {
          setError(data.message || "Invalid credentials");
        }
      })
      .catch((err) => {
        setError("An error occurred. Please try again.");
      });
  };

  // Handle Google login
  const handleGoogleLoginSuccess = (response) => {
    console.log("Google login success:", response);
    // You can send the response.credential (token) to your backend for authentication or store it in state
    // Decode the Google token (response.credential) to extract user information
    // Navigate to homepage on success
    navigate("/homepage");
  };

  const handleGoogleLoginFailure = (error) => {
    console.error("Google login error:", error);
    setError("Google login failed.");
  };

  return (
    <GoogleOAuthProvider
      clientId={
        "148450761791-o18b898tk369thnhdg6fajmftrjlq03b.apps.googleusercontent.com"
      }
    >
      <div className="auth-container d-flex align-items-center justify-content-center">
        <div className="auth-box shadow-lg">
          <h2 className="text-center mb-4 fw-bold">Login</h2>

          {/* Google Login Button */}
          <div className="social-login d-flex justify-content-center gap-3">
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onFailure={handleGoogleLoginFailure}
              cookiePolicy="single_host_origin"
              render={(renderProps) => (
                <button
                  className="btn btn-outline-dark w-100 d-flex align-items-center justify-content-center gap-2"
                  onClick={renderProps.onClick} // Trigger the Google Login
                  disabled={renderProps.disabled} // Disable the button when the login is in progress
                >
                  <i className="bi bi-google"></i> Sign in with Google
                </button>
              )}
            />
          </div>

          <div className="divider text-center my-3">or</div>

          {/* Normal Login Form */}
          <form onSubmit={handleEmailPasswordLogin}>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            {error && (
              <div className="text-center mb-3 text-danger">{error}</div>
            )}

            <div className="text-end mb-3">
              <Link to="/forgot-password" className="text-primary">
                Forgot Password?
              </Link>
            </div>

            <button className="btn btn-primary w-100 py-2" type="submit">
              Log In
            </button>
          </form>

          <div className="text-center mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
