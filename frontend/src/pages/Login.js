import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, [navigate]);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await API.post("/login", { email, password });

      localStorage.setItem("token", res.data.token);

      setUser(res.data.user); // ✅ global user

      setMessage("Login successful ✅");

      navigate("/dashboard");

    } catch (err) {
      setMessage("Invalid credentials ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Auth System 🚀</h1>
      <h2>Login</h2>

      {/* ✅ Message */}
      {message && <p className={message.includes("❌") ? "error" : "success"}>
        {message}
      </p>}

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* ✅ Password with toggle */}
      <div className="password-box">
        <input
          type={show ? "text" : "password"}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </span>
      </div>

      {/* ✅ Loading button */}
      <button onClick={handleLogin}>
        {loading ? "Logging in..." : "Login"}
      </button>

      <p>
        <Link to="/forgot-password">Forgot Password</Link>
      </p>

      <p>
        Don't have an account? <Link to="/signup">Signup</Link>
      </p>
    </div>
  );
}

export default Login;