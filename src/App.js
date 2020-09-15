import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";

import "./css/App.css";
import CarCreate from "./components/CarCreate";
import CarSingle from "./components/CarSingle";

function App() {
  const [authUser, setAuthUser] = useState({
    isAuth: false,
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
            });
          }
        });
    }
  }, []);

  return (
    <Router>
      <Navbar authUser={authUser} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/login">
          <Login authUser={authUser} setAuthUser={setAuthUser} />
        </Route>

        <Route path="/logout">
          <Logout setAuthUser={setAuthUser} />
        </Route>

        <Route path="/car">
          <CarSingle />
        </Route>

        <Route path="/add-car">
          <CarCreate />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
