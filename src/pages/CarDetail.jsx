import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

import {
  generateSlug,
  getBrandLogo,
  isBookedToday,
  priceFormat,
} from "../mock/cars";
import { assets, ikons } from "../mock/asset";
import { api } from "../api/api";

import "./../styles/cars.scss";

const CarDetailPage = () => {
  const { path } = useParams();
  const [car, setCar] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    fromDate: null,
    toDate: null,
    needDriver: false,
    needPickup: false,
    message: "",
  });
  const [totalAmount, setTotalAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. fetch all cars
        const carsData = await api.get("/car");
        const foundCar = carsData.find((c) => generateSlug(c) === path);
        if (!foundCar) {
          setCar(null);
          toast.error("Car not found");
          setLoading(false);
          return;
        }
        // 2. fetch booked_dates
        const bookedAll = await api.get("/booked_date");
        const bookingsForCar = bookedAll
          .filter((b) => b.car_id === foundCar.id)
          .map((b) => ({
            from: new Date(b.from_date),
            to: new Date(b.to_date),
          }));

        setCar(foundCar);
        setBookedDates(bookingsForCar);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [path]);

  const isDateBooked = (date) => {
    return bookedDates.some(({ from, to }) => {
      return date >= from && date <= to;
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleDateChange = (date, type) => {
    setFormData((prev) => ({
      ...prev,
      [type]: date,
    }));

    const newFrom = type === "fromDate" ? date : formData.fromDate;
    const newTo = type === "toDate" ? date : formData.toDate;

    if (newFrom && newTo && car) {
      const diffInTime = newTo.getTime() - newFrom.getTime();
      const numDays = Math.ceil(diffInTime / (1000 * 3600 * 24));
      const basePrice = (car.rental_amount || car.rentalAmount || 0) * numDays;
      let addCharges = 0;
      if (formData.needDriver) addCharges += 50;
      if (formData.needPickup) addCharges += 30;
      setTotalAmount(basePrice + addCharges);
    } else {
      setTotalAmount(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fromDate || !formData.toDate) {
      toast.error("Please select both from and to dates");
      return;
    }
    if (!car) {
      toast.error("Car data is missing");
      return;
    }

    try {
      setSubmitting(true);

      const body = {
        name: formData.name,
        phone: formData.phone,
        location: formData.location,
        from_date: formData.fromDate.toISOString().split("T")[0],
        to_date: formData.toDate.toISOString().split("T")[0],
        need_driver: formData.needDriver,
        need_pickup: formData.needPickup,
        message: formData.message,
        status: "pending",
        payment_status: "unpaid",
        car_id: car.id,
        customer_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      };

      await api.post("/booking", body);
      toast.success("Booking submitted successfully");

      setFormData({
        name: "",
        phone: "",
        location: "",
        fromDate: null,
        toDate: null,
        needDriver: false,
        needPickup: false,
        message: "",
      });
      setTotalAmount(null);

      // Re-fetch updated booked dates
      const bookedAll = await api.get("/booked_date");
      const updatedBookings = bookedAll
        .filter((b) => b.car_id === car.id)
        .map((b) => ({
          from: new Date(b.from_date),
          to: new Date(b.to_date),
        }));
      setBookedDates(updatedBookings);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit booking");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-section">
        <p>Loading...</p>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="not-found">
        <div className="container">
          <div className="content">
            <img
              src={assets.carPlaceholder}
              loading="lazy"
              alt="Car Placeholder"
            />
            <h2>Car Not Found</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="car-details-page">
      <div className="hero">
        <div
          className="bg"
          style={{ backgroundImage: `url(${car.gallery[0]})` }}
        ></div>
      </div>

      <div className="car-details">
        <div className="car-logo">
          <img src={getBrandLogo(car.brand)} alt="" loading="lazy" />
        </div>

        <div className="container">
          <div className="content">
            <div className="quick">
              <div>
                <h2>
                  <span>{car?.brand}</span>
                  <span className="model">{car?.model}</span>
                  <span>{car?.year}</span>
                </h2>
                <p>
                  {isBookedToday(bookedDates) ? "Booked Today" : "Available"}
                </p>
              </div>
              <div className="q-right">
                <div className="charge">
                  <span className="amt">
                    R₣ {priceFormat(car?.rental_amount)}
                  </span>
                  <span>/day</span>
                </div>
                <button disabled>
                  <span>Book Now</span>
                </button>
              </div>
            </div>

            <div className="images">
              <div className="img">
                <img src={car.gallery[0]} loading="lazy" alt="" />
                <button>
                  <img src={ikons.igallery} loading="lazy" alt="" />
                  <span>{car.gallery.length}</span>
                </button>
              </div>
              {car.gallery[1] && (
                <div className="img">
                  <img src={car.gallery[1]} loading="lazy" alt="" />
                </div>
              )}
            </div>

            <div className="main-car-contents">
              <div className="main-contents">
                <div className="overview">
                  <h2>Overview</h2>
                  <div
                    className="rich-text"
                    dangerouslySetInnerHTML={{ __html: car.overview }}
                  ></div>
                </div>

                <div className="features">
                  <div className="info-list">
                    {car?.year && (
                      <li>
                        <span className="name">Year</span>
                        <span className="val">{car.year}</span>
                      </li>
                    )}
                    {car?.mileage && (
                      <li>
                        <span className="name">Mileage</span>
                        <span className="val">{car.mileage}</span>
                      </li>
                    )}
                    {car?.fuel && (
                      <li>
                        <span className="name">Fuel</span>
                        <span className="val">{car.fuel}</span>
                      </li>
                    )}
                    {car?.body && (
                      <li>
                        <span className="name">Body</span>
                        <span className="val">{car.body}</span>
                      </li>
                    )}
                    {car?.seats && (
                      <li>
                        <span className="name">Seats</span>
                        <span className="val">{car.seats}</span>
                      </li>
                    )}
                    {car.insurance_included && (
                      <li>
                        <span className="name">Insurance</span>
                        <span className="val">Included</span>
                      </li>
                    )}
                    {car?.color && (
                      <li>
                        <span className="name">Color</span>
                        <span className="val">{car.color}</span>
                      </li>
                    )}
                    {car?.transmission && (
                      <li>
                        <span className="name">Transmission</span>
                        <span className="val">{car.transmission}</span>
                      </li>
                    )}
                  </div>

                  <div className="list">
                    <h3>Car Features</h3>
                    <ul>
                      {car.features?.map((item, idx) => (
                        <li key={idx}>
                          <span className="point"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="book-form">
                <div className="price">
                  <span className="amount">
                    R₣ {priceFormat(car.rental_amount || car.rentalAmount)}
                  </span>
                  <span>/day</span>
                </div>

                <form onSubmit={handleSubmit}>
                  <h2>Book Your Ride</h2>

                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Fullname"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="location"
                      placeholder="Location(city)"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <div className="calendar">
                      <DatePicker
                        selected={formData.fromDate}
                        onChange={(date) => handleDateChange(date, "fromDate")}
                        minDate={new Date()}
                        filterDate={(date) => !isDateBooked(date)}
                        placeholderText="Select From Date"
                        selectsStart
                        startDate={formData.fromDate}
                        endDate={formData.toDate}
                      />
                      <DatePicker
                        selected={formData.toDate}
                        onChange={(date) => handleDateChange(date, "toDate")}
                        minDate={formData.fromDate || new Date()}
                        filterDate={(date) => !isDateBooked(date)}
                        placeholderText="Select To Date"
                        selectsEnd
                        startDate={formData.fromDate}
                        endDate={formData.toDate}
                      />
                    </div>
                  </div>

                  <div className="form-group labeled">
                    <input
                      type="checkbox"
                      id="needDriver"
                      name="needDriver"
                      checked={formData.needDriver}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="needDriver"
                      className="custom-check"
                    ></label>
                    <label htmlFor="needDriver">Do you need a driver?</label>
                  </div>

                  <div className="form-group labeled">
                    <input
                      type="checkbox"
                      id="needPickup"
                      name="needPickup"
                      checked={formData.needPickup}
                      onChange={handleInputChange}
                    />
                    <label
                      htmlFor="needPickup"
                      className="custom-check"
                    ></label>
                    <label htmlFor="needPickup">Do you need pickup?</label>
                  </div>

                  <div className="form-group">
                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Additional preferences (e.g., car customization, driver preferences)"
                      value={formData.message}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-btn">
                    <button
                      type="submit"
                      className="submit-btn"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting…" : "Submit Booking"}
                    </button>
                  </div>
                </form>

                {totalAmount !== null && (
                  <div
                    className="priced"
                    style={{
                      padding: "1rem 2rem",
                      position: "relative",
                      opacity: 0.6,
                      gap: ".31rem",
                      display: "flex",
                      alignItems: "flex-end",
                    }}
                  >
                    <span
                      className="amount"
                      style={{
                        fontSize: "1rem",
                        fontWeight: 500,
                        color: "black",
                      }}
                    >
                      RF {priceFormat(totalAmount)}
                    </span>
                    <span
                      style={{
                        fontSize: ".8rem",
                        opacity: 0.6,
                        color: "red",
                      }}
                    >
                      {`/${
                        formData.fromDate && formData.toDate
                          ? Math.ceil(
                              (formData.toDate.getTime() -
                                formData.fromDate.getTime()) /
                                (1000 * 3600 * 24)
                            )
                          : 0
                      } days`}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
