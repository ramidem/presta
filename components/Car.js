import React from "react";

const Car = (props) => {
  return (
    <div className="row">
      <div className="bg-white">
        <img
          src="http://via.placeholder.com/500"
          class="card-img-top round-lg"
          alt="Grid Card"
        />
      </div>
      <div className="col-12 col-md-8">
        <div class="card car-card round-lg shadow">
          <img
            src="http://via.placeholder.com/500"
            class="card-img-top round-lg"
            alt="Grid Card"
          />
          <div class="card-body">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div className="d-flex flex-column">
                <span className="badge badge-pill badge-secondary mb-2">
                  SUV
                </span>
                <h6>
                  $25
                  <span className="small"> /day</span>
                </h6>
              </div>
              <img
                src="http://via.placeholder.com/100"
                alt="brand"
                width="50px"
                className=" round-full mb-3"
              />
            </div>
            <h5 class="card-title">Car Name</h5>
            <p className="small text-muted my-4">
              5 Passengers &bull; 4 Doors &bull; 4 Seats &bull; 2 Bags &bull;
              Automatic
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
