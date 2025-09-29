import React from "react";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

export const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <>
      {[...Array(fullStars)].map((_, index) => (
        <IoStar key={`full-${index}`} />
      ))}
      {halfStar && <IoStarHalf />}
      {[...Array(emptyStars)].map((_, index) => (
        <IoStarOutline key={`empty-${index}`} />
      ))}
    </>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <>
      <div className="review-card">
        <div className="rating">
          <div className="star">{renderStars(review.rating)}</div>
          <span className="count">{review.rating.toFixed(1)}</span>
        </div>
        <div className="msg">
          <p>{review?.message}</p>
        </div>
        <div className="user">
          <span className="name">{review?.fullName},</span>
          <span className="role">{review?.role}</span>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
