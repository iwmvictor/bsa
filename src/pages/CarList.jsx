import React, { useState, useEffect, useMemo } from "react";
import { assets } from "../mock/asset";
import { LuSearch } from "react-icons/lu";
import CarCard from "../components/CarCard";
import { api } from "../api/api";
import toast from "react-hot-toast";

import "./../styles/cars.scss";

const getUniqueBrands = (cars) => {
  const brands = new Set(cars.map((car) => car.brand));
  return Array.from(brands);
};

const getSearchScore = (car, searchTerm) => {
  const term = searchTerm.toLowerCase();
  let score = 0;

  const {
    brand,
    model,
    title,
    tags = [],
    features = [],
    overview = "",
    carInfo = {},
    rental_amount,
  } = car;

  if (brand.toLowerCase().includes(term)) score += 5;
  if (model.toLowerCase().includes(term)) score += 5;
  if (title.toLowerCase().includes(term)) score += 4;

  if (tags.some((tag) => tag.toLowerCase().includes(term))) score += 3;
  if (features.some((f) => f.toLowerCase().includes(term))) score += 2;
  if (overview.toLowerCase().includes(term)) score += 1;

  if (term === "cheap" || term === "affordable") {
    score += rental_amount < 100000 ? 10 : rental_amount < 200000 ? 5 : 0;
  }

  if (term === "luxury") {
    score += rental_amount >= 250000 ? 10 : 0;
  }

  if (term === "suv" || term === "jeep") {
    score += carInfo?.body?.toLowerCase().includes("suv") ? 5 : 0;
  }

  return score;
};

const CarListPage = () => {
  const [cars, setCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filters, setFilters] = useState({
    luxury: false,
    affordable: false,
    seats5Plus: false,
  });
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const [carsData, bookedData] = await Promise.all([
          api.get("/car"),
          api.get("/booked_date"),
        ]);

        // Merge booked dates into cars
        const carsWithBookings = carsData.map((car) => {
          const carBookedDates = bookedData
            .filter((b) => b.car_id === car.id)
            .map((b) => ({
              from: new Date(b.from_date),
              to: new Date(b.to_date),
            }));

          return {
            ...car,
            bookedDates: carBookedDates,
          };
        });

        setCars(carsWithBookings);
      } catch (error) {
        toast.error("Failed to load cars or booking data");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const brands = useMemo(() => getUniqueBrands(cars), [cars]);

  const brandCounts = useMemo(() => {
    return cars.reduce((acc, car) => {
      acc[car.brand] = (acc[car.brand] || 0) + 1;
      return acc;
    }, {});
  }, [cars]);

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCars = useMemo(() => {
    let results = [...cars];

    // Brand filtering
    if (selectedBrands.length > 0) {
      results = results.filter((car) => selectedBrands.includes(car.brand));
    }

    // Other filters
    if (filters.luxury) {
      results = results.filter((car) => car.rental_amount >= 250000);
    }

    if (filters.affordable) {
      results = results.filter((car) => car.rental_amount <= 100000);
    }

    if (filters.seats5Plus) {
      results = results.filter((car) => car?.seats >= 5);
    }

    // Search filter
    if (searchTerm.trim()) {
      results = results
        .map((car) => ({
          ...car,
          _score: getSearchScore(car, searchTerm),
        }))
        .filter((car) => car._score > 0)
        .sort((a, b) => b._score - a._score);
    }

    return results;
  }, [searchTerm, selectedBrands, filters, cars]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBrands([]);
    setFilters({
      luxury: false,
      affordable: false,
      seats5Plus: false,
    });
    setVisibleCount(4);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const loadFew = () => {
    setVisibleCount((prevCount) => Math.max(prevCount - 4, 4));
  };

  return (
    <div>
      <div className="car-list-page">
        <div className="hero">
          <div className="bg">
            <img src={assets.heroBg} alt="" loading="lazy" />
          </div>
          <div className="container">
            <div className="content">
              <li>
                <span className="line"></span>
                <span>choose your drive</span>
              </li>
              <h2>
                Tailored for Style, <br /> Speed & Sophistication
              </h2>
            </div>
          </div>
        </div>

        <div className="car-list-sec">
          <div className="container">
            <div className="content">
              <div className="filter-bar">
                <div className="search">
                  <input
                    type="search"
                    placeholder="Search by brand, model, feature..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button>
                    <span>
                      <LuSearch />
                    </span>
                  </button>
                </div>

                <ul className="brands">
                  <h3>Brands</h3>
                  {brands.map((brand) => (
                    <li key={brand}>
                      <input
                        id={`checkbox-${brand}`}
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => handleBrandToggle(brand)}
                      />
                      <span className="custom-box"></span>
                      <label htmlFor={`checkbox-${brand}`}>
                        {brand}
                        <span className="num"> ({brandCounts[brand]})</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="main-conts">
                {loading ? (
                  <div className="loading-section">
                    <p>Loading cars...</p>
                  </div>
                ) : filteredCars.length > 0 ? (
                  <div className="cars-list">
                    {filteredCars.slice(0, visibleCount).map((car, index) => (
                      <CarCard car={car} key={index} />
                    ))}
                  </div>
                ) : (
                  <div className="no-car-found">
                    <div className="div">
                      <img
                        src={assets.carPlaceholder}
                        loading="lazy"
                        className="no-car-image"
                      />
                      <h3>No Cars Match Your Search</h3>
                      <p>Try resetting the filters to view more options.</p>
                      <button onClick={resetFilters}>Reset Filters</button>
                    </div>
                  </div>
                )}

                {filteredCars.length > visibleCount ? (
                  <div className="load-more">
                    <button
                      onClick={() => {
                        setLoading(true);
                        setTimeout(() => {
                          loadMore();
                          setLoading(false);
                        }, 1000);
                      }}
                      className={
                        !loading
                          ? "loading-button not-loading"
                          : "loading-button"
                      }
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="spinner"></div>
                          <span>Loading...</span>
                          <div className="glow-animation"></div>
                        </>
                      ) : (
                        <span>Load More</span>
                      )}
                    </button>
                  </div>
                ) : filteredCars.length > 4 ? (
                  <div className="load-more">
                    <button
                      onClick={() => {
                        setLoading(true);
                        setTimeout(() => {
                          loadFew();
                          setLoading(false);
                        }, 1000);
                      }}
                      className={
                        !loading
                          ? "loading-button not-loading"
                          : "loading-button"
                      }
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <div className="spinner"></div>
                          <span>Calculating...</span>
                          <div className="glow-animation"></div>
                        </>
                      ) : (
                        <span>Load Fewer</span>
                      )}
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarListPage;
