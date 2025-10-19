import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./../styles/auth.scss";

const AUTH_URL = import.meta.env.VITE_API_AUTH_URL;

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // ✅ Init navigation

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${AUTH_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Login successful!");
        localStorage.setItem("token", data?.authToken);
        setFormData({ email: "", password: "" });

        // ✅ Use navigate to redirect
        navigate("/admin");
      } else {
        toast.error(data.message || "Login failed.");
      }
    } catch {
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page" role="main">
      <form onSubmit={handleSubmit} className="login-form" noValidate>
        <h2>Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          aria-label="Email"
          autoComplete="username"
          disabled={loading}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          aria-label="Password"
          autoComplete="current-password"
          disabled={loading}
        />

        <button type="submit" disabled={loading} aria-busy={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* <p className="redirect-text">
          Don't have an account?{" "}
          <Link to="/auth/register" className="redirect-link">
            Register
          </Link>
        </p> */}

        <p className="redirect-text">
          <Link to="/" className="redirect-link">
            Back to Home
          </Link>
        </p>
      </form>
    </main>
  );
};

export default LoginPage;
