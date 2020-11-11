import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "./CarsGrid.module.css";

export default function CarsGrid() {
  const [cars, setCars] = useState([]);

  const URL = "https://api-presta-app.herokuapp.com";

  useEffect(() => {
    fetch(`${URL}/cars`)
      .then((res) => {
        return res.json();
      })
      .then((cars) => {
        setCars(cars);
      });
  }, []);

  let activeCars = cars.filter((car) => car.isActive === true);

  return (
    <div className="container">
      <div className={styles.carsgrid}>
        {activeCars.map((car) => {
          return (
            <Link href="/">
              <a>
                <div className={styles.carsgrid_item} key={car._id}>
                  <img src={`${URL}/${car.image}`} alt={car.model} />
                  <div className={styles.carsgrid_item_details}>
                    <h5>{car.model}</h5>
                    <h6>
                      ${car.dailyRate}
                      <span className="small"> /day</span>
                    </h6>
                  </div>
                </div>
              </a>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
