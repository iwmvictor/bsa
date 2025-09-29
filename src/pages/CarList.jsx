import React, { useState, useMemo } from "react";
import { assets } from "../mock/asset";
import { LuSearch } from "react-icons/lu";
import { showroom } from "../mock/cars";
import CarCard from "../components/CarCard";

import "./../styles/cars.scss";

// Utility to extract unique brands dynamically
const getUniqueBrands = (cars) => {
  const brands = new Set(cars.map((car) => car.brand));
  return Array.from(brands);
};

// Get brand counts
const brandCounts = showroom.reduce((acc, car) => {
  acc[car.brand] = (acc[car.brand] || 0) + 1;
  return acc;
}, {});

// Utility to rank cars based on search relevance
const getSearchScore = (car, searchTerm) => {
  const term = searchTerm.toLowerCase();
  let score = 0;

  const { brand, model, title, tags, features, overview, carInfo } = car;

  if (brand.toLowerCase().includes(term)) score += 5;
  if (model.toLowerCase().includes(term)) score += 5;
  if (title.toLowerCase().includes(term)) score += 4;

  if (tags.some((tag) => tag.toLowerCase().includes(term))) score += 3;
  if (features.some((f) => f.toLowerCase().includes(term))) score += 2;
  if (overview.toLowerCase().includes(term)) score += 1;

  if (term === "cheap" || term === "affordable") {
    score += car.rentalAmount < 100000 ? 10 : car.rentalAmount < 200000 ? 5 : 0;
  }

  if (term === "luxury") {
    score += car.rentalAmount >= 250000 ? 10 : 0;
  }

  if (term === "suv" || term === "jeep") {
    score += car.carInfo.body.toLowerCase().includes("suv") ? 5 : 0;
  }

  return score;
};

const CarListPage = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filters, setFilters] = useState({
    luxury: false,
    affordable: false,
    seats5Plus: false,
  });
  const [visibleCount, setVisibleCount] = useState(4); // State for tracking visible cards

  const brands = useMemo(() => getUniqueBrands(showroom), []);

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCars = useMemo(() => {
    let results = [...showroom];

    // Brand filtering
    if (selectedBrands.length > 0) {
      results = results.filter((car) => selectedBrands.includes(car.brand));
    }

    // Other filters
    if (filters.luxury) {
      results = results.filter((car) => car.rentalAmount >= 250000);
    }

    if (filters.affordable) {
      results = results.filter((car) => car.rentalAmount <= 100000);
    }

    if (filters.seats5Plus) {
      results = results.filter((car) => car.carInfo.seats >= 5);
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
  }, [searchTerm, selectedBrands, filters]);

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedBrands([]);
    setFilters({
      luxury: false,
      affordable: false,
      seats5Plus: false,
    });
    setVisibleCount(4); // Reset the visible count when filters are reset
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4); // Increase the visible count by 4 on "Load More"
  };

  const loadFew = () => {
    setVisibleCount((prevCount) => prevCount - 4); // Increase the visible count by 4 on "Load More"
  };

  return (
    <div>
      <div className="car-list-page">
        <div className="hero">
          <div className="bg">
            <img src={assets.heroBg} alt="" loading="lazy"  />
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
                        {brand}{" "}
                        <span className="num"> ({brandCounts[brand]})</span>
                      </label>
                    </li>
                  ))}
                </ul>

                {/* <ul>
                  <h3>Other</h3>
                  <li>
                    <input
                      id="afford"
                      type="checkbox"
                      checked={filters.affordable}
                      onChange={() => toggleFilter("affordable")}
                    />
                    <span className="custom-box"></span>
                    <label htmlFor="afford">Affordable</label>
                  </li>
                  <li>
                    <input
                      id="lux"
                      type="checkbox"
                      checked={filters.luxury}
                      onChange={() => toggleFilter("luxury")}
                    />
                    <span className="custom-box"></span>
                    <label htmlFor="lux">Luxury</label>
                  </li>
                  <li>
                    <input
                      id="5plus"
                      type="checkbox"
                      checked={filters.seats5Plus}
                      onChange={() => toggleFilter("seats5Plus")}
                    />
                    <span className="custom-box"></span>
                    <label htmlFor="5plus">5+ Seats</label>
                  </li>
                </ul> */}
              </div>

              <div className="main-conts">
                {/* {searchTerm ||
                  selectedBrands.length > 0 ||
                  (Object.values(filters).includes(true) && (
                    <div className="applied-filters">
                      <ul>
                        {searchTerm && <li>Search: {searchTerm}</li>}
                        {selectedBrands.map((b) => (
                          <li key={b}>Brand: {b}</li>
                        ))}
                        {filters.affordable && <li>Affordable</li>}
                        {filters.luxury && <li>Luxury</li>}
                        {filters.seats5Plus && <li>5+ Seats</li>}
                        <li className="reset" onClick={resetFilters}>
                          <span>Reset</span>
                        </li>
                      </ul>
                    </div>
                  ))} */}

                {filteredCars.length > 0 ? (
                  <div className="cars-list">
                    {filteredCars.slice(0, visibleCount).map((car, index) => (
                      <CarCard car={car} key={index} />
                    ))}
                  </div>
                ) : (
                  <>
                    <div class="no-car-found">
                      <div className="div">
                        <img src={assets.carPlaceholder}  loading="lazy" class="no-car-image" />
                        <h3>No Cars Matches your Searches</h3>
                        <p>Try resetting the filters to view more options.</p>
                      </div>
                    </div>
                  </>
                )}

                {filteredCars.length > visibleCount ? (
                  <div className="load-more">
                    <button
                      onClick={() => {
                        setLoading(true);
                        setTimeout(() => {
                          loadMore();
                          setLoading(false);
                        }, 4000); // 4 seconds delay
                      }}
                      className={
                        !loading
                          ? "loading-button not-loading"
                          : "loading-button"
                      }
                      disabled={loading} // Optional: disable button while loading
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
                ) : (
                  <div className="load-more">
                    <button
                      onClick={() => {
                        setLoading(true);
                        setTimeout(() => {
                          loadFew();
                          setLoading(false);
                        }, 4000); // 4 seconds delay
                      }}
                      className={
                        !loading
                          ? "loading-button not-loading"
                          : "loading-button"
                      }
                      disabled={loading} // Optional: disable button while loading
                    >
                      {loading ? (
                        <>
                          <div className="spinner"></div>
                          <span>Calculating...</span>
                          <div className="glow-animation"></div>
                        </>
                      ) : (
                        <span>Load Few</span>
                      )}
                    </button>
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

export default CarListPage;
