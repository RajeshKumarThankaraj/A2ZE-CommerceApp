import React from "react";
import navLogoImage from "../images/logo.png";
import userImage from "../images/userImage.jpeg";
import cartImage from "../images/cart.png";

const NavBar = () => {
  return (
    <div className="navClass">
      <nav className="navItems">
        <div className="navLogo">
          <img src={navLogoImage} alt="E-commerce Logo" />
        </div>
        <div className="navSearchBar">
          <div class="input-group mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="Search for products, brands and more"
              aria-label="Nav Search Bar"
              aria-describedby="button-addon2"
            />
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
            >
              <i class="bi bi-search"></i>
            </button>
          </div>
        </div>
        <div className="navAccountDetails">
          <img src={userImage} alt="User Account" />
        </div>
        <div className="navCartDetails">
          <img src={cartImage} alt="Cart" />
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
