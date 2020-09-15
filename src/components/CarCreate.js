import React, { useState } from "react";
import AlertMessage from "./partials/AlertMessage";
import InputGroup from "./partials/InputGroup";

const CarCreate = () => {
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
    console.log(e.target.files[0]);
  };

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

    const URL = "https://api-presta-app.herokuapp.com";
    const OPTIONS = {
      method: "post",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage["appState"]}`,
      },
    };

    fetch(`${URL}/cars`, OPTIONS)
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
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 col-md-8 col-lg-6 mx-auto bg-white shadow p-5">
          <h4 className="text-center">Create Car</h4>
          <hr />

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

            <div className="row">
              <div className="col-8">
                <InputGroup
                  name="manufacturer"
                  type="text"
                  displayName="Manufacturer"
                  handleChange={handleChange}
                />
              </div>

              <div className="col-4">
                <InputGroup
                  name="dailyRate"
                  type="number"
                  min="0"
                  displayName="Daily Rate"
                  handleChange={handleChange}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-4">
                <InputGroup
                  name="doors"
                  type="number"
                  min="0"
                  displayName="Doors"
                  handleChange={handleChange}
                />
              </div>

              <div className="col-4">
                <InputGroup
                  name="seats"
                  type="number"
                  min="0"
                  displayName="Seats"
                  handleChange={handleChange}
                />
              </div>

              <div className="col-4">
                <InputGroup
                  name="bags"
                  type="number"
                  min="0"
                  displayName="Bags"
                  handleChange={handleChange}
                />
              </div>
            </div>

            <InputGroup
              name="image"
              type="file"
              handleChange={handleChangeFile}
            />

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                className="form-control rounded-0"
                onChange={handleChange}
              />
            </div>

            <button
              className="btn btn-warning round-full border-0 mt-3"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <div
                    className="spinner-border spinner-border-sm text-light"
                    role="status"
                  ></div>
                  &nbsp; Create Car
                </>
              ) : (
                "Create Car"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CarCreate;
