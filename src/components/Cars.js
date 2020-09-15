import React from "react";
import "./../css/Cars.css";
import { NavLink } from "react-router-dom";

// https://api-presta-app.herokuapp.com/

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
          <div className="card-body text-center">
            <h5 className="card-title mb-2">Car Name</h5>
            <h6>
              $25
              <span className="small"> /day</span>
            </h6>
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
