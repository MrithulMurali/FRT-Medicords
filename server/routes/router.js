const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");
const auth = require("../middleware/auth");

router.get("/patient-data", controller.patientData);
router.get("/user/:key", controller.loggedUserdata);
router.put("/existing-user/:key", controller.existingPatient);
router.post("/login", controller.login);
router.post("/register-user", controller.registerUser);
router.delete("/delete/:key", auth, controller.delete);
module.exports = router;
