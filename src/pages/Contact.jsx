import React, { useState } from "react";
import { showroom } from "../mock/cars";

import "./../styles/contact.scss";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { companyInfo, formatPhoneNum } from "../mock/company";
import { Link } from "react-router-dom";
import { api } from "../api/api";
import toast from "react-hot-toast";

const ContactPage = () => {
  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.full_name || !form.phone || !form.email || !form.message) {
      toast.error("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      await api.createMessage(form);
      toast.success("Message sent");
      setForm({
        full_name: "",
        phone: "",
        email: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Not sent. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="contact-page">
        <div
          className="hero"
          style={{ background: `url(${showroom[0]?.gallery[0]})` }}
        >
          <div className="container">
            <div className="content">
              <h1>Contact Us</h1>
            </div>
          </div>
        </div>

        <div className="contacts-sec">
          <div className="container">
            <div className="content">
              <div className="contact-card">
                <div className="div">
                  <h2>Let's get in touch.</h2>
                  <div className="phone-call">
                    <div>
                      <h3>Phone Numbers</h3>
                      <p>To rent one of our vehicles, please call us.</p>
                    </div>
                    <ul>
                      <li>
                        <Link to={`tel:${companyInfo.phone.mtn}`}>
                          <span className="icon">
                            <LuPhone />
                          </span>
                          <span>+{formatPhoneNum(companyInfo.phone.mtn)}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={`tel:${companyInfo.phone.airtel}`}>
                          <span className="icon">
                            <LuPhone />
                          </span>
                          <span>
                            +{formatPhoneNum(companyInfo.phone.airtel)}
                          </span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={`mailto:${
                            companyInfo?.email || companyInfo.gmail
                          }`}
                          className="email"
                        >
                          <span className="icon">
                            <LuMail />
                          </span>
                          <span>{companyInfo?.email || companyInfo.gmail}</span>
                        </Link>
                      </li>
                      <li>
                        <Link to={companyInfo.address?.mapLink}>
                          <span className="icon">
                            <LuMapPin />
                          </span>
                          <span>{companyInfo.address?.title}</span>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="contact-descr">
                <div className="form">
                  <h2>
                    We want to <i>hear from you.</i>
                  </h2>
                  <p>
                    Whether you have a specific vision in mind or need
                    assistance refining your preferences, we're here to assist
                    you every step of the way.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div className="input">
                      <input
                        type="text"
                        name="full_name"
                        placeholder="Full names"
                        value={form.full_name}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="e.g. 2570 78 1234 567"
                        value={form.phone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input">
                      <input
                        type="email"
                        name="email"
                        placeholder="e.g. booking@brightsafaris.com"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="message">
                      <textarea
                        name="message"
                        placeholder="Your message"
                        value={form.message}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-btn">
                      <button
                        type="submit"
                        className="button"
                        disabled={loading}
                      >
                        {loading ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="map-view">
          <div className="container">
            <div className="content">
              <iframe src={companyInfo.address.map}></iframe>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
