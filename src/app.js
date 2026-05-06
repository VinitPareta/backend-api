const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const app = express();

app.use(cors());
app.use(express.json());

// ✅ serve images
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.use("/api/users", userRoutes);

module.exports = app;
