import React, { useState, useEffect, useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import moment from "moment";
import { AppContext } from "../AppProvider";

const ReservationSingle = (props) => {
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
    return <Redirect to="/not-allowed" />;
  }

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
              {authUser.isAdmin ? (
                <tr>
                  <th scope="row" colSpan="2">
                    <div className="row">
                      <div className="col-6"></div>
                      <div className="col-6">
                        <form
                          className="input-group"
                          onSubmit={handleStatusUpdate}
                        >
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
                          <div className="input-group-append">
                            <button
                              className="btn btn-outline-primary"
                              disabled={isLoading}
                            >
                              Update
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </th>
                </tr>
              ) : (
                ""
              )}
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
