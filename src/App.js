import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Car from "./components/Car";
import Reservations from "./components/Reservations";

import "./css/App.css";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Navbar />
      <Home />
      <div className="container">
        {/* <Switch> */}
        {/*   <Route exact path="/"> */}
        {/*     {/1* List all cars *1/} */}
        {/*     <Cars /> */}
        {/*   </Route> */}

        {/*   <Route path="/car"> */}
        {/*     {/1* List a cars *1/} */}
        {/*     <Car /> */}
        {/*   </Route> */}

        {/*   <Route path="/reservations"> */}
        {/*     {/1* List a cars *1/} */}
        {/*     <Reservations /> */}
        {/*   </Route> */}
        {/* </Switch> */}
      </div>
    </Router>
  );
}

export default App;
