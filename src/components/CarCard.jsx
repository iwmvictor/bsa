import { Link } from "react-router-dom";
import {
  generateSlug,
  getBrandLogo,
  isBookedToday,
  priceFormat,
} from "../mock/cars";

const CarCard = ({ car }) => {
  return (
    <>
      <Link to={`/car/${generateSlug(car)}`} className="carcard">
        <div className="image">
          <img src={car.gallery[0]} loading="lazy" />
        </div>
        <div className="info">
          <div className="brand">
            <div className="img">
              <img src={getBrandLogo(car.brand)} loading="lazy" alt="" />
            </div>
            <div className="txt">
              <h3>{car.title}</h3>
              <p>
                <span>{car.year}</span> •<span>{car.transmission}</span> •
                <span>
                  {isBookedToday(car.bookedDates)
                    ? "Booked Today"
                    : "Available"}
                </span>
              </p>
            </div>
          </div>

          <div className="div">
            <div className="seats">
              <span>{car?.seats} Seats</span>
            </div>
            <div className="price">
              <h3>
                <span>RF</span>
                <span>{priceFormat(car?.rental_amount)}</span>
              </h3>
              <span className="duration">/day</span>
            </div>
          </div>
          <Link className="check-btn" to={`/car/${generateSlug(car)}`}>
            <span>Check availability</span>
          </Link>
        </div>
      </Link>
    </>
  );
};

export default CarCard;
