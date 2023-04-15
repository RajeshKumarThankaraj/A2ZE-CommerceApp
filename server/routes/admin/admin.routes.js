const express = require("express");
const router = express.Router();
const { UDError } = require("../../middlewares/errorHandler");
const upload = require("../../middlewares/multer.middleware")(`product`);
const Product = require("../../models/product.model");
const Category = require("../../models/productCategory.model");

router.post(
  "/products/addProduct",
  upload.array("images"),
  async (req, res, next) => {
    try {
      console.log("Hi");
      const {
        name,
        description,
        price,
        isOnOffer,
        discountPercent,
        categories,
        availableQuantity,
      } = req.body;

      if (!name || !description || !price || !availableQuantity) {
        throw new UDError({
          status: 400,
          message: "Please fill mandatory fields",
        });
      }

      const payload = {
        _id: req.productId,
        name,
        description,
        price,
        offerDetails: {
          isOnOffer,
          discountPercent,
        },
        categories: categories.split(","),
        availableQuantity,
      };
      console.log(payload);

      if (req.files) {
        const images = req.files.map((img) => img.filename);
        payload.images = images;
      }

      const response = await Product.create(payload);

      return res.status(201).json({
        message: `Product added successfully`,
        productId: response._id,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch("/products/updateProduct/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findOne({ _id: productId });

    if (!product) {
      throw new UDError({
        status: 400,
        message: "Product not found",
      });
    }

    const updated = await product.updateOne(req.body);

    res.status(200).json({
      status: "Update successful",
      mongo: updated,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/products/addProductCategory", async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      throw new UDError({
        status: 400,
        message: "Please add product category name",
      });
    }

    const response = await Category.create({ name });

    return res.status(201).json({
      message: `Product category added successfully`,
      categoryId: response._id,
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/products/updateProductCategory/:categoryId",
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;

      const category = await Category.findOne({ _id: categoryId });

      if (!category) {
        throw new UDError({
          status: 400,
          message: "Category not found",
        });
      }

      const updated = await category.updateOne(req.body);

      res.status(200).json({
        status: "Update successful",
        mongo: updated,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
