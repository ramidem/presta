import React, { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import moment from "moment";
import { AppContext } from "../../AppProvider";

import "./ReservationSingle.css";

const ReservationSingle = () => {
  let { id } = useParams();

  const [authUser] = useContext(AppContext);

  const [reservation, setReservation] = useState({});
  const [customer, setCustomer] = useState({});
  const [car, setCar] = useState({});

  const [status, setStatus] = useState({
    status: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = (e) => {
    setStatus({
      ...status,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusUpdate = (e) => {
    e.preventDefault();

    setIsLoading(true);

    fetch(`/api/reservations/${id}`, {
      method: "put",
      body: JSON.stringify(status),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage["appState"]}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setReservation({
          ...reservation,
          status: data.status,
        });
        setIsLoading(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
      });
  };

  useEffect(() => {
    fetch(`/api/reservations/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage["appState"]}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReservation(data);
        setCustomer(data.customerId);
        setCar(data.carId);
        setStatus(data.status);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!authUser.isAuth) {
    return <Redirect to="/" />;
  }

  let created = moment(reservation.createdAt).format("MMM DD, YYYY");
  let from = moment(reservation.startDate).format("MMM DD, YYYY");
  let until = moment(reservation.endDate).format("MMM DD, YYYY");

  return (
    <div className="container">
      <div className="content_wrapper">
        <h2>Reservations</h2>
        <hr />

        <div className="reservation_single">
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
                  Car Model
                </th>
                <td className="text-right">{car.model}</td>
              </tr>

              <tr>
                <th scope="row" className="text-muted">
                  Manufacturer
                </th>
                <td className="text-right">{car.manufacturer}</td>
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
          {authUser.isAdmin ? (
            <div className="reservation_single_update_btn">
              <form className="input-group" onSubmit={handleStatusUpdate}>
                <select
                  id="inputState"
                  class="form-control"
                  name="status"
                  onChange={handleStatusChange}
                  disabled={isLoading}
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Returned">Returned</option>
                </select>
                <button className="btn" disabled={isLoading}>
                  Update
                </button>
              </form>
            </div>
          ) : (
            ""
          )}

          <hr />

          <div className="reservation_item-details">
            <img src={car.image} className="card-img" alt={car.model} />
            <div>
              <h5>{car.model}</h5>
              <p>{car.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationSingle;
