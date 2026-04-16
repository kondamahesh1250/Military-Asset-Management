import { useState } from "react";
import API from "../api";
import "./Login.css";

export default function Login() {
  const [data, setData] = useState({ username: "", password: "" });

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container-main">
      <div className="login-card-main">
        <h2 className="login-title-main">Military Asset System</h2>

        <div className="login-form-group">
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={data.username}
            onChange={(e) =>
              setData({ ...data, username: e.target.value })
            }
          />
        </div>

        <div className="login-form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={data.password}
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />
        </div>

        <button className="login-btn-main" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}