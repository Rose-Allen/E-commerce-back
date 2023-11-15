const express = require("express");
const categoryController = require("../controllers/categoryController");
const { requireSignIn, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  categoryController.create
);
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  categoryController.update
);
router.get("/get-category", categoryController.getAll);

router.get(
  "/single-category/:slug",

  categoryController.getOne
);
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  categoryController.delete
);
module.exports = router;
