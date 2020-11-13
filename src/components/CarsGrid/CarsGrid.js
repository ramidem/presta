import React from "react";
import { Link } from "react-router-dom";
import "./CarsGrid.css";

const CarsGrid = ({ activeCars }) => {
  return (
    <div className="container">
      <div className="carsgrid">
        {activeCars.map((car, i) => {
          return (
            <div className="carsgrid_item" key={i}>
              <Link to={`/car/${car._id}`}>
                <img src={car.image} alt={car.model} />
                <div className="carsgrid_item_details">
                  <h5>{car.model}</h5>
                  <h6>
                    ${car.dailyRate}
                    <span className="small"> /day</span>
                  </h6>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CarsGrid;
