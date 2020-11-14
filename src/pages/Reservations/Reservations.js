import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
// import { AppContext } from "../AppProvider";

import "./Reservations.css";

const Check = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 16 16"
      className="bi bi-calendar2-check"
      fill="#eee"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"
      />
      <path d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z" />
      <path
        fillRule="evenodd"
        d="M10.854 8.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708 0z"
      />
    </svg>
  );
};

const Reservations = () => {
  // const [authUser] = useContext(AppContext);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirect, setIsRedirect] = useState(false);

  useEffect(() => {
    fetch(`/api/reservations`, {
      headers: {
        Authorization: `Bearer ${localStorage["appState"]}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          setIsRedirect(true);
        }
        return res.json();
      })
      .then((reservations) => {
        setReservations(reservations);
        setIsLoading(false);
        setIsRedirect(false);
      });
  }, []);

  if (isRedirect) {
    return <Redirect to="/" />;
  }

  let reservationsList = reservations.map((reservation) => {
    let created = moment(reservation.createdAt).format("MMM DD, YYYY");
    let from = moment(reservation.startDate).format("MMM DD, YYYY");
    let until = moment(reservation.endDate).format("MMM DD, YYYY");

    let { model } = reservation.carId;

    return (
      <div className="reservation_items" key={reservation._id}>
        <div className="reservation_item_head">
          <p>{model}</p>
          <p>{created}</p>
          <p>{reservation.status}</p>
        </div>

        <table className="table">
          <tbody>
            <tr>
              <th scope="row" className="text-muted">
                Customer
              </th>
              <td className="text-right">{reservation.customerId.fullname}</td>
            </tr>

            <tr>
              <th scope="row" className="text-muted">
                Car
              </th>
              <td className="text-right">{model}</td>
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
          </tbody>
        </table>
        <div className="view_link">
          <Link to={`reservation/${reservation._id}`} className="btn">
            View
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="content_wrapper">
        <h2>Reservations</h2>
        <hr />

        <div className="reservations">
          {isLoading ? (
            <Check />
          ) : reservationsList.length > 0 ? (
            reservationsList
          ) : (
            <Check />
          )}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
