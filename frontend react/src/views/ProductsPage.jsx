import React, { useState, useEffect } from "react";
import axios from "axios";

import Product from "../components/Product";
import { useSearchParams } from "react-router-dom";
import CategoriesNavBar from "../components/CategoriesNavBar";
import Cookies from "js-cookie";

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  let query = "";
  if (searchParams.get("category")) {
    query = `?category=${searchParams.get("category")}`;
  }
  console.log(query);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_CLIENT_URL}/api/v1/public/products/${query}`
      );
      if (response.data.products.length) {
        setProducts(response.data.products);
        console.log(JSON.parse(Cookies.get("recentlyViewed")));
        // document.cookie = response.cookies;
        console.log(document.cookie);
      }
      console.log(products);
    };
    fetchProducts();
  }, [query]);
  return (
    <>
      <CategoriesNavBar />
      <div className="productsPageContainer">
        <div className="productFilter">
          <div className="productFilterTitle">
            <div className="">Filters</div>
            <div className="" style={{ fontSize: "15px", marginTop: "5px" }}>
              CLEAR ALL
            </div>
          </div>
          <div className="productCategory">Category</div>
        </div>
        <div className="productListWholeConatiner">
          {products.map((product, i) => (
            <Product product={product} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
