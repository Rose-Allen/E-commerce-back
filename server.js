// const express = require("express");
// const http = require("http");
// const cors = require("cors");
// const app = express();
// const server = http.createServer(app);
// const io = require("socket.io")(server);
// const colors = require("colors");
// const authRoutes = require("./routes/authRoutes");
// const categoryRoutes = require("./routes/categoryRoutes");
// const productRoutes = require("./routes/productRoutes");
// const { connectionDB } = require("./config/db");
// const morgan = require("morgan");
// require("dotenv").config();

// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(express.json());
// app.use(morgan("dev"));

// connectionDB();

// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/category", categoryRoutes);
// app.use("/api/v1/product", productRoutes);

// // Socket.io server logic
// io.on("connection", (socket) => {
//   console.log("Client connected");

//   // Handle chat messages
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg); // Broadcast the message to all clients
//   });

//   // Handle disconnection
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

// const PORT = process.env.PORT || 8080;
// server.listen(PORT, () => {
//   console.log(
//     `Server running on ${process.env.DEV_MODE} mode on ${PORT} port`.bgBlue
//       .white
//   );
// });

const express = require("express");
const cors = require("cors");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const colors = require("colors");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const { connectionDB } = require("./config/db");
require("dotenv").config();
const { Server } = require("socket.io");
const PORT = process.env.PORT || 8080;
// Используйте cors middleware
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Middleware для установки заголовка Access-Control-Allow-Origin вручную
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // укажите свой домен и порт
//   res.header("Access-Control-Allow-Methods", "GET, POST"); // разрешить только указанные HTTP-методы
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// io.on("connection", (socket) => {
//   console.log("WebSocket подключен");

//   // Обработка входящих сообщений от WebSocket
//   socket.on("message", (message) => {
//     // Рассылка сообщения всем клиентам
//     // socket.emit("message", `Вы ответили: ${message}`);
//     socket.emit("message", `Вы написали: ${message}`);
//   });
// });
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (message) => {
    console.log("Received message:", message);
    io.emit("message", message); // Broadcast the message to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

connectionDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// app.use("/api/v1/message", helpersRoutes);

server.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} mode on ${PORT} port`.bgBlue
      .white
  );
});
