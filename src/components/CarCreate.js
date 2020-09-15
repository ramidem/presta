import React, { useState } from "react";
import AlertMessage from "./partials/AlertMessage";
import InputGroup from "./partials/InputGroup";

const CarCreate = () => {
  const [car, setCar] = useState({
    model: "",
    manufacturer: "",
    description: "",
    size: "",
    doors: 0,
    airbags: 0,
    seats: 0,
  });

  const [error, setError] = useState({
    hasError: false,
    color: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const URL = "https://api-presta-app.herokuapp.com";
  const METHOD = {
    method: "post",
    body: JSON.stringify(car),
    headers: {
      Authorization: `Bearer ${localStorage["appState"]}`,
    },
  };

  const handleChange = (e) => {
    setCar({
      ...car,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    fetch(`${URL}/cars`, METHOD)
      .then((res) => {
        if (res.status === 400) {
          setError({
            hasError: true,
            color: "danger",
            message: "All fields required",
          });
        }

        setIsLoading(false);

        return res.json();
      })
      .then((data) => {
        console.log(data);
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
            <InputGroup
              name="manufacturer"
              type="text"
              displayName="Manufacturer"
              handleChange={handleChange}
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

            <InputGroup
              name="size"
              type="text"
              displayName="Size"
              handleChange={handleChange}
            />
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
              name="airbags"
              type="number"
              min="0"
              displayName="Bags"
              handleChange={handleChange}
            />

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
