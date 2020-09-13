import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light shadow-sm d-md-none d-block">
      <a className="navbar-brand" href="/">
        <img
          src="./../../../public/ampersand.png"
          width="30"
          height="30"
          alt="Presta Logo"
          loading="lazy"
        />
      </a>
    </nav>
  );
};

export default Navbar;
