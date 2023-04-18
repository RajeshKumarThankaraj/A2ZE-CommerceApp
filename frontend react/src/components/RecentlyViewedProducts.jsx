import React, { useState, useEffect } from "react";
import axios from "axios";

const RecentlyViewedProducts = () => {
  const [recentlyProducts, setRecentlyProducts] = useState([]);
  useEffect(() => {
    const fetchRecentProducts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_CLIENT_URL}/api/v1/public/products/recentlyViewed`
      );
      if (response.data.length) {
        setRecentlyProducts(response.data);
      }
      console.log(response.data);
    };
    fetchRecentProducts();
  }, []);
  return (
    <div className="recentlyViewedProductsContainer">
      <div className="recentlyViewedProductsTitle">
        <div className="recentlyViewedProductsText">
          Recently Viewed Products
        </div>
        <button type="button" class="btn btn-primary">
          View All
        </button>
      </div>
      <div className="recentlyViewedProductsList"></div>
    </div>
  );
};

export default RecentlyViewedProducts;
