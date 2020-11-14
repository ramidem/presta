import React, { useState, useContext } from "react";
import AlertMessage from "../../components/partials/AlertMessage";
import InputGroup from "../../components/partials/InputGroup";
import { Redirect } from "react-router-dom";
import { AppContext } from "../../AppProvider";

import "./CarCreate.css";

const CarCreate = () => {
  const [authUser] = useContext(AppContext);
  const [car, setCar] = useState({
    model: "",
    manufacturer: "",
    description: "",
    image: "",
    doors: 0,
    bags: 0,
    seats: 0,
    dailyRate: 0,
  });

  const [error, setError] = useState({
    hasError: false,
    color: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isRedirect, setIsRedirect] = useState({
    newId: "",
    success: false,
  });

  const handleChange = (e) => {
    setCar({
      ...car,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeFile = (e) => {
    setCar({
      ...car,
      image: e.target.files[0],
    });
  };

  if (isRedirect.success) {
    return <Redirect to={`/car/${isRedirect.newId}`} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    let formData = new FormData();
    formData.append("model", car.model);
    formData.append("manufacturer", car.manufacturer);
    formData.append("description", car.description);
    formData.append("doors", car.doors);
    formData.append("bags", car.bags);
    formData.append("seats", car.seats);
    formData.append("dailyRate", car.dailyRate);

    formData.append("image", car.image);

    const OPTIONS = {
      method: "post",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage["appState"]}`,
      },
    };

    fetch("/api/cars", OPTIONS)
      .then((res) => {
        if (res.status === 400) {
          setError({
            hasError: true,
            color: "danger",
            message: "All fields required",
          });
        }

        return res.json();
      })
      .then((data) => {
        if (data._id) {
          setIsRedirect({
            ...isRedirect,
            newId: data._id,
            success: true,
          });
        }
        setIsLoading(false);
      });
  };

  if (!authUser.isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="content_wrapper">
        <h2>Create Car</h2>
        <hr />

        <div className="car_create">
          {error.hasError ? (
            <AlertMessage color={error.color} message={error.message} />
          ) : (
            ""
          )}

          <form onSubmit={handleSubmit}>
            <InputGroup
              name="model"
              type="text"
              displayName="Model"
              handleChange={handleChange}
            />

            <div className="car_create_daily_rate_manufacturer">
              <InputGroup
                name="manufacturer"
                type="text"
                displayName="Manufacturer"
                handleChange={handleChange}
              />

              <InputGroup
                name="dailyRate"
                type="number"
                min="0"
                displayName="Daily Rate"
                handleChange={handleChange}
              />
            </div>

            <div className="car_create_features">
              <InputGroup
                name="doors"
                type="number"
                min="0"
                displayName="Doors"
                handleChange={handleChange}
              />

              <InputGroup
                name="seats"
                type="number"
                min="0"
                displayName="Seats"
                handleChange={handleChange}
              />

              <InputGroup
                name="bags"
                type="number"
                min="0"
                displayName="Bags"
                handleChange={handleChange}
              />
            </div>

            <div className="form-file">
              <InputGroup
                name="image"
                type="file"
                handleChange={handleChangeFile}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                className="form-control rounded-0"
                onChange={handleChange}
                rows="6"
                cols="50"
              />
            </div>

            <div className="buttons">
              <button
                className="btn btn-warning round-full border-0 mt-3"
                disabled={isLoading}
              >
                Create Car
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarCreate;
