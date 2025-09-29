// brand
import logo from "/images/brand/logoo.png";
import icon from "/images/brand/icon.png";

import heroBg from "/images/bg/hero1.jpeg";
const footer1Bg =
  "https://framerusercontent.com/images/ql79yPqCxT8tQxgMJxYIsdT0BU.png";

import carPlaceholder from "/images/img/car.svg";

import iwm from "/images/img/iwm.png";

import serviceImg1 from "/images/img/collection.avif";
import serviceImg2 from "/images/img/cars.webp";

export const assets = {
  heroBg,

  carPlaceholder,

  serviceImg1,
  serviceImg2,

  brand: {
    logo,
    icon,
  },
};

// =====

import igallery from "/icons/gallery.svg";
import { showroom } from "./cars";

export const ikons = {
  igallery,
};

const galleryImages = showroom.flatMap((car) => car.gallery);
export default galleryImages;
