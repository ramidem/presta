import React, { useState, useEffect, useContext } from "react";
import moment from "moment";
import { Link, Redirect } from "react-router-dom";
import { AppContext } from "../AppProvider";

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
  const [authUser] = useContext(AppContext);
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRedirect, setIsRedirect] = useState(false);

  const URL = "https://api-presta-app.herokuapp.com";

  useEffect(() => {
    fetch(`${URL}/reservations`, {
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
    return <Redirect to="/not-allowed" />;
  }

  let collapsibleList = reservations.map((reservation) => {
    let created = moment(reservation.createdAt).format("MMM DD, YYYY");
    let from = moment(reservation.startDate).format("MMM DD, YYYY");
    let until = moment(reservation.endDate).format("MMM DD, YYYY");

    let { model } = reservation.carId;

    return (
      <div className="card border-0" key={reservation._id}>
        <div
          className="card-header d-flex justify-content-between align-items-center"
          id={`headingOne${reservation._id}`}
        >
          <h2 className="mb-0">
            <button
              className="btn btn-link text-left text-dark"
              type="button"
              data-toggle="collapse"
              data-target={`#collapseOne${reservation._id}`}
              aria-controls={`collapseOne${reservation._id}`}
              aria-expanded="true"
            >
              {created}
            </button>
          </h2>
          <span className="small text-muted text-italic text-uppercase">
            {reservation.status}
          </span>
        </div>

        <div
          id={`collapseOne${reservation._id}`}
          className="collapse"
          aria-labelledby={`headingOne${reservation._id}`}
          data-parent="#accordionExample"
        >
          <div className="card-body">
            <table className="table">
              <tbody>
                <tr>
                  <th scope="row" className="text-muted">
                    Customer
                  </th>
                  <td className="text-right">
                    {reservation.customerId.fullname}
                  </td>
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
            <Link
              to={`reservation/${reservation._id}`}
              className="btn btn-outline-dark"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 col-md-8 col-lg-6 mx-auto bg-white shadow p-5">
          <h4 className="text-center">Reservations</h4>
          <hr />

          {/* accordion */}
          <div className="accordion" id="accordionExample">
            {isLoading ? (
              <div className="row d-flex justify-content-center">
                <div className="text-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              </div>
            ) : collapsibleList.length > 0 ? (
              collapsibleList
            ) : (
              <Check />
            )}
          </div>
          {/* accordion */}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
