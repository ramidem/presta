import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import AlertMessage from "../../components/partials/AlertMessage";
import InputGroup from "../../components/partials/InputGroup";
import { AppContext } from "../../AppProvider";

import "./Login.css";

const Login = () => {
  const [authUser, setAuthUser] = useContext(AppContext);

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

  const OPTIONS = {
    method: "post",
    body: JSON.stringify(authUser),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const handleChange = (e) => {
    setAuthUser({
      ...authUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);

    fetch("/api/users/login", OPTIONS)
      .then((res) => {
        if (res.status !== 200) {
          setError({
            hasError: true,
            color: "danger",
            message: "Check your credentials",
          });
        }

        return res.json();
      })
      .then((data) => {
        if (data.token) {
          localStorage["appState"] = data.token;

          setAuthUser({
            isAuth: true,
            _id: data.user._id,
            username: data.user.username,
            fullname: data.user.fullname,
            email: data.user.email,
            isAdmin: data.user.isAdmin,
          });

          setIsSuccess(true);
        } else {
          setIsLoading(false);
        }
      });
  };

  return (
    <div className="content_wrapper login_container">
      <h2>Login</h2>
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
            name="password"
            type="password"
            displayName="Password"
            handleChange={handleChange}
          />

          <button
            className="btn btn-warning round-full border-0 mt-3"
            disabled={isLoading}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
