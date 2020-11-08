import React, { useState, useEffect, useContext } from "react";
import { Redirect } from "react-router-dom";
import { AppContext } from "../AppProvider";

const Logout = () => {
  const [authUser, setAuthUser] = useContext(AppContext);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    localStorage.removeItem("appState");

    setAuthUser({
      ...authUser,
      isAuth: false,
      _id: "",
      username: "",
      fullname: "",
      email: "",
    });

    setIsSuccess(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isSuccess) {
    return <Redirect to="/" />;
  }

  return <div>Logout</div>;
};

export default Logout;
