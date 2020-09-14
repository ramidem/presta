import React, { useState } from "react";
import InputGroup from "./partials/InputGroup";
import { Redirect } from "react-router-dom";
import AlertMessage from "./partials/AlertMessage";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState({
    hasError: false,
    color: "",
    message: "",
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (isSuccess) {
    return <Redirect to="/" />;
  }

  const URL = "https://api-presta-app.herokuapp.com";
  const METHOD = {
    method: "post",
    body: JSON.stringify(credentials),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    fetch(`${URL}/users/login`, METHOD)
      .then((res) => {
        if (res.status === 404) {
          setError({
            hasError: true,
            color: "danger",
            message: "Username does not exist",
          });
        } else if (res.status === 400) {
          setError({
            hasError: true,
            color: "danger",
            message: "Please check your credentials",
          });
        } else {
          setIsSuccess(true);
        }

        return res.json();
      })
      .then((data) => {
        // @TODO do something about the returned errors
        // console.log(data);
        setIsLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 col-md-8 col-lg-6 mx-auto bg-white shadow p-5">
          <h4 className="text-center">Login</h4>
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
              name="password"
              type="password"
              displayName="Password"
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
                  &nbsp; Login
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
