import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";

import img64038cb7287476d274a0645c from "../images/64038cb7287476d274a0645c.webp";
import img64076f8084b5a260468af0b2 from "../images/64076f8084b5a260468af0b2.webp";
import img640774d241f14b7ba33835fd from "../images/640774d241f14b7ba33835fd.webp";
import img6419eecd22ce6c8e5ac2a9a4 from "../images/6419eecd22ce6c8e5ac2a9a4.webp";
import viewAllImages from "../images/viewAllCategories.jpeg";

const CategoriesNavBar = () => {
  const categoryImages = {
    img64038cb7287476d274a0645c,
    img64076f8084b5a260468af0b2,
    img640774d241f14b7ba33835fd,
    img6419eecd22ce6c8e5ac2a9a4,
  };
  const [searchParams, setSearchParams] = useSearchParams();
  const [catogries, setCategories] = useState([]);
  const handleCategoryChange = (category) => {
    if (!category) {
      searchParams.delete("category");
      setSearchParams(searchParams);
      return;
    }
    setSearchParams({ category });
  };
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_CLIENT_URL}/api/v1/public/getCategories`
      );
      if (response.data.length) {
        setCategories(response.data);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div className="categoriesNavBarPanel">
      {catogries.map((category) => (
        <div
          className="categoryIconDiv"
          onClick={() => {
            handleCategoryChange(category._id);
          }}
          key={category._id}
        >
          <img
            className="categoryImage"
            src={categoryImages[`img${category._id}`]}
            alt={category.name}
          />
          <div className="categoryTitle">{category.name}</div>
        </div>
      ))}

      <div
        className="viewAllCategoryIcon categoryIconDiv"
        onClick={() => {
          handleCategoryChange("");
        }}
      >
        <img
          className="categoryImage"
          src={viewAllImages}
          alt="View All Products"
        />
        <div className="categoryTitle">View All Products</div>
      </div>
    </div>
  );
};

export default CategoriesNavBar;
