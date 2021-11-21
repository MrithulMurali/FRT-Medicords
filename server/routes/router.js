const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");

router.post("/login", controller.login);
router.post("/register-user", controller.registerUser);
module.exports = router;
