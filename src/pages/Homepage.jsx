import React, { useEffect, useState } from "react";
import { assets } from "../mock/asset";
import { Link } from "react-router-dom";
import { LuArrowRight } from "react-icons/lu";

import "./../styles/home.scss";
import { showroom } from "../mock/cars";
import CarCard from "../components/CarCard";
import { reviews } from "../mock/reviews";
import ReviewCard from "../components/ReviewCard";
import { FaArrowRightLong } from "react-icons/fa6";
import ImageGallery from "../components/Gallery";
import { api } from "../api/api";
import toast from "react-hot-toast";

const calcAvgRating = (reviews) => {
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return (totalRating / reviews.length).toFixed(1);
};

const servicesList = [
  {
    count: "01",
    title: "Car Rental",
    descr: "Explore our wide range of rental cars.",
  },
  {
    count: "02",
    title: "Airport Transfers",
    descr: "Reliable and comfortable airport transfer services.",
  },
  // {
  //   count: "03",
  //   title: "City Tours",
  //   descr: "Discover the city with our guided tours.",
  // },
  {
    count: "03",
    title: "Accommodation",
    descr: "Comfortable stays at the best locations.",
  },
];

const Homepage = () => {
  const [featuredCars, setFeaturedCars] = useState([]);

  useEffect(() => {
    const fetchFeaturedCars = async () => {
      try {
        const allCars = await api.get("/car");
        const featured = allCars.filter((c) => c.featured === true).slice(0, 3);
        setFeaturedCars(featured);
      } catch (error) {
        toast.error("Can not get featured cars");
        console.error("Failed to fetch featured cars: ", error);
      }
    };

    fetchFeaturedCars();
  }, []);

  return (
    <>
      <div className="homepage">
        <div className="hero">
          <div className="bg gradient">
            <img src={assets.heroBg} alt="" loading="lazy" />
          </div>

          <div className="container">
            <div className="content">
              <div className="diamond">
                <span className="line"></span>
                <span>car rental</span>
              </div>
              <h1>
                Rent your ride, <br />
                anytime, anywhere
              </h1>
              <p>
                Discover the ease of car rental designed to fit your lifestyle.
                Whether you're planning a quick city drive, a weekend getaway,
                or a long-term journey.
              </p>
              <div className="actions">
                <Link to={"/collection"} className="btn">
                  <span className="icon">
                    <LuArrowRight />
                  </span>
                  <span className="txt">
                    <span>See Our Collection</span>
                    <span>
                      <LuArrowRight />
                    </span>
                  </span>
                </Link>
                <a href="/#services" className="service">
                  <span className="txt">What we do?</span>
                  <span className="icon">
                    <LuArrowRight />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="featured">
          <div className="container">
            <div className="content">
              <div className="sec-title">
                <div className="title">
                  <span className="lined">
                    <span className="line"></span>
                    <span>Rent your dream ride today</span>
                  </span>
                  <h1>
                    Wherever you go,
                    <br /> we've got your ride
                  </h1>
                </div>
                <div className="title-descr">
                  <p>
                    Let your adventure begin with Bright Safaris Africa Ltd. Our
                    featured cars provide the perfect combination of luxury,
                    performance, and practicality for every traveler. Whether
                    you're on a safari or an urban getaway, we ensure your
                    journey is nothing short of extraordinary.
                  </p>
                  <Link to={"/collection"}>Explore our collection</Link>
                </div>
              </div>
              <div className="car-list">
                {featuredCars.length === 0 ? (
                  <>
                    <p>No featured cars</p>
                  </>
                ) : (
                  featuredCars.map((car, index) => (
                    <CarCard key={index} car={car} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="number-stats">
          <div className="numbers">
            <div className="container">
              <div className="content">
                <div className="left">
                  {reviews.slice(0, 1).map((review, index) => (
                    <ReviewCard key={index} review={review} />
                  ))}
                </div>
                <div className="right">
                  <div className="lined">
                    <span className="line"></span>
                    <span>Our reputation, backed by Data</span>
                  </div>
                  <h1>
                    At Bright Safaris, our reputation is built on exceptional
                    service and customer satisfaction.
                  </h1>
                  <p>
                    With years of experience in car rentals, airport transfers,
                    and city tours, we ensure your journey is seamless and
                    unforgettable. Explore Africa with confidence, knowing we've
                    got your ride.
                  </p>
                  <a className="button" href={"/#services"}>
                    <span>Our Legancy</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="stats">
            <div className="container">
              <div className="content">
                <ul>
                  {statsList.map((stat, index) => (
                    <li key={index}>
                      <span className="num">{stat.num}</span>
                      <span className="label">{stat.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="services" id="services">
          <div className="container">
            <div className="content">
              <div className="left">
                <div className="lined">
                  <span className="line"></span>
                  <span>Beyond the drive</span>
                </div>
                <h1>Experience, elegance, excellence</h1>
                <p>
                  Discover the art of travel with our premium services designed
                  for the discerning traveler.
                </p>
                <div className="img">
                  <img src={assets.serviceImg2} alt="" loading="lazy" />
                </div>
                <ul>
                  {servicesList.map((service, index) => (
                    <li key={index}>
                      <Link to={"/contact"}>
                        <span>
                          <span className="count">{service.count}</span>
                          <span className="title">{service.title}</span>
                        </span>
                        <span className="icon">
                          <FaArrowRightLong />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="right">
                <div className="img">
                  <img src={assets.serviceImg1} alt="" loading="lazy" />
                </div>
                <h2>
                  At Bright Safaris, we believe every journey should be a story
                  worth telling.
                </h2>
                <p>
                  From the moment you book with us, our team is dedicated to
                  providing seamless travel experiences, whether you're
                  exploring the wild landscapes or bustling city streets. We're
                  not just about getting you from A to B — we're about making
                  each mile unforgettable.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="reviews">
          <div className="container">
            <div className="content">
              <div className="sec-title">
                <span className="lined">
                  <span className="line"></span>
                  <span>What our customers say</span>
                </span>
                <h2>Real stories, premium experiences</h2>

                <p>
                  Our clients' stories reflect the unmatched quality and
                  unforgettable experiences Bright Safaris brings to every
                  journey.
                </p>
              </div>
              <div className="reviews-list">
                {reviews.slice(0, 3).map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="our-gallery" id="our-showroom">
          <div className="container">
            <div className="content">
              <ImageGallery />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const statsList = [
  {
    num: "2.4k+",
    label: "Happy Customers",
    descr:
      "Join our community of satisfied customers who trust us for their car rental needs.",
  },
  {
    num: `${showroom.length}+`,
    label: "Cars Available",
    descr:
      "Choose from a wide range of vehicles to suit your style and travel needs.",
  },
  {
    num: "98%",
    label: "Accident-Free Rentals",
    descr:
      "Your safety is our priority. We maintain a high standard of vehicle safety and cleanliness.",
  },
  {
    num: `${calcAvgRating(reviews)}/5`,
    label: "Customer Rating",
    descr:
      "Our customers love us! Check out our reviews and see why we're the best choice for your car rental needs.",
  },
];

export default Homepage;
