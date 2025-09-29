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
    map: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.4970175186195!2d30.091278474967105!3d-1.9545555980277256!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca6f46d387275%3A0x7b8b917a7206d1e2!2sKigali%20Convention%20Centre!5e0!3m2!1sen!2sus!4v1759067367901!5m2!1sen!2sus",
    name: "Kigali Convention Centre",
    coordinates: {
      latitude: -1.9545555980277256,
      longitude: 30.091278474967105,
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
