import React, { useContext } from "react";
import { Link } from "react-router-dom";

import "./../css/Navbar.css";
import { AppContext } from "../AppProvider";

const Modal = () => {
  return (
    <div
      className="modal fade"
      id="bookNow"
      data-backdrop="static"
      data-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">...</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const [authUser] = useContext(AppContext);
  return (
    <>
      <div className="navbar navbar-dark bg-dark p-0">
        <div className="container">
          <span className="navbar__links navbar-text ml-auto pr-3 text-uppercase">
            {authUser.isAdmin ? (
              <>
                <Link to="/add-car">Add Car</Link>
                <span> / </span>
              </>
            ) : (
              ""
            )}
            {authUser.isAuth ? (
              <>
                <Link to="/reservations">Reservations</Link> /{" "}
                <a href="/">Logout</a>
              </>
            ) : (
              <>
                <Link to="/register">Sign Up</Link> /{" "}
                <Link to="/login">Login</Link>
              </>
            )}
          </span>
        </div>
      </div>

      <nav className="navbar__bar navbar navbar-light bg-light shadow-sm">
        <div className="navbar__faux_bg"></div>
        <div className="container">
          <div className="col-6">
            <Link
              to="/"
              className="navbar-brand d-flex flex-column justify-content-center"
            >
              <span className="navbar__title">PRESTA</span>
              <span className="navbar__slogan m-0">car rental</span>
            </Link>
          </div>

          {/* <button */}
          {/*   className="btn btn-warning round-full border-0 mr-3" */}
          {/*   data-target="#bookNow" */}
          {/*   data-toggle="modal" */}
          {/* > */}
          {/*   Book Now */}
          {/* </button> */}
        </div>
      </nav>
      <Modal />
    </>
  );
};

export default Navbar;
