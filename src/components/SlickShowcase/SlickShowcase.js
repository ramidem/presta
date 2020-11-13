import React, { Component } from "react";
import Slider from "react-slick";
import "./SlickShowcase.css";

class SlickShowcase extends Component {
  render() {
    const settings = {
      autoplay: true,
      infinite: true,
      speed: 20000,
      autoplaySpeed: 100,
      slidesToShow: 3,
      slidesToScroll: 1,
      centerMode: true,
      className: "center",
      cssEase: "linear",
      arrows: false,
      responsive: [
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <div className="slickshowcase">
        <Slider {...settings}>
          {this.props.featuredCars.map((featured, i) => {
            return (
              <div className="slickshowcase_item" key={i}>
                <img src={featured.image} alt={featured.model} />
                <div className="slickshowcase_item_description">
                  <h3>{featured.model}</h3>
                  <p>{featured.manufacturer}</p>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    );
  }
}

export default SlickShowcase;
