import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { priceFormat } from "../mock/cars"; // Assuming this formats price
import { IoIosMore } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DashboardCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCars, setSelectedCars] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carIdToDelete, setCarIdToDelete] = useState(null); // Store ID of the car

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch(`${BASE_URL}/car`);

        if (!response.ok) throw new Error("Failed to fetch cars");

        const data = await response.json();
        setCars(data);
      } catch (err) {
        toast.error("Error fetching cars");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedCars([]);
    } else {
      setSelectedCars(cars.map((car) => car.id));
    }
    setSelectAll(!selectAll);
  };

  const toggleCarSelection = (carId) => {
    setSelectedCars((prev) =>
      prev.includes(carId)
        ? prev.filter((id) => id !== carId)
        : [...prev, carId]
    );
  };

  const toggleDropdown = (carId) => {
    setOpenDropdownId((prevId) => (prevId === carId ? null : carId));
  };

  const handleAction = (action, car) => {
    setOpenDropdownId(null);
    switch (action) {
      case "view":
        toast.success(`View: ${car.title}`);
        break;
      case "edit":
        navigate(`/admin/cars/${car.id}/edit`)
        break;
      case "delete":
        setCarIdToDelete(car.id);
        setShowDeleteModal(true);
        break;
      default:
        break;
    }
  };

  const handleConfirmDelete = async () => {
    if (!carIdToDelete) return;

    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}/car/${carIdToDelete}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to delete car");

      toast.success(`Car deleted`);

      setCars((prevCars) => prevCars.filter((car) => car.id !== carIdToDelete));
    } catch (err) {
      toast.error(`Failed to delete car`);
      console.error(err);
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setCarIdToDelete(null);
    }
  };

  const handleNewCarPage = () => {
    navigate("/admin/cars/new");
  };

  if (loading)
    return (
      <>
        <div className="loader-page">
          <div className="container">
            <div className="content">
              <div className="loader"></div>
            </div>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="dashboard-cars">
        <div className="container">
          <div className="content">
            <div className="page-title">
              <div>
                <h2>
                  [{cars.length}] {cars.length > 1 ? "Cars" : "Car"}
                </h2>
              </div>
              <div>
                <button onClick={handleNewCarPage} className="button">
                  <span>Add Car</span>
                </button>
              </div>
            </div>

            <ul>
              <li>
                <span>All cars</span>
              </li>
              <li>
                <span>Luxury</span>
              </li>
              <li>
                <span>Affordable</span>
              </li>
            </ul>

            <div className="tb">
              <div className="th">
                <div className="select">
                  <input
                    type="checkbox"
                    id="check"
                    checked={selectAll}
                    onChange={toggleSelectAll}
                  />
                  <label htmlFor="check"></label>
                </div>
                <div className="product">
                  <h3>Car</h3>
                </div>
                <div className="featured">
                  <h3>Featured</h3>
                </div>
                <div className="active">
                  <h3>Active</h3>
                </div>
                <div className="price">
                  <h3>Price</h3>
                </div>
                <div className="more"></div>
              </div>

              <div className="car-list">
                {cars.map((car) => (
                  <div className="td" key={car.id}>
                    <div className="select">
                      <input
                        type="checkbox"
                        id="chek"
                        checked={selectedCars.includes(car.id)}
                        onChange={() => toggleCarSelection(car.id)}
                      />
                      <label htmlFor="chek"></label>
                    </div>
                    <div className="product">
                      <div className="img">
                        <img src={car?.gallery?.[0]} loading="lazy" />
                      </div>
                      <div className="name">
                        <h3>{car?.title}</h3>
                      </div>
                    </div>
                    <div className="featured">
                      <p className={car.featured ? "active" : ""}>
                        {car.featured ? "Featured" : "Not featured"}
                      </p>
                    </div>
                    <div className="active">
                      <button
                        className={car.is_active ? "toggle active" : "toggle"}
                      ></button>
                    </div>
                    <div className="price">
                      <h3>Rwf. {priceFormat(car?.rental_amount)}</h3>
                    </div>
                    <div className="more">
                      <button onClick={() => toggleDropdown(car.id)}>
                        <IoIosMore />
                      </button>
                      {openDropdownId === car.id && (
                        <div className="dropdown">
                          <div
                            className="dropdown-content"
                            onClick={() => handleAction("view", car)}
                          >
                            View
                          </div>
                          <div
                            className="dropdown-content"
                            onClick={() => handleAction("edit", car)}
                          >
                            Edit
                          </div>
                          <div
                            className="dropdown-content"
                            onClick={() => handleAction("delete", car)}
                          >
                            Delete
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <div className="delete-modal">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this car?</p>
            <div className="modal-buttons">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setCarIdToDelete(null);
                }}
                className="button cancel"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="button delete"
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardCars;
