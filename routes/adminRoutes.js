const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

//admin routes
router.get("/check", adminController.check);
router.post("/login", adminController.login);

module.exports = router;
