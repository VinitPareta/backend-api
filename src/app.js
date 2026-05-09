const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/users", userRoutes);
app.use("/api/auth", require("./routes/authRoutes"));

module.exports = app;
