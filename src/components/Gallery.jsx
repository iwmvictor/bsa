import React, { useState, useEffect } from "react";
import FullscreenModal from "./FullScreenModal";
import { getGalleryImages } from "../mock/asset"; // async function

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  // Load images from backend
  useEffect(() => {
    const loadImages = async () => {
      try {
        const loadedImages = await getGalleryImages();
        setImages(loadedImages);
      } catch (error) {
        console.error("Failed to load gallery images:", error);
      }
    };

    loadImages();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (images.length <= 6) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePrev = () => {
    setModalImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setModalImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery">
      <div className="gallery-container">
        {images.slice(currentIndex, currentIndex + 6).map((image, index) => (
          <div
            className="gallery-item"
            key={index}
            onClick={() => openModal(currentIndex + index)}
            style={{
              background: "#f5f7fa",
            }}
          >
            <img src={image} alt={`${index + 1}`} loading="lazy" />
          </div>
        ))}
      </div>

      {isModalOpen && (
        <FullscreenModal
          images={images}
          currentIndex={modalImageIndex}
          onPrev={handlePrev}
          onNext={handleNext}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default ImageGallery;
