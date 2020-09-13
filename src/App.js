import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import SideBarNav from "./components/SideBarNav";
import Cars from "./components/Cars";
import Car from "./components/Car";
import Reservations from "./components/Reservations";

import "./css/App.css";

function App() {
  return (
    <Router>
      {/* d-block on mb */}
      <Navbar />

      {/* d-none on mb */}
      <SideBarNav />

      <div className="container">
        <Switch>
          <Route exact path="/">
            {/* List all cars */}
            <Cars />
          </Route>

          <Route path="/car">
            {/* List a cars */}
            <Car />
          </Route>

          <Route path="/reservations">
            {/* List a cars */}
            <Reservations />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
