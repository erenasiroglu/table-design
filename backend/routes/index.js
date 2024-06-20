// index.js

require("dotenv").config();

const express = require("express");
const router = express.Router();
const userRoutes = require("./authRoutes"); // auth.js dosyanızın yolu

router.use("/authRoutes", userRoutes);

module.exports = router;
