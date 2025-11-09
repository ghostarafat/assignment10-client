import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <div>
      <Navbar />

      <div style={{ minHeight: "80vh", padding: "20px" }}>
        <Outlet />
      </div>

      <Footer />
    </div>
  );
};

export default Root;
