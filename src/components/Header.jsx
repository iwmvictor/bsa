import React, { useState } from "react";
import { LuInstagram, LuMail, LuPhone, LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import { FaFacebookF, FaTiktok } from "react-icons/fa6";
import BurgerComponent from "./Burger";
import NavModal from "./NavModal";

import "./../styles/component.scss";
import { companyInfo, formatPhoneNum } from "../mock/company";
import { MdWhatsapp } from "react-icons/md";

const Header = () => {
  const [menuModal, setMenuModal] = useState(false);

  const handleCheckboxChange = (event) => {
    setMenuModal(event.target.checked); // Update the modal state when checkbox changes
  };
 
  return (
    <>
      <div className="header">
        <div className="top-header">
          <div className="container">
            <div className="content">
              <ul className="left">
                {(companyInfo?.phoneMtn || companyInfo?.phoneAirtel) && (
                  <li>
                    <Link
                      className="num"
                      to={`tel:${
                        companyInfo.phoneMtn || companyInfo.phoneAirtel
                      }`}
                    >
                      <span className="icon">
                        <LuPhone />
                      </span>
                      <span className="txt">
                        {formatPhoneNum(
                          companyInfo?.phoneMtn || companyInfo?.phoneAirtel
                        )}
                      </span>
                    </Link>
                  </li>
                )}
                {(companyInfo?.email || companyInfo?.gmail) && (
                  <li>
                    <Link
                      to={`mailto:${companyInfo?.email || companyInfo.gmail}`}
                    >
                      <span className="icon">
                        <LuMail />
                      </span>
                      <span className="txt">
                        {companyInfo?.email || companyInfo?.gmail}
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
              <ul className="right">
                {companyInfo.socials.instagram && (
                  <li>
                    <Link
                      to={`https://instagram.com/${companyInfo.socials.instagram}`}
                    >
                      <span>
                        <LuInstagram />
                      </span>
                    </Link>
                  </li>
                )}
                {companyInfo.socials.facebook && (
                  <li>
                    <Link
                      to={`https://facebook.com/${companyInfo.socials.facebook}`}
                    >
                      <span>
                        <FaFacebookF />
                      </span>
                    </Link>
                  </li>
                )}
                {companyInfo.socials.tiktok && (
                  <li>
                    <Link
                      to={`https://tiktok.com/${companyInfo.socials.tiktok}`}
                    >
                      <span>
                        <FaTiktok />
                      </span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="navbar">
        <div className="container">
          <div className="content">
            <div className="left">
              <Link to={"/"} className="logo">
                <img
                  src={companyInfo.logo}
                  alt="Company Logo"
                  className="large"
                />
                <img
                  src={companyInfo.icon}
                  alt="Company Icon"
                  className="mobile"
                />
              </Link>
              {/* <div className="search">
                <input
                  type="search"
                  name="search"
                  id="search"
                  placeholder="Search here ..."
                />
                <span className="icon">
                  <LuSearch />
                </span>
              </div> */}
            </div>
            <div className="action">
              <Link
                target="_blank"
                to={`https://wa.me/${
                  companyInfo?.phone?.mtn || companyInfo?.phone?.airtel
                }`}
                className="book button"
              >
                <span>
                  <MdWhatsapp />
                </span>
                <span>WhatsApp</span>
              </Link>
              <BurgerComponent
                isChecked={menuModal}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
          </div>
        </div>
      </div>

      {menuModal && (
        <NavModal
          isChecked={menuModal}
          handleCheckboxChange={handleCheckboxChange}
        />
      )}
    </>
  );
};

export default Header;
