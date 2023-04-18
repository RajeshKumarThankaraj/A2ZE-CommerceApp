import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SimilarProducts from "./SimilarProducts";
import Cookies from "js-cookie";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  let { id } = useParams();
  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_CLIENT_URL}/api/v1/public/products?productId=${id}`,
        { withCredentials: true }
      );
      if (response.data.products.length) {
        setProductDetails(response.data.products[0]);
      }
      const similarProductResponse = await axios.get(
        `${process.env.REACT_APP_CLIENT_URL}/api/v1/public/products?category=${response.data.products[0].categories[0]}`
      );
      if (similarProductResponse.data.products.length) {
        setSimilarProducts(similarProductResponse.data.products);
      }
      console.log(response);
      // const recentlyViewed = Cookies.get("recentlyViewed");
      const recentlyViewed = `${document.Cookies}`;
      console.log(recentlyViewed);
    };
    fetchProductDetails();
  }, [id]);
  if (!productDetails) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <div className="productConatiner">
        <div className="productImageContainer">
          <img
            className="productDescriptionImage"
            src={
              productDetails.images &&
              `${process.env.REACT_APP_CLIENT_URL}/api/v1/public/image/${id}/${productDetails.images[0]}`
            }
            alt="Laptop Image"
          />
        </div>
        <div className="productDetailsContainer">
          <div className="productTitle">{productDetails.name}</div>
          <div className="productPriceRow">
            <div className="discountProductPrice"></div>
            <div className="productPrice">{productDetails.price}</div>
            <div className="discountedPercentage">
              {productDetails.offerDetails &&
                productDetails.offerDetails.discountPercent}
              %
            </div>
          </div>
          <div className="productDescriptionDetails">
            {productDetails.description}
          </div>
        </div>
      </div>
      <SimilarProducts
        similarProductList={similarProducts}
        currentProductId={id}
      />
    </div>
  );
};

export default ProductDetails;
