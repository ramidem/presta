import React, { useState, useEffect, useContext } from "react";
import InputGroup from "../../components/partials/InputGroup";
import AlertMessage from "../../components/partials/AlertMessage";
import { useParams, Link, Redirect } from "react-router-dom";
import { AppContext } from "../../AppProvider";

import "./CarEdit.css";

const CarEdit = () => {
  let { id } = useParams();

  const [authUser] = useContext(AppContext);
  const [car, setCar] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    hasError: false,
    color: "",
    message: "",
  });

  const handleChange = (e) => {
    let value = e.target.value;

    if (value === "true" || value === "false") {
      value = JSON.parse(value);
    }

    setCar({
      ...car,
      [e.target.name]: value,
    });
  };

  const handleChangeFile = (e) => {
    setCar({
      ...car,
      image: e.target.files[0],
    });
  };

  useEffect(() => {
    fetch(`/api/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    formData.append("isFeatured", car.isFeatured);
    formData.append("isActive", car.isActive);
    if (car.image) {
      formData.append("image", car.image);
    }
    const OPTIONS = {
      method: "put",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage["appState"]}`,
      },
    };

    fetch(`/api/cars/${id}`, OPTIONS)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setError({
          hasError: true,
          color: "success",
          message: "Updated successfully",
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      });
  };

  if (!authUser.isAuth) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <div className="content_wrapper">
        <h2>Update Car</h2>
        <hr />
        <div className="car_edit">
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
              value={car.model}
              handleChange={handleChange}
            />

            <div className="car_edit_daily_rate_manufacturer">
              <InputGroup
                name="manufacturer"
                type="text"
                displayName="Manufacturer"
                value={car.manufacturer}
                handleChange={handleChange}
              />

              <InputGroup
                name="dailyRate"
                type="number"
                min="0"
                displayName="Daily Rate"
                value={car.dailyRate}
                handleChange={handleChange}
              />
            </div>

            <div className="car_edit_features">
              <InputGroup
                name="doors"
                type="number"
                min="0"
                displayName="Doors"
                value={car.doors}
                handleChange={handleChange}
              />

              <InputGroup
                name="seats"
                type="number"
                min="0"
                displayName="Seats"
                value={car.seats}
                handleChange={handleChange}
              />

              <InputGroup
                name="bags"
                type="number"
                min="0"
                displayName="Bags"
                value={car.bags}
                handleChange={handleChange}
              />
            </div>

            <div className="form-selects">
              <div className="form-group">
                <label htmlFor="isFeatured">Feature?</label>
                <br />
                <select
                  name="isFeatured"
                  id="isFeatured"
                  onChange={handleChange}
                >
                  <option>- {car.isFeatured ? "Yes" : "No"} -</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="isActive">Active?</label>
                <br />
                <select name="isActive" id="isActive" onChange={handleChange}>
                  <option>- {car.isActive ? "Yes" : "No"} -</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
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
                onChange={handleChange}
                value={car.description}
                rows="6"
                cols="50"
              ></textarea>
            </div>

            <div className="buttons">
              <button className="btn" disabled={isLoading}>
                Update Car
              </button>
              <Link to={`/car/${car._id}`} id="view">
                View
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarEdit;
