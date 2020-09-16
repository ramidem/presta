import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const CarSingle = (props) => {
  let { id } = useParams();
  const [car, setCar] = useState({});
  const [reservation, setReservation] = useState({
    startDate: "",
    endDate: "",
    carId: "",
    customerId: "",
  });

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
      customerId: props.authUser._id,
      carId: id,
    });
  };

  const URL = "https://api-presta-app.herokuapp.com/cars/" + id;

  useEffect(() => {
    fetch(`${URL}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
      });
  }, []);

  useEffect(() => {
    if (duration) {
      setTotal(car.dailyRate * duration);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://api-presta-app.herokuapp.com/reservations", {
      method: "post",
      body: JSON.stringify(reservation),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage["appState"]}`,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
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
            <img
              src={
                car.image
                  ? `${URL}/${car.image}`
                  : "https://dummyimage.com/800x600/474747/d3af37&text=presta%20car%20rental"
              }
              alt={car.model}
            />
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
        <div className="col-12 col-md-4 bg-white shadow-sm pt-3">
          <div className="row">
            <div className="col-6 text-center">
              <Link
                to={`/car/${id}/edit-car`}
                className="btn btn-sm btn-block btn-info"
              >
                Update
              </Link>
            </div>
            <div className="col-6 text-center">
              <button className="btn btn-sm btn-block btn-danger">
                Delete
              </button>
            </div>
          </div>
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
              <button className="btn btn-warning">Confirm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarSingle;
