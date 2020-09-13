import React from "react";
import "./../../css/SideBarNav.css";

const SideBarNav = (props) => {
  return (
    <div className="sidebarnav shadow-sm d-none d-md-block">
      <div>
        <a className="sidebarnav__brand" href="/">
          <img
            className="sidebarnav__brand__img img-fluid"
            src="https://avatars3.githubusercontent.com/u/581795?s=460&u=674e33087c4abf6a41fa1625b0af48b53094d6fd&v=4"
            alt="Presta Logo"
            loading="lazy"
          />
        </a>
      </div>

      <ul class="sidebarnav__list list-group list-group-flush">
        <li class="list-group-item">
          <a href="/">cars</a>
        </li>
        <li class="list-group-item">
          <a href="/">reservations</a>
        </li>
        <li class="list-group-item">
          <a href="/">account</a>
        </li>
      </ul>
    </div>
  );
};

export default SideBarNav;
