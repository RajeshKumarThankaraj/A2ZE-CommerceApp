const express = require("express");
const router = express.Router();
const Product = require("../../models/product.model");
const ProductCategory = require("../../models/productCategory.model");
const fs = require("fs");
const appRoot = require("app-root-path");
const { UDError } = require("../../middlewares/errorHandler");
const cookieParser = require("cookie-parser");

router.use(cookieParser());

router.get("/products?", async (req, res, next) => {
  try {
    const { category, productId, page = 1, limit = 10 } = req.query;
    let query = {};

    if (category) {
      query = { categories: category };
    } else if (productId) {
      query = { _id: productId };

      const recentlyViewed = req.cookies.recentlyViewed || [];
      const index = recentlyViewed.indexOf(productId);

      if (index !== -1) {
        recentlyViewed.splice(index, 1);
      }

      recentlyViewed.unshift(productId);

      res.cookie("recentlyViewed", recentlyViewed, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        domain: "localhost:3000",
      });
    }

    const count = await Product.countDocuments(query);
    const totalPages = Math.ceil(count / limit);
    const currentPage = parseInt(page);

    if (currentPage > totalPages) {
      throw new UDError({
        status: 404,
        message: "Requested resource does not exist",
      });
    }

    const products = await Product.find(query)
      .limit(limit)
      .skip((currentPage - 1) * limit);

    res.status(200).json({
      products,
      totalPages,
      currentPage,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/image/:productId/:imageId", (req, res, next) => {
  try {
    const { productId, imageId } = req.params;
    const imageUrl = `${appRoot}/uploads/images/${productId}/${imageId}`;

    if (!fs.existsSync(imageUrl)) {
      throw new UDError({
        status: 404,
        message: "Requested resource does not exist",
      });
    }

    res.status(200).sendFile(imageUrl);
  } catch (error) {
    next(error);
  }
});

router.get("/products/recentlyViewed", async (req, res, next) => {
  try {
    const recentlyViewed = req.cookies.recentlyViewed || [];
    const products = await Product.find({ _id: { $in: recentlyViewed } });

    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/getCategories?", async (req, res, next) => {
  try {
    const { categoryId } = req.query;
    let query;
    if (categoryId) {
      query = { _id: categoryId };
    }
    const response = await ProductCategory.find(query);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
