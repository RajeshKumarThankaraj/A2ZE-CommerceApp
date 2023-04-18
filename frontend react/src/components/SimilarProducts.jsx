import React from "react";
import { Link } from "react-router-dom";

const SimilarProducts = ({ similarProductList, currentProductId }) => {
  return (
    <div className="similarProductsContainer">
      <div className="similarProductsTitle">Similar Products</div>
      <div className="listOfSimilarProducts">
        {similarProductList.map(
          (product) =>
            product._id !== currentProductId && (
              <Link
                to={`/product-details/${product._id}`}
                className="singleProductSimilar"
                key={product._id}
              >
                <div className="productImage_Similar">
                  <img
                    class="singleProductImage_Similar"
                    src={
                      product.images &&
                      `${process.env.REACT_APP_CLIENT_URL}/api/v1/public/image/${product._id}/${product.images[0]}`
                    }
                  />
                </div>
                <div className="productTitle_Similar">${product.name}</div>
                <div className="productRating_Similar">
                  ${"⭐️".repeat(Math.ceil(product.overallRating))}
                </div>
                <div className="productPrice_Similar">${product.price}</div>
              </Link>
            )
        )}
      </div>
    </div>
  );
};

export default SimilarProducts;
