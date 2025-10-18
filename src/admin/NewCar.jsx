import React, { useEffect, useState } from "react";
import { ikons } from "../mock/asset";
import { MdOutlineDelete } from "react-icons/md";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const MAX_IMAGES = 8;
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const NewCarPage = () => {
  const { id } = useParams();
  const isEditMode = !!id;

  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    brand: "",
    model: "",
    year: "",
    mileage: "",
    fuel: "",
    transmission: "",
    body: "",
    seats: "",
    color: "",
    overview: "",
    features: "",
    price: "",
    tags: "",
    is_active: false,
    insurance_included: false,
    featured: false,
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (uploadedImages.length + files.length > MAX_IMAGES) {
      toast.error(`Upload only ${MAX_IMAGES} images`);
      return;
    }

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9),
    }));

    setUploadedImages((prev) => [...prev, ...newImages]);
    e.target.value = "";
  };

  const handleDeleteImg = (id) => {
    setUploadedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      updated_at: 0,
      is_active: formData.is_active,
      title: formData.title,
      brand: formData.brand,
      model: formData.model,
      rental_amount: parseFloat(formData.price) || 0,
      rental_duration: 0,
      year: parseInt(formData.year) || 0,
      mileage: parseInt(formData.mileage) || 0,
      fuel: formData.fuel,
      body: formData.body,
      seats: parseInt(formData.seats) || 0,
      transmission: formData.transmission,
      color: formData.color,
      overview: formData.overview,
      features: formData.features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
      gallery: uploadedImages.map((img) => img.url), // Replace with file upload logic if needed
      insurance_included: formData.insurance_included,
      tags: formData.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      featured: formData.featured,
    };

    try {
      const url = isEditMode ? `${BASE_URL}/car/${id}` : `${BASE_URL}/car`;
      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to submit car");

      toast.success(isEditMode ? "Car updated!" : "New car added!");
      setUploadedImages([]);
      setFormData({
        title: "",
        brand: "",
        model: "",
        year: "",
        mileage: "",
        fuel: "",
        transmission: "",
        body: "",
        seats: "",
        color: "",
        overview: "",
        features: "",
        price: "",
        tags: "",
        is_active: false,
        insurance_included: false,
        featured: false,
      });
      navigate("/admin/cars")
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isEditMode) return;

    const fetchCarDetails = async () => {
      try {
        const res = await fetch(`${BASE_URL}/car/${id}`);
        if (!res.ok) throw new Error("Failed to fetch car");

        const data = await res.json();

        setFormData({
          title: data.title || "",
          brand: data.brand || "",
          model: data.model || "",
          year: data.year || "",
          mileage: data.mileage || "",
          fuel: data.fuel || "",
          transmission: data.transmission || "",
          body: data.body || "",
          seats: data.seats || "",
          color: data.color || "",
          overview: data.overview || "",
          features: (data.features || []).join(", "),
          price: data.rental_amount || "",
          tags: (data.tags || []).join(", "),
          is_active: data.is_active || false,
          insurance_included: data.insurance_included || false,
          featured: data.featured || false,
        });

        setUploadedImages(
          (data.gallery || []).map((url) => ({
            url,
            id: Math.random().toString(36).substr(2, 9),
            file: null,
          }))
        );
      } catch (err) {
        toast.error("Failed to load car data");
        console.log(err);
      }
    };

    fetchCarDetails();
  }, [id, isEditMode]);

  return (
    <div className="new-car-page">
      <div className="container">
        <form className="content" onSubmit={handleSubmit}>
          <div className="image-container">
            <div className="title">
              <h2>{isEditMode ? "Edit car" : "Add new car"}</h2>
              <p>All fields with * are required.</p>
            </div>

            <div className="gallery-cont">
              <div className="upload">
                <h3>Upload images</h3>
                <div className="placeholder" htmlFor="upload">
                  <img src={ikons.uploadIcon} loading="lazy" />
                  <input
                    id="upload"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    disabled={uploadedImages.length >= MAX_IMAGES}
                  />
                  <label htmlFor="upload">Browse images</label>
                </div>

                {uploadedImages.length > 0 && (
                  <div className="uploaded">
                    <h4>
                      Uploaded - {uploadedImages.length}/{MAX_IMAGES}
                    </h4>
                    <ul>
                      {uploadedImages.map((img) => (
                        <li key={img.id}>
                          <img src={img.url} loading="lazy" />
                          <span
                            className="delete"
                            onClick={() => handleDeleteImg(img.id)}
                          >
                            <MdOutlineDelete />
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="options">
              <div className="option">
                <h4>Status:</h4>
                <div
                  className={`toggle ${formData.is_active ? "active" : ""}`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      is_active: !prev.is_active,
                    }))
                  }
                />
              </div>
              <div className="option">
                <h4>Featured:</h4>
                <div
                  className={`toggle ${formData.featured ? "active" : ""}`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      featured: !prev.featured,
                    }))
                  }
                />
              </div>
              <div className="option">
                <h4>Insurance coverage:</h4>
                <div
                  className={`toggle ${
                    formData.insurance_included ? "active" : ""
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      insurance_included: !prev.insurance_included,
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="form-container">
            <div className="form">
              <div className="input">
                <label htmlFor="title">Car title</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>

              <div className="inputs">
                <div className="input">
                  <label htmlFor="brand">Brand*</label>
                  <input
                    type="text"
                    id="brand"
                    required
                    value={formData.brand}
                    onChange={(e) =>
                      setFormData({ ...formData, brand: e.target.value })
                    }
                  />
                </div>
                <div className="input">
                  <label htmlFor="model">Model*</label>
                  <input
                    type="text"
                    id="model"
                    required
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({ ...formData, model: e.target.value })
                    }
                  />
                </div>
                <div className="input">
                  <label htmlFor="year">Year*</label>
                  <input
                    type="number"
                    id="year"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="textarea">
                <label htmlFor="overview">Description</label>
                <textarea
                  id="overview"
                  value={formData.overview}
                  onChange={(e) =>
                    setFormData({ ...formData, overview: e.target.value })
                  }
                ></textarea>
              </div>

              <div className="input">
                <label htmlFor="features">
                  Features
                  <span className="info">
                    Add "," comma after each feature.
                  </span>
                </label>
                <input
                  type="text"
                  id="features"
                  value={formData.features}
                  onChange={(e) =>
                    setFormData({ ...formData, features: e.target.value })
                  }
                />
              </div>

              <div className="inputs">
                <div className="input">
                  <label htmlFor="mileage">Mileage</label>
                  <input
                    type="number"
                    id="mileage"
                    value={formData.mileage}
                    onChange={(e) =>
                      setFormData({ ...formData, mileage: e.target.value })
                    }
                  />
                </div>
                <div className="input">
                  <label htmlFor="fuel">Fuel</label>
                  <input
                    type="text"
                    id="fuel"
                    value={formData.fuel}
                    onChange={(e) =>
                      setFormData({ ...formData, fuel: e.target.value })
                    }
                  />
                </div>
                <div className="input">
                  <label htmlFor="transmission">Transmission</label>
                  <input
                    type="text"
                    id="transmission"
                    value={formData.transmission}
                    onChange={(e) =>
                      setFormData({ ...formData, transmission: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="inputs">
                <div className="input">
                  <label htmlFor="carbody">Body</label>
                  <input
                    type="text"
                    id="carbody"
                    value={formData.body}
                    onChange={(e) =>
                      setFormData({ ...formData, body: e.target.value })
                    }
                  />
                </div>
                <div className="input">
                  <label htmlFor="seats">Seats</label>
                  <input
                    type="number"
                    id="seats"
                    value={formData.seats}
                    onChange={(e) =>
                      setFormData({ ...formData, seats: e.target.value })
                    }
                  />
                </div>
                <div className="input">
                  <label htmlFor="color">Color</label>
                  <input
                    type="text"
                    id="color"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="inputs">
                <div className="input price">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    id="price"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                  />
                </div>
                <div className="input tags">
                  <label htmlFor="tags">Tags</label>
                  <input
                    type="text"
                    id="tags"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="submit">
                <button type="button" className="cancel button">
                  Cancel
                </button>
                <button
                  type="submit"
                  className="save button"
                  disabled={isLoading}
                >
                  <span>
                    {isLoading
                      ? isEditMode
                        ? "Updating..."
                        : "Saving..."
                      : isEditMode
                      ? "Update Car"
                      : "Save Car"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCarPage;
