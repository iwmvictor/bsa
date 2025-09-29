import React from "react";
import { showroom } from "../mock/cars";

import "./../styles/contact.scss";
import { LuMail, LuMapPin, LuPhone } from "react-icons/lu";
import { companyInfo, formatPhoneNum } from "../mock/company";
import { Link } from "react-router-dom";

const ContactPage = () => {
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
                      <p>To rent one of our vehicles, please use call us.</p>
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

                  <form>
                    <div className="input">
                      <input type="text" placeholder="Full names" />
                    </div>
                    <div className="input">
                      <input type="tel" placeholder="e.g. 2570 78 1234 567" />
                    </div>
                    <div className="input">
                      <input
                        type="email"
                        placeholder="e.g. booking@brightsafaris.com"
                      />
                    </div>
                    <div className="message">
                      <textarea name="" placeholder="Your message"></textarea>
                    </div>
                    <div className="form-btn">
                      <button className="button">Send Message</button>
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
