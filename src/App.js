import React from "react";
import { AppProvider } from "./AppProvider";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import "./App.css";
import Navbar from "./components/NavBar/Navbar";
import Logout from "./components/Logout";
import Error404 from "./pages/404/Error404";

import Home from "./pages/Home/Home";
import AllCars from "./pages/AllCars/AllCars";
import CarSingle from "./pages/CarSingle/CarSingle";
import CarCreate from "./pages/CarCreate/CarCreate";
import CarEdit from "./pages/CarEdit/CarEdit";
import Reservations from "./pages/Reservations/Reservations";
import ReservationSingle from "./pages/Reservations/ReservationSingle";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Footer from "./components/Footer/Footer";

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

          <PrivateRoute path="/all-cars">
            <AllCars />
          </PrivateRoute>

          <PrivateRoute path="/add-car">
            <CarCreate />
          </PrivateRoute>

          <PrivateRoute path="/car/edit/:id">
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
        <Footer />
      </Router>
    </AppProvider>
  );
}

export default App;
