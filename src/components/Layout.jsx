import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const WebLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default WebLayout;
