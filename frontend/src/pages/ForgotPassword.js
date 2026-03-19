import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API from "../api";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    try {
      await API.post("/forgot-password", { email });

      alert("Reset link sent to your email");

    } catch (err) {
      alert("Error sending email");
    }
  };

  return (
    <div className="container">
      <h1>Auth System 🚀</h1>
      <h2>Forgot Password</h2>

      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={handleSubmit}>Send Reset Link</button>

      <p>
        <Link to="/">Back to Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;