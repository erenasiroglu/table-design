require("dotenv").config();
const express = require("express"); // Bu satırı ekleyin
const userRoutes = require("./auth");
const router = express.Router();

router.use("/auth", userRoutes);

module.exports = router;
