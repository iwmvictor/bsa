import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./../styles/auth.scss";

const AUTH_URL = import.meta.env.VITE_API_AUTH_URL;

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        `${AUTH_URL}/auth/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success("Registered successfully!");
        setFormData({ name: "", email: "", password: "" });
      } else {
        toast.error(data.message || "Registration failed.");
        console.error("BE error:", data);
      }
    } catch (error) {
      toast.error("An error occurred.");
      console.error("Network or JS error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="register-page" role="main">
      <form onSubmit={handleSubmit} className="register-form" noValidate>
        <h2>Create Account</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          aria-label="Full Name"
          autoComplete="name"
          disabled={loading}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          aria-label="Email"
          autoComplete="email"
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
          autoComplete="new-password"
          disabled={loading}
        />

        <button type="submit" disabled={loading} aria-busy={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="redirect-text">
          Already have an account?{" "}
          <Link to="/auth/login" className="redirect-link">
            Login
          </Link>
        </p>

        <p className="redirect-text">
          <Link to="/" className="redirect-link">
            Back to Home
          </Link>
        </p>
      </form>
    </main>
  );
};

export default RegisterPage;
