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
router.get("/get-product", productController.getAll);
router.get("/get-product/:slug", productController.getOne);

module.exports = router;
