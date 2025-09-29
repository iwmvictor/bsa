import React from "react";
import { MdOutlineCall } from "react-icons/md";
import { Link, NavLink } from "react-router-dom";
import { companyInfo, formatPhoneNum } from "../mock/company";
import { LuFacebook, LuInstagram, LuMail } from "react-icons/lu";
import { RiFacebookBoxFill, RiTiktokFill } from "react-icons/ri";
import { IoMdLocate } from "react-icons/io";
import { assets } from "../mock/asset";

const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="container">
          <div className="content">
            <div className="cta ">
              <img src={assets.serviceImg2} alt=""  loading="lazy" />
              <div className="bg gradient"></div>
              <div className="text">
                <h2>Ready to Go?</h2>
                <p>Book your car wherever you are and ride with us now!</p>
                <Link to={"/collection"}>
                  <span>Book Now</span>
                </Link>
              </div>
            </div>
            <div className="footer-cols">
              <div className="col-2">
                <div className="col">
                  <h2>Bright Safaris Africa Ltd.</h2>
                  <p>
                    Feel free to call us in working hours Mon - Fri, 08h00 -
                    17h00. Our team will be happy to help answer your enqueries.
                  </p>
                  <ul>
                    <li>
                      <NavLink>
                        <span className="icon">
                          <MdOutlineCall />
                        </span>
                        <span>{formatPhoneNum(companyInfo.phoneMtn)}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink>
                        <span className="icon">
                          <MdOutlineCall />
                        </span>
                        <span>{formatPhoneNum(companyInfo.phoneAirtel)}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink>
                        <span className="icon">
                          <LuMail />
                        </span>
                        <span>{companyInfo?.email || companyInfo.gmail}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink>
                        <span className="icon">
                          <IoMdLocate />
                        </span>
                        <span>{companyInfo?.email || companyInfo.gmail}</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-3">
                <div className="cols-list">
                  <div className="col">
                    <h3>Quick Links</h3>
                    <ul>
                      <li>
                        <NavLink>
                          <span>Car Collection</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink>
                          <span>Who we are?</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink>
                          <span>Our Services</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink>
                          <span></span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <h3>Help & Support</h3>

                    <ul>
                      <li>
                        <NavLink>
                          <span>Customer support</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink>
                          <span>Terms & Condition</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink>
                          <span>Privacy policy</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink>
                          <span></span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                  <div className="col">
                    <h3>Socials Media</h3>
                    <ul>
                      <li>
                        <NavLink>
                          <span className="icon">
                            <LuInstagram />
                          </span>
                          <span>@{companyInfo.socials.instagram}</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink>
                          <span className="icon">
                            <RiTiktokFill />
                          </span>
                          <span>@{companyInfo.socials.tiktok}</span>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink>
                          <span className="icon">
                            <RiFacebookBoxFill />
                          </span>
                          <span>@{companyInfo.socials.facebook}</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="copy">
                  <p>
                    Copyright &copy; {new Date().getFullYear()} Bright Safaris
                    Africa Ltd.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
