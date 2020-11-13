import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../../AppProvider";
import { useParams } from "react-router-dom";

import "./CarSingle.css";
import Reserve from "../../components/Reserve/Reserve";
import UpdateStatus from "../../components/UpdateStatus/UpdateStatus";

const CarSingle = () => {
  let { id } = useParams();

  const [authUser] = useContext(AppContext);

  const [car, setCar] = useState({});

  useEffect(() => {
    fetch(`/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
      });
  }, [id]);

  return (
    <>
      <div className="container">
        <div className="carsingle">
          <div className="carsingle_grid">
            <div className="carsingle_image">
              <img src={car.image} alt={car.model} />
            </div>
            <div className="carsingle_description">
              <UpdateStatus
                authUser={authUser}
                id={id}
                car={car}
                setCar={setCar}
              />
              <h2>{car.model}</h2>
              <p>{car.manufacturer}</p>
              <hr />
              <div className="carsingle_price_details">
                <ul>
                  <li>
                    <span>{car.bags}</span> Bags
                  </li>
                  <li>
                    <span>{car.doors}</span> Doors
                  </li>
                  <li>
                    <span>{car.seats}</span> Passengers
                  </li>
                </ul>
                <h5 className="carsingle_price">
                  ${car.dailyRate}
                  <span>daily</span>
                </h5>
              </div>
              <Reserve car={car} authUser={authUser} />
            </div>
          </div>

          <div className="carsingle_about">
            <h3>About</h3>
            <hr />
            <p>{car.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarSingle;
