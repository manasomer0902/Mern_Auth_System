import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleSignup = async () => {
    try {
      setLoading(true);

      await API.post("/signup", { name, email, password });

      setMessage("Signup successful ✅");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      setMessage("Error in signup ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Auth System 🚀</h1>
      <h2>Signup</h2>

      {/* ✅ Message */}
      {message && (
        <p className={message.includes("❌") ? "error" : "success"}>
          {message}
        </p>
      )}

      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* ✅ Password with toggle */}
      <div className="password-box">
        <input
          type={show ? "text" : "password"}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </span>
      </div>

      {/* ✅ Loading button */}
      <button onClick={handleSignup}>
        {loading ? "Creating..." : "Signup"}
      </button>

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Signup;