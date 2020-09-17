import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

const ReservationSingle = (props) => {
  let { id } = useParams();

  const [reservation, setReservation] = useState({});
  const [customer, setCustomer] = useState({});
  const [car, setCar] = useState({});

  const URL = "https://api-presta-app.herokuapp.com";

  useEffect(() => {
    fetch(`${URL}/reservations/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage["appState"]}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReservation(data);
        setCustomer(data.customerId);
        setCar(data.carId);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let created = moment(reservation.createdAt).format("MMM DD, YYYY");
  let from = moment(reservation.startDate).format("MMM DD, YYYY");
  let until = moment(reservation.endDate).format("MMM DD, YYYY");

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 col-md-8 col-lg-6 mx-auto bg-white shadow p-5">
          <h4 className="text-center">Reservations</h4>
          <hr />

          <table className="table">
            <tbody>
              <tr>
                <th scope="row" className="text-muted">
                  Created
                </th>
                <td className="text-right">{created}</td>
              </tr>

              <tr>
                <th scope="row" className="text-muted">
                  Customer
                </th>
                <td className="text-right">{customer.fullname}</td>
              </tr>

              <tr>
                <th scope="row" className="text-muted">
                  Car
                </th>
                <td className="text-right">{car.model}</td>
              </tr>

              <tr>
                <th scope="row" className="text-muted">
                  From
                </th>
                <td className="text-right">{from}</td>
              </tr>

              <tr>
                <th scope="row" className="text-muted">
                  Until
                </th>
                <td className="text-right">{until}</td>
              </tr>

              <tr>
                <th scope="row" className="text-muted">
                  Total
                </th>
                <td className="text-right">$ {reservation.total}</td>
              </tr>

              <tr>
                <th scope="row" className="text-muted">
                  Status
                </th>
                <td className="text-right">{reservation.status}</td>
              </tr>
            </tbody>
          </table>

          <div className="row">
            <div className="col">
              <div className="card mb-3 border-0 rounded-0">
                <div className="row no-gutters">
                  <div className="col-md-4">
                    <img
                      src={
                        car.image
                          ? `${URL}/${car.image}`
                          : "https://dummyimage.com/800x600/474747/d3af37&text=presta%20car%20rental"
                      }
                      className="card-img"
                      alt={car.model}
                    />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">{car.model}</h5>
                      <p className="card-text">{car.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSingle;
