import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const URL = "https://api-presta-app.herokuapp.com";

  useEffect(() => {
    fetch(`${URL}/reservations`, {
      headers: {
        Authorization: `Bearer ${localStorage["appState"]}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((reservations) => {
        setReservations(reservations);
        setIsLoading(false);
      });
  }, []);

  let collapsibleList = reservations.map((reservation) => {
    let created = moment(reservation.createdAt).format("MMM DD, YYYY");
    let from = moment(reservation.startDate).format("MMM DD, YYYY");
    let until = moment(reservation.endDate).format("MMM DD, YYYY");

    let { model } = reservation.carId;

    return (
      <div class="card border-0">
        <div
          class="card-header d-flex justify-content-between align-items-center"
          id={`headingOne${reservation._id}`}
        >
          <h2 class="mb-0">
            <button
              class="btn btn-link text-left text-dark"
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
          class="collapse"
          aria-labelledby={`headingOne${reservation._id}`}
          data-parent="#accordionExample"
        >
          <div class="card-body">
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
          <div class="accordion" id="accordionExample">
            {isLoading ? (
              <div className="row d-flex justify-content-center">
                <div className="text-center">
                  <div className="spinner-border" role="status"></div>
                </div>
              </div>
            ) : (
              collapsibleList
            )}
          </div>
          {/* accordion */}
        </div>
      </div>
    </div>
  );
};

export default Reservations;
