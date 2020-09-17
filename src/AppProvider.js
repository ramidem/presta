import React, { createContext, useState, useEffect } from "react";

export const AppContext = createContext();
export const AppProvider = (props) => {
  const [authUser, setAuthUser] = useState({
    isAuth: false,
    isAdmin: false,
    _id: "",
    username: "",
    fullname: "",
    email: "",
  });

  useEffect(() => {
    let appState = localStorage["appState"];

    const URL = "https://api-presta-app.herokuapp.com";
    const HEADERS = {
      headers: {
        Authorization: `Bearer ${appState}`,
      },
    };

    if (appState) {
      fetch(`${URL}/users/`, HEADERS)
        .then((res) => res.json())
        .then((data) => {
          if (data._id) {
            setAuthUser({
              isAuth: true,
              _id: data._id,
              username: data.username,
              fullname: data.fullname,
              email: data.email,
              isAdmin: data.isAdmin,
            });
          }
        });
    }
  }, []);
  return (
    <AppContext.Provider value={[authUser, setAuthUser]}>
      {props.children}
    </AppContext.Provider>
  );
};
