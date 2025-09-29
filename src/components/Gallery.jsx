import React, { useState, useEffect } from "react";
import FullscreenModal from "./FullScreenModal";
import galleryImages from "../mock/asset";

const ImageGallery = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (galleryImages.length > 6) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [galleryImages]);

  const openModal = (index) => {
    setModalImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePrev = () => {
    setModalImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setModalImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery">
      <div className="gallery-container">
        {galleryImages
          .slice(currentIndex, currentIndex + 6)
          .map((image, index) => (
            <div
              className="gallery-item"
              key={index}
              onClick={() => openModal(index)}
            >
              <img src={image} loading="lazy" />
            </div>
          ))}
      </div>

      {isModalOpen && (
        <FullscreenModal
          images={galleryImages}
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
