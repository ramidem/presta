import React, { useState } from "react";
import InputGroup from "./partials/InputGroup";
import AlertMessage from "./partials/AlertMessage";
import { Redirect } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    hasError: false,
    color: "",
    message: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (isSuccess) {
    return <Redirect to="/login" />;
  }

  const URL = "https://api-presta-app.herokuapp.com";
  const METHOD = {
    method: "post",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    fetch(`${URL}/users/register`, METHOD)
      .then((res) => {
        if (res.status === 400) {
          setError({
            hasError: true,
            color: "danger",
            message: "Please check you credentials",
          });
        } else {
          setIsSuccess(true);
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
        <div className="col-8 col-md-6 col-lg-4 mx-auto bg-white shadow p-4">
          <h4 className="text-center">Register</h4>
          <hr />

          {error.hasError ? (
            <AlertMessage color={error.color} message={error.message} />
          ) : (
            ""
          )}

          <form onSubmit={handleSubmit}>
            <InputGroup
              name="username"
              type="text"
              displayName="Username"
              handleChange={handleChange}
            />
            <InputGroup
              name="fullname"
              type="text"
              displayName="Fullname"
              handleChange={handleChange}
            />
            <InputGroup
              name="email"
              type="email"
              displayName="Email"
              handleChange={handleChange}
            />
            <InputGroup
              name="password"
              type="password"
              displayName="Password"
              handleChange={handleChange}
            />
            <InputGroup
              name="confirmPassword"
              type="password"
              displayName="Confirm Password"
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
                  &nbsp; Register
                </>
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
