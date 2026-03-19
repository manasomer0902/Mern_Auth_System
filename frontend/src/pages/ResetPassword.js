import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleReset = async () => {
    try {
      await API.post(`/reset-password/${token}`, { password });

      alert("Password reset successful");

      navigate("/");

    } catch (err) {
      alert("Error resetting password");
    }
  };

  return (
    <div className="container">
      <h1>Auth System 🚀</h1>
      <h2>Reset Password</h2>

      <input
        type="password"
        placeholder="Enter new password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleReset}>Reset Password</button>
    </div>
  );
}

export default ResetPassword;