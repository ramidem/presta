import React from "react";
import "./../css/Cars.css";
import { NavLink } from "react-router-dom";

const GridCard = () => {
  return (
    <div class="col mb-4">
      <div class="card car-card round-lg shadow">
        <img
          src="http://via.placeholder.com/500"
          class="card-img-top round-lg"
          alt="Grid Card"
        />
        <div class="card-body">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="d-flex flex-column">
              <span className="badge badge-pill badge-secondary mb-2">SUV</span>
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
          <h5 class="card-title">Car Name</h5>
          <p className="small text-muted my-4">
            5 Passengers &bull; 4 Doors &bull; 4 Seats &bull; 2 Bags &bull;
            Automatic
          </p>
          <NavLink to="/car" class="round-full btn btn-primary btn-block">
            Book Now
          </NavLink>
        </div>
      </div>
    </div>
  );
};

const FilterButton = () => {
  return (
    <div className="btn-group">
      <button
        type="button"
        className="btn btn-outline-dark dropdown-toggle round-full"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Filter
      </button>
      <div className="dropdown-menu">
        <a className="dropdown-item" href="#">
          All
        </a>
        <a className="dropdown-item" href="#">
          Small
        </a>
        <a className="dropdown-item" href="#">
          Medium
        </a>
        <a className="dropdown-item" href="#">
          Large
        </a>
        <a className="dropdown-item" href="#">
          SUV
        </a>
      </div>
    </div>
  );
};

const Cars = (props) => {
  return (
    <>
      <div className="row mt-5">
        <div className="col">
          <div className="bg-white shadow-sm p-3 mb-3 d-flex justify-content-between align-items-center round-lg">
            <FilterButton />
            <h5 className="text-muted mb-0">134 Results</h5>
          </div>
        </div>
      </div>

      {/* CAR */}
      <div className="row">
        <div className="col">
          <div class="row row-cols-2 row-cols-md-2 row-cols-lg-3">
            <GridCard />
            <GridCard />
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
