import React, { useContext } from "react";
import { AppContext } from "../../AppProvider";

import "./Navbar.css";
import NavLinks from "./NavLinks";
import NavBrand from "./NavBrand";

const Navbar = () => {
  const [authUser] = useContext(AppContext);
  return (
    <>
      <NavLinks authUser={authUser} />
      <NavBrand />
    </>
  );
};

export default Navbar;
