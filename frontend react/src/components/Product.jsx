import React from "react";
import { Link, link } from "react-router-dom";

const Product = ({ product }) => {
  const url = `/product-details/${product._id}`;
  return (
    <div className="productsListContainer">
      <div className="productsList">
        <Link to={url} className="singleProductFromList">
          <img
            className="singleProductImage"
            src={`${process.env.REACT_APP_CLIENT_URL}/api/v1/public/image/${product._id}/${product.images[0]}`}
          />
          <div className="singleProductTitle">{product.name}</div>
          <div className="singleProductPrice">
            <div className="singleProductDiscountedPrice">
              ₹
              {(
                product.price -
                (product.price * product.offerDetails.discountPercent) / 100
              ).toFixed(2)}
            </div>
            <div className="OfferRow">
              <div className="singleProductMaxPrice">₹{product.price}</div>
              <div className="singleProductOfferPriceDiscountPercentage">
                {product.offerDetails.discountPercent}% off
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Product;
