import React, { useState } from "react";
import InputGroup from "../../components/partials/InputGroup";
import AlertMessage from "../../components/partials/AlertMessage";
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

    fetch("/api/users/register", METHOD)
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
    <div className="content_wrapper login_container">
      <h2>Register</h2>
      <hr />
      <div className="login">
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
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
