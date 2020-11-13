import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../AppProvider";
import { useParams, Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

import "./CarSingle.css";

const CarSingle = () => {
  let { id } = useParams();

  const [authUser] = useContext(AppContext);

  const [car, setCar] = useState({});
  const [reservation, setReservation] = useState({
    startDate: "",
    endDate: "",
    carId: "",
    customerId: "",
  });

  const [isRedirect, setIsRedirect] = useState(false);
  const [isReserved, setIsReserved] = useState({
    reserveId: "",
    success: false,
  });
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

  useEffect(() => {
    fetch(`/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
      });
  }, [id]);

  useEffect(() => {
    if (duration) {
      setTotal(car.dailyRate * duration);
    }
  }, [car, duration]);

  const handleClick = (e) => {
    e.preventDefault();
    setCar({
      ...car,
      isActive: false,
    });
  };

  const handleDelete = () => {
    setIsLoading(true);

    fetch(`/api/cars/${id}`, {
      method: "put",
      body: JSON.stringify(car),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage["appState"]}`,
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setIsLoading(false);
        setIsRedirect(true);
      });
  };

  if (isRedirect) {
    return <Redirect to="/" />;
  }

  if (isReserved.success) {
    return <Redirect to={`/reservation/${isReserved.reserveId}`} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch("/api/reservations", {
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
        setIsReserved({
          reserveId: data._id,
          success: true,
        });
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="container">
        <div className="carsingle">
          <div className="carsingle_grid">
            <div className="carsingle_image">
              <img src={car.image} alt={car.model} />
            </div>
            <div className="carsingle_description">
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
              {/* book */}
              <form onSubmit={handleSubmit}>
                <div>
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
                      <td className="text-right">
                        {from ? from : "00/00/0000"}
                      </td>
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
                      <td className="text-right">
                        {duration ? duration : "0"}
                      </td>
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
                  authUser.isAuth && !authUser.isAdmin ? (
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

          <div className="carsingle_about">
            <h3>About</h3>
            <hr />
            <p>{car.description}</p>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-md-8 bg-white shadow-sm pt-3">
            <div className="row">
              <div className="col d-flex justify-content-between align-items-end"></div>
            </div>
            <hr />
            <div className="row">
              <div className="card m-2"></div>
            </div>
            <div className="row my-5">
              <div className="col-12 col-md-8"></div>
              <div className="col-12 col-md-4">
                <ul className="list-group list-group-flush small">
                  <li className="list-group-item">
                    {car.isAvailable ? "Available" : "Not Available"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 bg-white shadow-sm">
            {authUser.isAdmin ? (
              <div className="row mt-5">
                <div className="col-6 text-center">
                  <Link
                    to={`/car/edit/${id}`}
                    className="btn btn-sm btn-block btn-info round-full"
                  >
                    Update
                  </Link>
                </div>
                <div className="col-6 text-center">
                  <button
                    type="button"
                    className="btn btn-sm btn-block btn-primary round-full"
                    data-toggle="modal"
                    data-target="#exampleModal"
                    onClick={handleClick}
                  >
                    Inactive
                  </button>
                </div>
              </div>
            ) : (
              <div className="row mt-5 mb-5">
                <div className="col d-flex flex-column align-items-center justify-content-center"></div>
              </div>
            )}
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
                  Set car from 'Active' to 'Inactive'?
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary round-full"
                    onClick={handleDelete}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div
                          className="spinner-border spinner-border-sm text-light"
                          role="status"
                        ></div>
                        &nbsp; Yes
                      </>
                    ) : (
                      "Yes"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarSingle;
