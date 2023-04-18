import Login from "./components/login";
import "../src/style.css";
import ProductsPage from "./views/ProductsPage";
import { Routes, Route } from "react-router-dom";
import ProductDetails from "./components/ProductDetails";
import NavBar from "./components/NavBar";
import CategoriesNavBar from "./components/CategoriesNavBar";
import RecentlyViewedProducts from "./components/RecentlyViewedProducts";

function App() {
  return (
    <div>
      {/* <Login /> */}
      <NavBar />
      <div className="d-flex flex-row">
        <Routes>
          <Route path="/?" element={<ProductsPage />} />
          <Route
            path="/product-details/:id"
            element={<ProductDetails />}
          ></Route>
        </Routes>
      </div>
      <RecentlyViewedProducts />
    </div>
  );
}

export default App;
