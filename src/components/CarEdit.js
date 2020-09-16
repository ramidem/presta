import React, { useState, useEffect } from "react";
import InputGroup from "./partials/InputGroup";
import AlertMessage from "./partials/AlertMessage";
import { useParams, Link } from "react-router-dom";

const CarEdit = (props) => {
  let { id } = useParams();

  const [car, setCar] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({
    hasError: false,
    color: "",
    message: "",
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

  const URL = "https://api-presta-app.herokuapp.com";

  useEffect(() => {
    fetch(`${URL}/cars/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCar(data);
      });
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

    fetch(`${URL}/cars/${id}`, OPTIONS)
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        setError({
          hasError: true,
          color: "success",
          message: "Updated successful",
        });
      });
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 col-md-8 col-lg-6 mx-auto bg-white shadow p-5">
          <h4 className="text-center">Update Car</h4>
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
              value={car.model}
              handleChange={handleChange}
            />

            <div className="row">
              <div className="col-8">
                <InputGroup
                  name="manufacturer"
                  type="text"
                  displayName="Manufacturer"
                  value={car.manufacturer}
                  handleChange={handleChange}
                />
              </div>

              <div className="col-4">
                <InputGroup
                  name="dailyRate"
                  type="number"
                  min="0"
                  displayName="Daily Rate"
                  value={car.dailyRate}
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
                  value={car.doors}
                  handleChange={handleChange}
                />
              </div>

              <div className="col-4">
                <InputGroup
                  name="seats"
                  type="number"
                  min="0"
                  displayName="Seats"
                  value={car.seats}
                  handleChange={handleChange}
                />
              </div>

              <div className="col-4">
                <InputGroup
                  name="bags"
                  type="number"
                  min="0"
                  displayName="Bags"
                  value={car.bags}
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
                value={car.description}
              ></textarea>
            </div>

            <div className="row d-flex justify-content-between align-items-end px-2">
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
                    &nbsp; Update Car
                  </>
                ) : (
                  "Update Car"
                )}
              </button>
              <Link to={`/car/${car._id}`} className="small text-uppercase">
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
