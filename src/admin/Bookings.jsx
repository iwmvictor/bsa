import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoIosMore } from "react-icons/io";
import { debounce } from "lodash";
import BookingModal from "./component/BookingModal";
import { formatPhoneNum } from "../mock/company";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DashboardBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [carsMap, setCarsMap] = useState({});
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [selectedBookings, setSelectedBookings] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [openDropdownId, setOpenDropdownId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [modalBooking, setModalBooking] = useState(null);
  const [modalMode, setModalMode] = useState("view");

  // Fetch bookings on load
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(`${BASE_URL}/booking`);
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();
        setBookings(data);
        setFilteredBookings(data);
      } catch (err) {
        console.error(err);
        toast.error("Could not load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // Fetch car info for bookings
  useEffect(() => {
    const fetchCars = async () => {
      const uniqueCarIds = [...new Set(bookings.map((b) => b.car_id))];
      const missingCarIds = uniqueCarIds.filter((id) => !carsMap[id]);

      const fetchedCars = await Promise.all(
        missingCarIds.map(async (id) => {
          try {
            const res = await fetch(`${BASE_URL}/car/${id}`);
            if (!res.ok) throw new Error(`Failed to fetch car ${id}`);
            const data = await res.json();
            return { id, data };
          } catch (err) {
            console.error(err);
            return null;
          }
        })
      );

      const validCars = fetchedCars.filter(Boolean);
      if (validCars.length) {
        setCarsMap((prev) => {
          const updated = { ...prev };
          validCars.forEach(({ id, data }) => {
            updated[id] = data;
          });
          return updated;
        });
      }
    };

    if (bookings.length) fetchCars();
  }, [bookings]);

  // Handle search
  const handleSearchChange = debounce((query) => {
    setSearchQuery(query.toLowerCase());
    setCurrentPage(1);

    const filtered = bookings.filter((b) => {
      const car = carsMap[b.car_id];
      const carText = car
        ? `${car.brand} ${car.model} ${car.year}`.toLowerCase()
        : "";

      return (
        b.name?.toLowerCase().includes(query) ||
        b.phone?.toLowerCase().includes(query) ||
        b.email?.toLowerCase().includes(query) ||
        b.from_date?.toLowerCase().includes(query) ||
        b.to_date?.toLowerCase().includes(query) ||
        carText.includes(query)
      );
    });

    setFilteredBookings(filtered);
  }, 300);

  const onInputChange = (e) => {
    handleSearchChange(e.target.value);
  };

  // Pagination
  const totalPages = Math.ceil(filteredBookings.length / pageSize);
  const paginatedBookings = filteredBookings.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1);
  };

  // Selection logic
  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedBookings([]);
    } else {
      setSelectedBookings(filteredBookings.map((b) => b.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleSelectOne = (bookingId) => {
    setSelectedBookings((prev) =>
      prev.includes(bookingId)
        ? prev.filter((id) => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  useEffect(() => {
    setSelectAll(
      selectedBookings.length === filteredBookings.length &&
        filteredBookings.length > 0
    );
  }, [selectedBookings, filteredBookings]);

  // Modal and dropdown
  const toggleDropdown = (bookingId) => {
    setOpenDropdownId((prev) => (prev === bookingId ? null : bookingId));
  };

  const handleDropdownAction = (action, booking) => {
    setOpenDropdownId(null);
    if (action === "delete") return handleDeleteBooking(booking.id);
    setModalBooking(booking);
    setModalMode(action);
    setShowModal(true);
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      const res = await fetch(`${BASE_URL}/booking/${bookingId}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });
      if (!res.ok) throw new Error("Delete failed");

      toast.success("Booking deleted");

      const updated = bookings.filter((b) => b.id !== bookingId);
      setBookings(updated);
      setFilteredBookings(updated);
      setSelectedBookings((prev) => prev.filter((id) => id !== bookingId));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete");
    }
  };

  const handleModalSave = async (updatedBooking) => {
    try {
      const res = await fetch(`${BASE_URL}/booking/${updatedBooking.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(updatedBooking),
      });

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      toast.success("Booking updated");

      const updated = bookings.map((b) => (b.id === data.id ? data : b));
      setBookings(updated);
      setFilteredBookings(updated);
      setShowModal(false);
      setModalBooking(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update booking");
    }
  };

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div className="dashboard-bookings">
      <div className="container">
        <div className="content">
          <div className="title">
            <div>
              <h2>Bookings</h2>
              <p>Manage your bookings</p>
            </div>
            <div>
              <div className="search">
                <input
                  type="text"
                  placeholder="Search by name, phone, email, date or car..."
                  onChange={onInputChange}
                />
              </div>
            </div>
          </div>

          <div className="tb">
            <div className="th">
              <div className="td">
                <span className="input">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                  <label></label>
                </span>
              </div>
              <div className="td">
                <span>Client</span>
              </div>
              <div className="td">
                <span>Phone</span>
              </div>
              <div className="td">
                <span>Car</span>
              </div>
              <div className="td">
                <span>Dates</span>
              </div>
              <div className="td"></div>
            </div>

            <div className="booking-list">
              {paginatedBookings.map((booking) => (
                <div className="tr" key={booking.id}>
                  <div className="td">
                    <span className="input">
                      <input
                        type="checkbox"
                        checked={selectedBookings.includes(booking.id)}
                        onChange={() => toggleSelectOne(booking.id)}
                      />
                      <label></label>
                    </span>
                  </div>
                  <div className="td name">
                    <span>{booking.name}</span>
                  </div>
                  <div className="td">
                    <span>{formatPhoneNum(booking.phone)}</span>
                  </div>
                  <div className="td">
                    <span>
                      {carsMap[booking.car_id]
                        ? `${carsMap[booking.car_id].brand} ${
                            carsMap[booking.car_id].model
                          } ${carsMap[booking.car_id].year}`
                        : "Loading car..."}
                    </span>
                  </div>
                  <div className="td dates">
                    <span>
                      {formatDateWithoutYear(booking.from_date)} -{" "}
                      {formatDatePretty(booking.to_date)}
                    </span>
                  </div>
                  <div className="td">
                    <button onClick={() => toggleDropdown(booking.id)}>
                      <IoIosMore />
                    </button>
                    {openDropdownId === booking.id && (
                      <div className="dropdown">
                        <div
                          className="dropdown-content"
                          onClick={() => handleDropdownAction("view", booking)}
                        >
                          View
                        </div>
                        <div
                          className="dropdown-content"
                          onClick={() => handleDropdownAction("edit", booking)}
                        >
                          Edit
                        </div>
                        <div
                          className="dropdown-content"
                          onClick={() =>
                            handleDropdownAction("delete", booking)
                          }
                        >
                          Delete
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="pagination-controls">
                <div className="pagination-settings">
                  <label>Show:</label>
                  <select value={pageSize} onChange={handlePageSizeChange}>
                    {[5, 10, 15, 20, 50, 100].map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pagination-buttons">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (num) => (
                      <button
                        key={num}
                        onClick={() => setCurrentPage(num)}
                        className={currentPage === num ? "active" : ""}
                      >
                        {num}
                      </button>
                    )
                  )}
                  <button
                    onClick={() =>
                      setCurrentPage((p) => Math.min(p + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showModal && modalBooking && (
        <BookingModal
          booking={modalBooking}
          mode={modalMode}
          onClose={() => {
            setShowModal(false);
            setModalBooking(null);
          }}
          onSave={handleModalSave}
        />
      )}
    </div>
  );
};

// Utility functions
function formatDatePretty(inputDate) {
  const date = new Date(inputDate);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function formatDateWithoutYear(inputDate) {
  const date = new Date(inputDate);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export default DashboardBookings;
