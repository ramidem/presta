import React, { useState, useEffect } from "react";
import "./../css/Cars.css";
import { Link } from "react-router-dom";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => {
        return res.json();
      })
      .then((cars) => {
        setCars(cars);
        setIsLoading(false);
      });
  }, []);

  let activeCars = cars.filter((car) => car.isActive === true);

  let carsGrid = activeCars.map((car) => {
    return (
      <div className="col mb-4" key={car._id}>
        <Link to={`/car/${car._id}`}>
          <div className="card border-0 rounded-0">
            <img
              src={car.image}
              className="card-img-top rounded-0"
              alt={car.model}
              height="150px"
            />
            <div className="card-body text-center">
              <h5 className="card-title mb-2">{car.model}</h5>
              <h6>
                ${car.dailyRate}
                <span className="small"> /day</span>
              </h6>
            </div>
          </div>
        </Link>
      </div>
    );
  });

  return (
    <>
      {/* CAR */}
      <div className="row">
        <div className="col">
          {isLoading ? (
            <div className="row d-flex justify-content-center">
              <div className="text-center">
                <div className="spinner-border" role="status"></div>
              </div>
            </div>
          ) : (
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4">
              {carsGrid}
            </div>
          )}
        </div>
      </div>
      {/* CAR */}
    </>
  );
};

export default Cars;
