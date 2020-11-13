import React, { useEffect, useState } from "react";
import CarsGrid from "./CarsGrid/CarsGrid";
import Jumbotron from "./Jumbotron/Jumbotron";
import SlickShowcase from "./SlickShowcase/SlickShowcase";

const Home = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch("/api/cars")
      .then((res) => {
        return res.json();
      })
      .then((cars) => {
        setCars(cars);
      });
  }, []);

  let featuredCars = cars.filter((car) => car.isFeatured === true);
  let activeCars = cars.filter((car) => car.isActive === true);

  return (
    <>
      <Jumbotron />
      <SlickShowcase featuredCars={featuredCars} />
      <CarsGrid activeCars={activeCars} />
    </>
  );
};

export default Home;
