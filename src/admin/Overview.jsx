import React, { useEffect, useState } from "react";
import { api } from "../api/api";
import { BiMessageSquareDetail, BiSolidBookmark } from "react-icons/bi";
import { IoCarSportOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Exponential retry helper
const fetchWithRetry = async (fn, retries = 3, delay = 1000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (error) {
      const status = error?.response?.status;
      if (status === 429 && i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay * Math.pow(2, i)));
      } else {
        throw error;
      }
    }
  }
};

const DashboardOverview = () => {
  const [counts, setCounts] = useState({
    cars: 0,
    featuredCars: 0,
    bookings: 0,
    messages: 0,
  });

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 12) return "Bonjour";
    else if (hour >= 12 && hour < 17) return "Bonne après-midi";
    else return "Bonsoir";
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const cars = await fetchWithRetry(() => api.getAllCars());
        await new Promise((res) => setTimeout(res, 1000)); // delay to avoid rate limit

        const messages = await fetchWithRetry(() => api.getAllMessages());
        await new Promise((res) => setTimeout(res, 2000));

        const bookings = await fetchWithRetry(() => api.getAllBookings());
        
        const featured = cars.filter((c) => c.featured);

        setCounts({
          cars: cars.length,
          featuredCars: featured.length,
          bookings: bookings.length,
          messages: messages.length,
        });
      } catch (error) {
        console.error("Failed to fetch dashboard counts:", error);
        if (error?.response?.status === 429) {
          toast.error("Too many requests. Please wait and try again.");
        } else {
          toast.error("An error occurred while loading dashboard data.");
        }
      }
    };

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token");

        const res = await fetch(
          `${import.meta.env.VITE_API_AUTH_URL}/auth/me`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      }
    };

    // Fire both functions
    fetchUser();
    fetchDashboardData();
  }, []);

  return (
    <div className="admin-overview">
      <div className="container">
        <div className="content">
          <div className="hey">
            <h1>
              <span>{getGreeting()}</span>
              <span>{user?.name || "there"}!</span>
            </h1>
            <p>Welcome onboard, track bookings and manage cars.</p>
          </div>
          <div className="numbers">
            <div className="card" onClick={() => navigate("/admin/cars")}>
              <div className="title">
                <span>
                  <IoCarSportOutline />
                </span>
                <span>Cars</span>
              </div>
              <h1>{counts.cars}</h1>
            </div>
            <div className="card" onClick={() => navigate("/admin/cars")}>
              <div className="title">
                <span>
                  <BiSolidBookmark />
                </span>
                <span>Featured cars</span>
              </div>
              <h1>{counts.featuredCars}</h1>
            </div>
            <div className="card" onClick={() => navigate("/admin/bookings")}>
              <div className="title">
                <span>
                  <MdOutlineShoppingCart />
                </span>
                <span>Bookings</span>
              </div>
              <h1>{counts.bookings}</h1>
            </div>
            <div className="card" onClick={() => navigate("/admin/inbox")}>
              <div className="title">
                <span>
                  <BiMessageSquareDetail />
                </span>
                <span>Messages</span>
              </div>
              <h1>{counts.messages}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
