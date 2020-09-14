import React from "react";
import "./../css/Navbar.css";

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
  return (
    <>
      <div className="navbar navbar-dark bg-dark p-0">
        <div className="container">
          <span className="navbar__links navbar-text small ml-auto pr-3 text-uppercase">
            <a href="/">Reservations</a> / <a href="/">Account</a> /{" "}
            <a href="/">Logout</a>
          </span>
        </div>
      </div>

      <nav className="navbar__bar navbar navbar-light bg-light shadow-sm">
        <div className="navbar__faux_bg"></div>
        <div className="container">
          <div className="col-6 navbar__bg">
            <a
              className="navbar-brand d-flex flex-column justify-content-center p-3"
              href="/"
            >
              <span className="navbar__title">PRESTA</span>
              <span className="navbar__slogan m-0">car rental</span>
            </a>
          </div>

          <button
            className="navbar__btn btn btn-primary round-full border-0 btn-lg mr-3"
            data-toggle="modal"
            data-target="#bookNow"
          >
            Book Now
          </button>
          <Modal />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
