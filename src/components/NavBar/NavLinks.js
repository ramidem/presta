import React from "react";
import { Link } from "react-router-dom";
import "./NavLinks.css";

const Navlinks = ({ authUser }) => {
  return (
    <nav className="navlinks">
      <div className="container">
        {authUser.isAuth && authUser.isAdmin ? (
          <>
            <Link to="/add-car">Add Car</Link>
            <span> / </span>
          </>
        ) : (
          ""
        )}
        {authUser.isAuth ? (
          <>
            <Link to="/reservations">Reservations</Link>
            <span> / </span>
            <Link to="/logout">Log out</Link>
          </>
        ) : (
          <>
            <Link to="/login">Log in</Link>
            <span> / </span>
            <Link to="/register">Sign up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navlinks;
