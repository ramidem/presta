import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

const Logout = (props) => {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    localStorage.removeItem("appState");

    props.setAuthUser({
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
