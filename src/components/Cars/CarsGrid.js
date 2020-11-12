// import Link from "next/link";

import styles from "./CarsGrid.module.css";

export default function CarsGrid({ cars }) {
  let activeCars = cars.filter((car) => car.isActive === true);

  return (
    <div className="container">
      <div className={styles.carsgrid}>
        {activeCars.map((car) => {
          return (
            <div className={styles.carsgrid_item} key={car._id}>
              <img
                src={`https://presta-app-frontend.herokuapp.com/${car.image}`}
                alt={car.model}
              />
              <div className={styles.carsgrid_item_details}>
                <h5>{car.model}</h5>
                <h6>
                  ${car.dailyRate}
                  <span className="small"> /day</span>
                </h6>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
