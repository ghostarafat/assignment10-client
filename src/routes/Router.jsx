import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CategoryFilteredProduct from "../pages/CategoryFilteredProduct";
// import other pages as needed
// import Login from "../pages/Login";
// import Register from "../pages/Register";
// import ListingDetails from "../pages/ListingDetails";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/category-filtered-product/:categoryName"
        element={<CategoryFilteredProduct />}
      />
      {/* add other routes below */}
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="/listing/:id" element={<ListingDetails />} /> */}
    </Routes>
  );
};

export default Router;
