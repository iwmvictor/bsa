import React, { useState, useEffect } from "react";

const BookingModal = ({ booking, mode, onClose, onSave }) => {
  const isEditMode = mode === "edit";

  const [formState, setFormState] = useState({
    name: "",
    phone: "",
    location: "",
    from_date: "",
    to_date: "",
    need_driver: false,
    need_pickup: false,
    message: "",
    status: "",
    payment_status: "",
    transaction_details: "",
    car_id: "",
    customer_id: "",
  });

  useEffect(() => {
    setFormState({
      name: booking.name,
      phone: booking.phone,
      location: booking.location,
      from_date: booking.from_date,
      to_date: booking.to_date,
      need_driver: booking.need_driver,
      need_pickup: booking.need_pickup,
      message: booking.message,
      status: booking.status,
      payment_status: booking.payment_status,
      transaction_details: booking.transaction_details,
      car_id: booking.car_id,
      customer_id: booking.customer_id,
    });
  }, [booking]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...booking, ...formState });
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h3>{isEditMode ? "Edit Booking" : "Booking Details"}</h3>
        <form onSubmit={handleSubmit}>
          <div className={isEditMode ? "input" : "input-info"}>
            <label>Name:</label>
            <input
              name="name"
              value={formState.name}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </div>
          <div className={isEditMode ? "input" : "input-info"}>
            <label>Phone:</label>
            <input
              name="phone"
              value={formState.phone}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </div>
          <div className={isEditMode ? "input" : "input-info"}>
            <label>Location:</label>
            <input
              name="location"
              value={formState.location}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </div>
          <div className={isEditMode ? "input" : "input-info"}>
            <label>From Date:</label>
            <input
              type="date"
              name="from_date"
              value={formState.from_date}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </div>
          <div className={isEditMode ? "input" : "input-info"}>
            <label>To Date:</label>
            <input
              type="date"
              name="to_date"
              value={formState.to_date}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </div>
          <div className={isEditMode ? "check" : "check-info"}>
            <label>Need Driver</label>
            <input
              type="checkbox"
              name="need_driver"
              checked={formState.need_driver}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </div>
          <div className={isEditMode ? "check" : "check-info"}>
            <label>Need Pickup</label>
            <input
              type="checkbox"
              name="need_pickup"
              checked={formState.need_pickup}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </div>
          <div className={isEditMode ? "input" : "input-info"}>
            <label>Message:</label>
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </div>
          <div className={isEditMode ? "input" : "input-info"}>
            <label>Status:</label>
            <input
              name="status"
              value={formState.status}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </div>
          <div className={isEditMode ? "input" : "input-info"}>
            <label>Payment Status:</label>
            <input
              name="payment_status"
              value={formState.payment_status}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </div>
          <div className={isEditMode ? "input" : "input-info"}>
            <label>Transaction Details:</label>
            <textarea
              name="transaction_details"
              value={formState.transaction_details}
              onChange={handleChange}
              disabled={!isEditMode}
            />
          </div>
          <div className="modal-buttons">
            <button type="button" className="button cancel" onClick={onClose}>
              Close
            </button>
            {isEditMode && <button type="submit" className="button save">Save</button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
