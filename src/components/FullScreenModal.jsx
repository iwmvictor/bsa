import { LuArrowLeft, LuArrowRight, LuX } from "react-icons/lu";

const FullscreenModal = ({ images, currentIndex, onPrev, onNext, onClose }) => {
  return (
    <div className="full-img-modal">
      <div className="modal">
        <div className="img">
          <button className="close" onClick={onClose}>
            <LuX />
          </button>
          <img
            src={images[currentIndex]}
            alt="full-screen"
            className="modal-image"
          />
          <div className="modal-controls">
            <button className="modal-prev" onClick={onPrev}>
              <LuArrowLeft />
            </button>
            <button className="modal-next" onClick={onNext}>
              <LuArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullscreenModal;
