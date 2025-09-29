// ASCIIArt.js
import iwm from "/images/img/iwm.png";

const drawBrightSafaris = () => {
  // Log the formatted text block
  console.log(`
  ===========================
   BRIGHT SAFARIS AFRICA LTD
   --------------------------
   Designed & Developed by:
   - Iwmvictor
   - Modula HQ (Agency)
   - https://iwmvictor.vercel.app
   - https://modulahq.vercel.app
   -----------------------------

   Need a website for your business?
   Looking for design or development services?
   >> Look no further! 
   250 78 199 6271 - Victor
  ===========================
  `);

  console.log(`
  
   MODULA HQ
   --------------------------
   A Rwanda based product design and development agency
   
   - https://modulahq.vercel.app
   -----------------------------

   Need a website for your business?
   Looking for design or development services?
   >> Look no further! 
   250 78 199 6271  (WhatsApp)
  ===========================
  `);

  // Create an image element and log it
  const img = new Image();
  img.src = iwm; // Set the image source to the imported image
  img.onload = () => {
    console.log(img); // This will log the image object when it's loaded
  };

  // Alternatively, you can log the image as a background in the console
  console.log(
    "%c ",
    `font-size: 1px; padding: 200px; background: url(${iwm}) center cover no-repeat;`
  );
};

export default drawBrightSafaris;
