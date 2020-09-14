import React from "react";
import "./../css/Home.css";
import Cars from "./Cars";

const Home = (props) => {
  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-6">Premium Cars right at your finger tips</h1>
          <p className="lead">Can't Afford it? Rent it</p>
        </div>
      </div>

      <div className="container">
        <Cars />
      </div>
    </>
  );
};

export default Home;
