import { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await API.post("/forgot-password", { email });

      setMessage("Reset link sent to your email ✅");

    } catch (err) {
      setMessage("Error sending email ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Auth System 🚀</h1>
      <h2>Forgot Password</h2>

      {/* ✅ Message */}
      {message && (
        <p className={message.includes("❌") ? "error" : "success"}>
          {message}
        </p>
      )}

      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* ✅ Loading button */}
      <button onClick={handleSubmit}>
        {loading ? "Sending..." : "Send Reset Link"}
      </button>

      <p>
        <Link to="/">Back to Login</Link>
      </p>
    </div>
  );
}

export default ForgotPassword;