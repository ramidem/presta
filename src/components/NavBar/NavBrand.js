import React from "react";
import { Link } from "react-router-dom";

import "./NavBrand.css";

const NavBrand = () => {
  return (
    <nav className="mainnav">
      <div className="mainnav_faux_bg"></div>
      <div className="container">
        <Link to="/" className="mainnav_brand">
          <h1 className="mainnav_brand_h1">PRESTA</h1>
          <p className="mainnav_brand_p">car rental</p>
        </Link>
      </div>
    </nav>
  );
};

export default NavBrand;
