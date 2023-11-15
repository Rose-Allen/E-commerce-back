const express = require("express");
const cors = require("cors");
const app = express();
const colors = require("colors");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const { connectionDB } = require("./config/db");
const morgan = require("morgan");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

connectionDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode on ${PORT} port`.bgBlue
      .white
  );
});
