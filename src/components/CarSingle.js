import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppProvider";
import { useParams, Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const CarSingle = (props) => {
  const [authUser] = useContext(AppContext);

  let { id } = useParams();
  const [car, setCar] = useState({});
  const [reservation, setReservation] = useState({
    startDate: "",
    endDate: "",
    carId: "",
    customerId: "",
  });

  const [isRedirect, setIsRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [duration, setDuration] = useState(null);
  const [total, setTotal] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const from = moment(startDate).format("MM/DD/YYYY");
  const until = moment(endDate).format("MM/DD/YYYY");

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    const oneDay = 24 * 60 * 60 * 1000;

    if (end) {
      setDuration(Math.round(Math.abs(end - start) / oneDay) + 1);
    }

    setReservation({
      ...reservation,
      startDate: start,
      endDate: end,
      customerId: authUser._id,
      carId: id,
    });
  };

  const URL = "https://api-presta-app.herokuapp.com";

  useEffect(() => {
    fetch(`${URL}/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (duration) {
      setTotal(car.dailyRate * duration);
    }
  });

  const handleDelete = (e) => {
    setIsLoading(true);

    fetch(`${URL}/cars/${id}`, {
      method: "delete",
      headers: {
        Authorization: `Bearer ${localStorage["appState"]}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setIsRedirect(true);
      });
  };

  if (isRedirect) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch("https://api-presta-app.herokuapp.com/reservations", {
      method: "post",
      body: JSON.stringify(reservation),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage["appState"]}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 col-md-8 bg-white shadow-sm pt-3">
          <div className="row">
            <div className="col d-flex justify-content-between align-items-end">
              <h2>{car.model}</h2>
              <h5>
                ${car.dailyRate}
                <span className="small text-muted">/day</span>
              </h5>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="card m-2">
              <img
                src={
                  car.image
                    ? `${URL}/${car.image}`
                    : "https://dummyimage.com/800x600/474747/d3af37&text=presta%20car%20rental"
                }
                alt={car.model}
                className="img-fluid"
              />
            </div>
          </div>
          <div className="row my-5">
            <div className="col-12 col-md-8">
              <p>{car.description}</p>
            </div>
            <div className="col-12 col-md-4">
              <ul className="list-group list-group-flush small">
                <li className="list-group-item">{car.seats} Passengers</li>
                <li className="list-group-item">{car.doors} Doors</li>
                <li className="list-group-item">{car.bags} Bags/Luggages</li>
                <li className="list-group-item">
                  {car.isAvailable ? "Available" : "Not Available"}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4 bg-white shadow-sm">
          {authUser.isAdmin ? (
            <div className="row">
              <div className="col-6 text-center">
                <Link
                  to={`/car/${id}/edit-car`}
                  className="btn btn-sm btn-block btn-info round-full"
                >
                  Update
                </Link>
              </div>
              <div className="col-6 text-center">
                <button
                  type="button"
                  className="btn btn-sm btn-block btn-danger round-full"
                  data-toggle="modal"
                  data-target="#exampleModal"
                >
                  Delete
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
          <div className="row mt-5 ">
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-column align-items-center justify-content-center">
                <DatePicker
                  selected={startDate}
                  onChange={onChange}
                  startDate={startDate}
                  endDate={endDate}
                  selectsRange
                  inline
                />
              </div>
              <table className="table">
                <tbody>
                  <tr>
                    <th scope="row" className="text-muted">
                      From
                    </th>
                    <td className="text-right">{from ? from : "00/00/0000"}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-muted">
                      Until
                    </th>
                    <td className="text-right">
                      {until !== "Invalid date" ? until : "00/00/0000"}
                    </td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-muted">
                      Days
                    </th>
                    <td className="text-right">{duration ? duration : "0"}</td>
                  </tr>
                  <tr>
                    <th scope="row" className="text-muted">
                      Total
                    </th>
                    <td className="text-right">
                      {total ? `$ ${total}` : "$ 0"}
                    </td>
                  </tr>
                </tbody>
              </table>
              {total && endDate ? (
                authUser.isAuth ? (
                  <button className="btn btn-warning" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <div
                          className="spinner-border spinner-border-sm text-light"
                          role="status"
                        ></div>
                        &nbsp; Confirm
                      </>
                    ) : (
                      "Confirm"
                    )}
                  </button>
                ) : (
                  <Link to="/login" className="btn btn-warning">
                    Confirm
                  </Link>
                )
              ) : (
                <button className="btn btn-warning" disabled>
                  Confirm
                </button>
              )}
            </form>
          </div>
        </div>
        {/* MODAL */}
        <div
          // className="modal fade"
          className={isRedirect ? "" : "modal fade"}
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog rounded-0 border-0">
            <div className="modal-content">
              <div className="modal-body my-3">
                Are you sure you want to delete this item?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-sm btn-danger round-full"
                  onClick={handleDelete}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div
                        className="spinner-border spinner-border-sm text-light"
                        role="status"
                      ></div>
                      &nbsp; Yes, delete
                    </>
                  ) : (
                    "Yes, delete"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSingle;
