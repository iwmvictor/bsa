/**
 * update-sitemap.js
 * 
 * Generates sitemap.xml, JSON-LD structured data, and submits URLs to Bing IndexNow
 */
import fs from "fs";
import 'dotenv/config';
import fetch from "node-fetch";

// ---------------- CONFIG ----------------
const SITE_URL = "https://www.brightsafarisafrica.com";
const BASE_URL = process.env.VITE_API_BASE_URL;

// IndexNow key and URL
const INDEXNOW_KEY = "a1b2c3d4e5f67890abcdef1234567890"; // your key
const INDEXNOW_URL = "https://www.bing.com/indexnow";

// ---------------- HELPERS ----------------
function generateSlug(car) {
  return `${car.brand}-${car.model}-${car.year}`
    .toLowerCase()
    .replace(/\s+/g, "-");
}

function todayISO() {
  return new Date().toISOString().split("T")[0];
}

// ---------------- FETCH DATA ----------------
async function getCars() {
  const res = await fetch(`${BASE_URL}/car`);
  if (!res.ok) throw new Error("Failed to fetch cars from Xano");
  return res.json();
}

// ---------------- GENERATE SITEMAP ----------------
function generateSitemapXML(cars) {
  const urls = [
    { loc: "/", changefreq: "daily", priority: 1.0 },
    { loc: "/collection", changefreq: "weekly", priority: 0.9 },
    { loc: "/contact", changefreq: "monthly", priority: 0.7 },
  ];

  cars.forEach(car => {
    urls.push({
      loc: `/car/${generateSlug(car)}`,
      lastmod: car.updatedAt ? car.updatedAt.split("T")[0] : todayISO(),
      changefreq: "weekly",
      priority: 0.8
    });
  });

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach(u => {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${u.loc}</loc>\n`;
    xml += `    <lastmod>${u.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${u.changefreq}</changefreq>\n`;
    xml += `    <priority>${u.priority}</priority>\n`;
    xml += `  </url>\n`;
  });

  xml += "</urlset>";
  return xml;
}

// ---------------- GENERATE JSON-LD ----------------
function generateStructuredData(cars) {
  const carProducts = cars.map(car => ({
    "@type": "Product",
    "name": `${car.brand} ${car.model} ${car.year}`,
    "url": `${SITE_URL}/car/${generateSlug(car)}`,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": car.price || "N/A",
      "availability": "http://schema.org/InStock"
    }
  }));

  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Bright Safaris Africa",
    "url": SITE_URL,
    "sameAs": [
      "https://www.facebook.com/brightsafaris",
      "https://www.twitter.com/brightsafaris"
    ],
    "logo": `${SITE_URL}/images/brand/logo.png`,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Cars for Rent",
      "itemListElement": carProducts
    }
  };

  return JSON.stringify(data, null, 2);
}

// ---------------- SUBMIT TO INDEXNOW ----------------
async function submitToIndexNow(urls) {
  const payload = {
    host: "www.brightsafarisafrica.com",
    key: INDEXNOW_KEY,
    urlList: urls
  };

  try {
    const res = await fetch(INDEXNOW_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) {
      console.log("✅ IndexNow submission successful!");
    } else {
      console.log("❌ IndexNow submission failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("❌ IndexNow submission error:", err);
  }
}

// ---------------- MAIN ----------------
async function main() {
  try {
    const cars = await getCars();

    // Generate sitemap.xml
    const sitemapXML = generateSitemapXML(cars);
    fs.writeFileSync("./public/sitemap.xml", sitemapXML);
    console.log("✅ sitemap.xml generated");

    // Generate JSON-LD structured data
    const structuredData = generateStructuredData(cars);
    fs.writeFileSync("./public/structured-data.json", structuredData);
    console.log("✅ structured-data.json generated");

    // Prepare URL list for IndexNow
    const urlList = [
      `${SITE_URL}/`,
      `${SITE_URL}/collection`,
      `${SITE_URL}/contact`,
      ...cars.map(car => `${SITE_URL}/car/${generateSlug(car)}`)
    ];

    // Submit URLs
    await submitToIndexNow(urlList);

  } catch (err) {
    console.error(err);
  }
}

main();
