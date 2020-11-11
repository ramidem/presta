import { Component } from "react";
import Slider from "react-slick";
import styles from "./SlickShowcase.module.css";

class SlickShowcase extends Component {
  render() {
    const settings = {
      autoplay: true,
      infinite: true,
      speed: 10000,
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
      <div className={styles.slickshowcase}>
        <Slider {...settings}>
          <div className={styles.slickshowcase_item}>
            <img src="/images/lambo.png" />
            <div className={styles.slickshowcase_item_description}>
              <h3>Car One</h3>
              <p>Car One Brand</p>
            </div>
          </div>

          <div className={styles.slickshowcase_item}>
            <img src="/images/lambo.png" />
            <div className={styles.slickshowcase_item_description}>
              <h3>Car One</h3>
              <p>Car One Brand</p>
            </div>
          </div>

          <div className={styles.slickshowcase_item}>
            <img src="/images/lambo.png" />
            <div className={styles.slickshowcase_item_description}>
              <h3>Car One</h3>
              <p>Car One Brand</p>
            </div>
          </div>

          <div className={styles.slickshowcase_item}>
            <img src="/images/lambo.png" />
            <div className={styles.slickshowcase_item_description}>
              <h3>Car One</h3>
              <p>Car One Brand</p>
            </div>
          </div>

          <div className={styles.slickshowcase_item}>
            <img src="/images/lambo.png" />
            <div className={styles.slickshowcase_item_description}>
              <h3>Car One</h3>
              <p>Car One Brand</p>
            </div>
          </div>

          <div className={styles.slickshowcase_item}>
            <img src="/images/lambo.png" />
            <div className={styles.slickshowcase_item_description}>
              <h3>Car One</h3>
              <p>Car One Brand</p>
            </div>
          </div>

          <div className={styles.slickshowcase_item}>
            <img src="/images/lambo.png" />
            <div className={styles.slickshowcase_item_description}>
              <h3>Car One</h3>
              <p>Car One Brand</p>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}

export default SlickShowcase;

