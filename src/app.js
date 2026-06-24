const express = require("express");

const productRoutes = require("./routes/product.routes.js");
const userRoutes = require("./routes/user.routes.js");
const logger = require("./middleware/logger.js");

const app = express();

app.use(express.json());

app.use(logger);

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

module.exports = app;