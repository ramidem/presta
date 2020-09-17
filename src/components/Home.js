import React from "react";
import "./../css/Home.css";
import Cars from "./Cars";

const Home = (props) => {
  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <div className="col-12 col-md-8 col-lg-8 mr-auto">
            <h1 className="display-6 mb-0">Premium Cars</h1>
            <p className="lead text-uppercase">Can't Afford it? Rent it</p>
          </div>
        </div>
      </div>

      <div className="container">
        <Cars />
      </div>
    </>
  );
};

export default Home;
