import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AllCars.css";

const AllCars = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => {
        return res.json();
      })
      .then((cars) => {
        setCars(cars);
      });
  }, []);

  return (
    <div className="container">
      <div className="all_cars content_wrapper">
        <h2>All Cars</h2>
        <hr />
        {cars.map((car, i) => {
          return (
            <div className="car_item" key={i}>
              <img src={car.image} alt={car.model} />
              <div className="car_item_details">
                <div>
                  <h3>{car.model}</h3>
                  <p>{car.manufacturer}</p>
                </div>

                <div className="car_item_info">
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
                  <table>
                    <tbody>
                      <tr>
                        <td>Featured</td>
                        <td>{car.isFeatured ? "Yes" : "No"}</td>
                      </tr>
                      <tr>
                        <td>Active</td>
                        <td>{car.isActive ? "Yes" : "No"}</td>
                      </tr>
                      <tr>
                        <td>Daily Rate</td>
                        <td>${car.dailyRate}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div>
                    <Link to={`/car/edit/${car._id}`} className="btn">
                      Update
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCars;
