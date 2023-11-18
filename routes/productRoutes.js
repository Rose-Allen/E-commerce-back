const express = require("express");
const productController = require("../controllers/productController");
const { isAdmin, requireSignIn } = require("../middleware/authMiddleware");
const formidable = require("express-formidable");
const router = express.Router();

router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  productController.create
);

router.put(
  "/update-product/:pId",
  requireSignIn,
  isAdmin,
  formidable(),
  productController.update
);
router.get("/get-product", productController.getAll);
router.get("/get-product/:slug", productController.getOne);
router.get("/product-photo/:pId", productController.getPhoto);
router.delete("/delete-product/:pId", productController.delete);

module.exports = router;
