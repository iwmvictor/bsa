import React from "react";
import { NavLink } from "react-router-dom";
import BurgerComponent from "./Burger";

const NavModal = ({ isChecked, handleCheckboxChange }) => {
  // Function to handle closing the modal
  const handleLinkClick = () => {
    // Close the modal by setting isChecked to false
    handleCheckboxChange({ target: { checked: false } });
  };

  return (
    <>
      <div className="nav-modal">
        <div className="container">
          <div className="content">
            {/* Pass the isChecked state and handleCheckboxChange function */}
            <div className="close button">
              <BurgerComponent
                isChecked={isChecked}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
            <ul>
              <li>
                <NavLink to={"/"} onClick={handleLinkClick}>
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/collection"} onClick={handleLinkClick}>
                  <span>Our Cars</span>
                </NavLink>
              </li>
              <li>
                <a href={"/#services"} onClick={handleLinkClick}>
                  <span>Our Services</span>
                </a>
              </li>
              <li>
                <NavLink to={"/contact"} onClick={handleLinkClick}>
                  <span>Contact Us</span>
                </NavLink>
              </li>
              <li>
                <a href={"/#our-showroom"} onClick={handleLinkClick}>
                  <span>Gallery</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavModal;
