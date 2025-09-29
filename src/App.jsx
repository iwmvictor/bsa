import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import WebLayout from "./components/Layout";
import Homepage from "./pages/Homepage";
import CarListPage from "./pages/CarList";
import CarDetailPage from "./pages/CarDetail";
import ServicePage from "./pages/Service";
import ContactPage from "./pages/Contact";
import ErrorPage from "./pages/Error";
import CommingSoonPage from "./pages/CommingSoon";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import drawBrightSafaris from "./mock/ACIIArt";

function App() {
  useEffect(() => {
    drawBrightSafaris();
  }, []);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<WebLayout />}>
            <Route index element={<Homepage />} />

            <Route path="collection" element={<CarListPage />} />
            <Route path="car/:path" element={<CarDetailPage />} />

            {/* <Route path="service/:path" element={<ServicePage />} /> */}
            <Route path="contact" element={<ContactPage />} />

            {/* <Route path="next" element={<CommingSoonPage />} /> */}

            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
