import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./UpdateStatus.css";

const UpdateStatus = ({ authUser, id, car, setCar }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (car.isActive && car.isFeatured) {
      setCar({
        ...car,
        isFeatured: false,
        isActive: false,
      });
    } else {
      setCar({
        ...car,
        isActive: !car.isActive,
      });
    }
  };

  useEffect(() => {
    setIsLoading(true);

    fetch(`/api/cars/${id}`, {
      method: "put",
      body: JSON.stringify(car),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage["appState"]}`,
      },
    }).then((res) => {
      setIsLoading(false);
      return res.json();
    });
  }, [id, setCar, car]);

  return (
    <>
      {authUser.isAdmin ? (
        <div className="update-status">
          <Link to={`/car/edit/${id}`} className="btn">
            Update
          </Link>
          <button
            type="button"
            className="btn"
            onClick={(e) =>
              window.confirm(
                `Set car to ${car.isActive ? "Inactive" : "Active"} Status?`
              ) && handleClick(e)
            }
            disabled={isLoading}
          >
            {car.isActive ? "Set Inactive" : "Set Active"}
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UpdateStatus;
