import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const Reserve = ({ car, authUser }) => {
  const [reservation, setReservation] = useState({
    startDate: "",
    endDate: "",
    carId: "",
    customerId: "",
  });

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
      carId: car._id,
    });
  };

  useEffect(() => {
    if (duration) {
      setTotal(car.dailyRate * duration);
    }
  }, [car, duration]);

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
              <td className="text-right">{from ? from : "MM/DD/YYYY"}</td>
            </tr>
            <tr>
              <th scope="row" className="text-muted">
                Until
              </th>
              <td className="text-right">
                {until !== "Invalid date" ? until : "MM/DD/YYYY"}
              </td>
            </tr>
            <tr>
              <th scope="row" className="text-muted">
                Days
              </th>
              <td className="text-right">{duration ? duration : ""}</td>
            </tr>
            <tr>
              <th scope="row" className="text-muted">
                Total
              </th>
              <td className="text-right">{total ? `$ ${total}` : ""}</td>
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
    </>
  );
};

export default Reserve;
