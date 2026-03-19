import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/");
        return;
      }

      try {
        const res = await API.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user); // ✅ store globally

      } catch (err) {
        // ✅ token expired or invalid
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
        }
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate, setUser]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // ✅ clear global user
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Auth System 🚀</h1>

      {loading ? (
        <p>⏳ Loading user data...</p>
      ) : (
        <>
          <div className="avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h2>Welcome, {user?.name} 👋</h2>

          <div className="divider"></div>

          <div className="card">
            <p><b>Name:</b> {user?.name}</p>
            <p><b>Email:</b> {user?.email}</p>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  );
}

export default Dashboard;