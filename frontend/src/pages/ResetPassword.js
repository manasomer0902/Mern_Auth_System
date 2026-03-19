import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleReset = async () => {
    try {
      setLoading(true);

      await API.post(`/reset-password/${token}`, { password });

      setMessage("Password reset successful ✅");

      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (err) {
      setMessage("Error resetting password ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Auth System 🚀</h1>
      <h2>Reset Password</h2>

      {/* ✅ Message */}
      {message && (
        <p className={message.includes("❌") ? "error" : "success"}>
          {message}
        </p>
      )}

      {/* ✅ Password with toggle */}
      <div className="password-box">
        <input
          type={show ? "text" : "password"}
          placeholder="Enter new password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </span>
      </div>

      {/* ✅ Loading button */}
      <button onClick={handleReset}>
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </div>
  );
}

export default ResetPassword;