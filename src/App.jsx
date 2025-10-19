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
import RegisterPage from "./auth/Register";
import LoginPage from "./auth/Login";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./admin/component/Layout";
import DashboardOverview from "./admin/Overview";
import DashboardCars from "./admin/Cars";
import ProtectedRoute from "./auth/ProtectedRoute";
import NewCarPage from "./admin/NewCar";
import DashboardBookings from "./admin/Bookings";
import AdminMessages from "./admin/Messages";
import AdminSettings from "./admin/Settings";

function App() {
  useEffect(() => {
    drawBrightSafaris();
  }, []);

  return (
    <>
      <Toaster
        position="top-center"
        containerStyle={{
          zIndex: 999999999,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
            fontSize: "0.95rem",
          },
          success: {
            iconTheme: {
              primary: "#4caf50",
              secondary: "#fff",
            },
          },
        }}
      />
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

          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth" element={<LoginPage />} />
          <Route path="/auth/register-new-admin" element={<RegisterPage />} />

          <Route path="admin" element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="cars" element={<DashboardCars />} />
              <Route path="cars/:id/edit" element={<NewCarPage />} />
              <Route path="cars/new" element={<NewCarPage />} />
              <Route path="bookings" element={<DashboardBookings />} />
              <Route path="inbox" element={<AdminMessages />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
