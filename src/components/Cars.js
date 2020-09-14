import React from "react";
import "./../css/Cars.css";
import { NavLink } from "react-router-dom";

const GridCard = () => {
  return (
    <div className="col mb-4">
      <NavLink to="/car">
        <div className="card border-0 rounded-0">
          <img
            src="http://via.placeholder.com/500"
            className="card-img-top rounded-0"
            alt="Grid Card"
          />
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex flex-column">
                <span className="badge badge-pill badge-secondary mb-2">
                  SUV
                </span>
                <h6>
                  $25
                  <span className="small"> /day</span>
                </h6>
              </div>
              <img
                src="http://via.placeholder.com/100"
                alt="brand"
                width="50px"
                className=" round-full mb-3"
              />
            </div>
            <h5 className="card-title mb-0">Car Name</h5>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

const Cars = (props) => {
  return (
    <>
      {/* CAR */}
      <div className="row">
        <div className="col">
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
            <GridCard />
          </div>
        </div>
      </div>
      {/* CAR */}
    </>
  );
};

export default Cars;
