import React from "react";

import firstCarousel from "../images/firstCarousel.jpg";
import secondCarousel from "../images/secondCarousel.jpg";
import thirdCarousel from "../images/thirdCarousel.jpg";

const Carousel = () => {
  return (
    <div>
      <div className="carouselClass">
        <div id="homePageCarousel" class="carousel slide" data-ride="carousel">
          <ol class="carousel-indicators">
            <li
              data-target="#homePageCarousel"
              data-slide-to="0"
              class="active"
            ></li>
            <li data-target="#homePageCarousel" data-slide-to="1"></li>
            <li data-target="#homePageCarousel" data-slide-to="2"></li>
          </ol>
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img
                class="d-block w-100 carouselImg"
                src={firstCarousel}
                alt="First slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100 carouselImg"
                src={secondCarousel}
                alt="Second slide"
              />
            </div>
            <div class="carousel-item">
              <img
                class="d-block w-100 carouselImg"
                src={thirdCarousel}
                alt="Third slide"
              />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#homePageCarousel"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only"></span>
          </a>
          <a
            class="carousel-control-next"
            href="#homePageCarousel"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only"></span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
