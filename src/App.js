import React from "react";
import { AppProvider } from "./AppProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Error404 from "./Error404";

import CarCreate from "./components/CarCreate";
import CarSingle from "./components/CarSingle";
import CarEdit from "./components/CarEdit";
import Reservations from "./components/Reservations";
import ReservationSingle from "./components/ReservationSingle";
import "./css/App.css";

function App() {
  return (
    <AppProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/logout">
            <Logout />
          </Route>

          <Route exact path="/car/:id">
            <CarSingle />
          </Route>

          <PrivateRoute path="/add-car">
            <CarCreate />
          </PrivateRoute>

          <PrivateRoute path="/car/:id/edit-car">
            <CarEdit />
          </PrivateRoute>

          <PrivateRoute path="/reservations">
            <Reservations />
          </PrivateRoute>

          <PrivateRoute exact path="/reservation/:id">
            <ReservationSingle />
          </PrivateRoute>

          <Route path="*">
            <Error404 />
          </Route>
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
