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

    if (appState) {
      fetch("/api/users/profile", {
        headers: {
          Authorization: `Bearer ${localStorage["appState"]}`,
        },
      })
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
