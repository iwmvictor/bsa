import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { BiMessageSquareDots } from "react-icons/bi";
import { BsJournalBookmark } from "react-icons/bs";
import { HiMiniArrowTopRightOnSquare } from "react-icons/hi2";
import {
  IoCarSportOutline,
  IoGridOutline,
  IoSettingsOutline,
} from "react-icons/io5";
import { LuX } from "react-icons/lu";
import { MdPowerOff } from "react-icons/md";
import { SiImessage } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";

const AUTH_URL = import.meta.env.VITE_API_AUTH_URL;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DashboardHeader = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [profileModal, setProfileModal] = useState(false);
  const [messageModal, setMessageModal] = useState(false);

  // messages state
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const messageModalRef = useRef(null);

  const handleProfileModal = () => {
    setProfileModal((prev) => !prev);
  };
  const handleMessageModalToggle = () => {
    setMessageModal((prev) => !prev);
  };

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No auth token");

        const response = await fetch(`${AUTH_URL}/auth/me`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch user");

        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Fetch messages
  useEffect(() => {
    if (!messageModal) return; // only fetch when opening modal (optional)
    const fetchMessages = async () => {
      try {
        setLoadingMessages(true);
        const res = await fetch(`${BASE_URL}/contact_message`);
        if (!res.ok) throw new Error("Failed to fetch messages");
        const data = await res.json();
        // sort by newest first if not already
        // assume `created_at` or some timestamp field
        const sorted = data.sort((a, b) => {
          // if messages have created_at as ISO dates
          return new Date(b.created_at) - new Date(a.created_at);
        });
        setMessages(sorted.slice(0, 6)); // only top 6
      } catch (err) {
        console.error(err);
        toast.error("Could not load messages");
      } finally {
        setLoadingMessages(false);
      }
    };
    fetchMessages();
  }, [messageModal]);

  // close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        messageModalRef.current &&
        !messageModalRef.current.contains(event.target)
      ) {
        setMessageModal(false);
      }
    };
    if (messageModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [messageModal]);

  const userInitialsUrl = user
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name
      )}&background=917330&color=fff&bold=true`
    : "";

  return (
    <>
      <div className="dashboard-sidebar">
        <div className="container">
          <div className="content">
            <div className="logo">
              <span>BSA.</span>
              <span className="name">car rental</span>
            </div>

            <ul className="action">
              <li
                onClick={handleMessageModalToggle}
                className={messageModal ? "message active" : "message"}
              >
                <BiMessageSquareDots />
                <span className="count">{messages.length}</span>
              </li>

              <li
                onClick={handleProfileModal}
                className={profileModal ? "profile active" : "profile"}
              >
                {loading ? (
                  <div className="skeleton-avatar">
                    <SpinLoader />
                  </div>
                ) : (
                  <img
                    src={
                      userInitialsUrl ||
                      "https://ui-avatars.com/api/?name=Admin&background=666666&color=fff&bold=true"
                    }
                    loading="lazy"
                  />
                )}
              </li>
            </ul>
          </div>

          {/* Message Modal */}
          {messageModal && (
            <div className="message-modal-overlay">
              <div className="message-modal" ref={messageModalRef}>
                <div className="modal-content">
                  <div className="title">
                    <h2>Your messages</h2>
                    <button onClick={() => setMessageModal(false)}>
                      <LuX />
                    </button>
                  </div>

                  {loadingMessages ? (
                    <div className="loading">Loading...</div>
                  ) : messages.length === 0 ? (
                    <div className="no-message">
                      <p>You have no messages.</p>
                    </div>
                  ) : (
                    <div className="message-list">
                      {messages.map((msg) => (
                        <div className="item" key={msg.id}>
                          <div className="icon">
                            <SiImessage />
                          </div>
                          <div className="name">
                            <h4 className="sender">{msg?.name || "Unknown"}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {messages.length > 5 && (
                    <div className="all">
                      <Link
                        to="/admin/messages"
                        onClick={() => setMessageModal(false)}
                      >
                        View All Messages
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {profileModal && <MenuModal clickAction={handleProfileModal} />}
        </div>
      </div>
    </>
  );
};

export const SpinLoader = () => {
  return (
    <>
      <span className="loader-circle"></span>
    </>
  );
};

const MenuModal = ({ clickAction }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    clickAction();

    toast.success("Logged out");

    navigate("/auth");
  };

  return (
    <>
      <div className="menu-modal">
        <ul>
          <li>
            <Link to={"/admin"} onClick={clickAction}>
              <span className="icon">
                <IoGridOutline />
              </span>

              <span>Overview</span>
            </Link>
          </li>

          <li>
            <Link to={"/admin/cars"} onClick={clickAction}>
              <span className="icon">
                <IoCarSportOutline />
              </span>

              <span>Collection</span>
            </Link>
          </li>

          <li>
            <Link to={"/admin/bookings"} onClick={clickAction}>
              <span className="icon">
                <BsJournalBookmark />
              </span>

              <span>Bookings</span>
            </Link>
          </li>
        </ul>

        <div className="site">
          <Link to={"/"} target="_blank" onClick={clickAction}>
            <span className="icon">
              <HiMiniArrowTopRightOnSquare />
            </span>

            <span>Preview site</span>
          </Link>
        </div>

        <ul>
          <li>
            <Link to={"/admin/settings"} onClick={clickAction}>
              <span className="icon">
                <IoSettingsOutline />
              </span>

              <span>Settings</span>
            </Link>
          </li>

          <li>
            <button onClick={handleLogout}>
              <span className="icon">
                <MdPowerOff />
              </span>

              <span>Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default DashboardHeader;
