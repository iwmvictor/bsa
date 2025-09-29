import { useParams } from "react-router-dom";
import {
  generateSlug,
  getBrandLogo,
  isBookedToday,
  priceFormat,
  showroom,
} from "../mock/cars";
import { assets, ikons } from "../mock/asset";
import { useState } from "react";

import DatePicker from "react-datepicker"; // For date picking
import "react-datepicker/dist/react-datepicker.css";

const CarDetailPage = () => {
  const { path } = useParams();

  const car = showroom.find((car) => generateSlug(car) === path);

  const [totalAmount, setTotalAmount] = useState(null);

  const [bookedDates, setBookedDates] = useState(car.bookedDates);
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

  const isDateBooked = (date) => {
    return bookedDates.some(({ from, to }) => {
      const bookedStart = new Date(from);
      const bookedEnd = new Date(to);
      return date >= bookedStart && date <= bookedEnd;
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateChange = (date, type) => {
    setFormData({
      ...formData,
      [type]: date,
    });

    calculateTotalPrice(date, type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  const calculateTotalPrice = () => {
    if (formData.fromDate && formData.toDate) {
      // Calculate the number of days
      const diffInTime =
        formData.toDate.getTime() - formData.fromDate.getTime();
      const numOfDays = Math.ceil(diffInTime / (1000 * 3600 * 24)); // Convert time to days

      // Calculate the total amount based on rental amount and rental duration
      const basePrice = car.rentalAmount * numOfDays;

      // Add additional charges if needed
      let additionalCharges = 0;
      if (formData.needDriver) {
        additionalCharges += 50; // Example charge for driver (adjust based on your logic)
      }
      if (formData.needPickup) {
        additionalCharges += 30; // Example charge for pickup (adjust based on your logic)
      }

      const totalPrice = basePrice + additionalCharges;
      setTotalAmount(totalPrice);
    } else {
      setTotalAmount(null);
    }
  };

  if (!car) {
    return (
      <div className="not-found">
        <div className="container">
          <div className="content">
            <img src={assets.carPlaceholder} loading="lazy"  alt="Car Placeholder" />
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
          style={{
            backgroundImage: `url(${car.gallery[0]})`,
          }}
        ></div>
      </div>

      <div className="car-details">
        <div className="car-logo">
          <img src={getBrandLogo(car.brand)} alt="" loading="lazy"  />
        </div>
        <div className="container">
          <div className="content">
            <div className="quick">
              <div>
                <h2>
                  <span>{car?.brand}</span>
                  <span className="model">{car?.model}</span>
                  <span>{car.carInfo?.year}</span>
                </h2>
                <p>
                  {isBookedToday(car.bookedDates)
                    ? "Booked Today"
                    : "Available"}
                </p>
              </div>
              <div className="q-right">
                <div className="charge">
                  <span className="amt">
                    R₣ {priceFormat(car.rentalAmount)}
                  </span>
                  <span>
                    {car.rentalDuration <= 1
                      ? "/day"
                      : `/${car.rentalDuration}days`}
                  </span>
                </div>
                <button>
                  <span>Book Now</span>
                </button>
              </div>
            </div>
            <div className="images">
              <div className="img">
                <img src={car?.gallery[0]}  loading="lazy" alt="" />
                <button>
                  <img src={ikons.igallery} loading="lazy"  />
                  <span>{car.gallery.length}</span>
                </button>
              </div>
              <div className="img">
                <img src={car?.gallery[1]} alt="" loading="lazy"  />
              </div>
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
                    {car.carInfo.year && (
                      <li>
                        <span className="name">Year</span>
                        <span className="val">{car.carInfo?.year}</span>
                      </li>
                    )}
                    {car.carInfo.mileage && (
                      <li>
                        <span className="name">Mileage</span>
                        <span className="val">{car.carInfo?.mileage}</span>
                      </li>
                    )}
                    {car.carInfo.fuel && (
                      <li>
                        <span className="name">Fuel</span>
                        <span className="val">{car.carInfo?.fuel}</span>
                      </li>
                    )}
                    {car.carInfo.body && (
                      <li>
                        <span className="name">Body</span>
                        <span className="val">{car.carInfo?.body}</span>
                      </li>
                    )}
                    {car.carInfo.seats && (
                      <li>
                        <span className="name">Seats</span>
                        <span className="val">{car.carInfo?.seats}</span>
                      </li>
                    )}
                    {car.insuranceIncluded && (
                      <li>
                        <span className="name">Insurance</span>
                        <span className="val">Included</span>
                      </li>
                    )}
                    {car.carInfo.color && (
                      <li>
                        <span className="name">Color</span>
                        <span className="val">{car.carInfo?.color}</span>
                      </li>
                    )}
                    {car.carInfo.transmission && (
                      <li>
                        <span className="name">Transmission</span>
                        <span className="val">{car.carInfo?.transmission}</span>
                      </li>
                    )}
                  </div>

                  <div className="list">
                    <h3>Car Features</h3>
                    <ul>
                      {car?.features.map((item, index) => (
                        <li key={index}>
                          <span className="point"></span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="calendar"></div>
              </div>
              <div className="book-form">
                <div className="price">
                  <span className="amount">
                    {priceFormat(car.rentalAmount)}
                  </span>
                  <span>
                    {car.rentalDuration <= 1
                      ? "/day"
                      : `/${car.rentalDuration}days`}
                  </span>
                </div>
                <form onSubmit={handleSubmit}>
                  <h2>Book Your Ride</h2>

                  <div className="form-group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      placeholder="Fullname"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      placeholder="Phone Number"
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      placeholder="Location(city)"
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
                        minDate={formData.fromDate}
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
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      placeholder="Additional preferences (e.g., car customization, driver preferences)"
                    />
                  </div>

                  <div className="form-btn">
                    <button type="submit" className="submit-btn">
                      Submit Booking
                    </button>
                  </div>
                </form>

                <div className="priced">
                  {totalAmount !== null && (
                    <>
                      <span className="amount">{priceFormat(totalAmount)}</span>
                      <span>
                        {formData.fromDate && formData.toDate
                          ? `Total for ${Math.ceil(
                              (formData.toDate.getTime() -
                                formData.fromDate.getTime()) /
                                (1000 * 3600 * 24)
                            )} days`
                          : "Select dates to calculate"}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
