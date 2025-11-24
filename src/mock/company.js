import { assets } from "./asset";

export const companyInfo = {
  phoneMtn: "250789829879",
  phoneAirtel: "250735666013",
  gmail: "brightsafarisafrica@gmail.com",
  //   email: "info@brightsafaris.com",
  location: "Kigali, Rwanda",
  address: {
    title: "Kigali, Rwanda",
    road: "KG 512 St.",
    mapLink: "",
    map: "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d249.21903464123113!2d30.115253570944226!3d-1.9513797128724537!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sPharmacies!5e0!3m2!1sen!2srw!4v1763955829816!5m2!1sen!2srw",
    name: "Bright Safaris Africa - Near Contrôle Technique",
    coordinates: {
      latitude: -1.9513797128724537,
      longitude: 30.115253570944226,
    },
  },

  logo: assets.brand.logo,
  icon: assets.brand.icon,

  phone: {
    mtn: "250789829879",
    airtel: "250735666013",
  },

  socials: {
    instagram: "brightsafarisafrica",
    tiktok: "brightsafarisafrica",
    facebook: "brightsafarisafrica",
  },
};

export const formatPhoneNum = (num) => {
  const str = String(num);
  if (str.length !== 12) return num;
  return `${str.slice(0, 3)} ${str.slice(3, 5)} ${str.slice(5, 9)} ${str.slice(
    9
  )}`;
};
