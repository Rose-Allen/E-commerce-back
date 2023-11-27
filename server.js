const express = require("express");
const cors = require("cors");
const app = express();
const colors = require("colors");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const { connectionDB } = require("./config/db");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
require("dotenv").config();

// app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

connectionDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(
//     `Server running on ${process.env.DEV_MODE} mode on ${PORT} port`.bgBlue
//       .white
//   );
// });

const io = new Server(server, { cors: { origin: "*" } });

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   // Handle chat message event
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg); // broadcast message to all clients
//   });
// });
// io.on("connection", (socket) => {
//   console.log("A user connected");

//   socket.on("message", (message) => {
//     console.log("Received message:", message);
//     io.emit("message", message); // Broadcast the message to all connected clients
//   });

//   socket.on("disconnect", () => {
//     console.log("User disconnected");
//   });
// });
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", ({ name, message }) => {
    console.log("Received message from " + name + ": " + message);
    // Broadcast the message along with the user's name
    io.emit("message", { name, message });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// ... rest of your express setup

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
