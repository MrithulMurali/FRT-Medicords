const bcrypt = require("bcrypt");
const PatientDetails = require("../models/schema");
const jwt = require("jsonwebtoken");

//controller for registering user
exports.registerUser = async (req, res) => {
  try {
    if (!req.body) {
      res.status(406).json({ err: "You have fill the registration details!" });
      return;
    }
    let { name, bloodgrp, age, key, ailment, gender, password } = req.body;

    //hashing password
    const hash = await bcrypt.hashSync(password, 10);

    //Send data to mongodb

    const patientDetails = new PatientDetails({
      key,
      password: hash,
      name,
      bloodgrp,
      age,
      ailment,
      gender,
    });

    patientDetails
      .save(patientDetails)
      .then((register) => {
        res.json(register);
      })
      .catch((err) => {
        res.status(406).json({
          err: err.message || "Something went wrong while registration!",
        });
      });

    console.log({
      name,
      bloodgrp,
      age,
      key,
      ailment,
      gender,
      hash,
    });
  } catch (error) {
    return res
      .status(406)
      .json({ err: error.message || "Error while registration" });
  }
};

//controller for login
exports.login = async (req, res) => {
  let { key, password } = req.body;

  try {
    if (!req.body) {
      res.status(406).json({ err: "Please enter the login credentials!" });
      return;
    }
    //get-user input

    const patient = await PatientDetails.findOne({ key });

    if (!patient)
      return res.status(406).json({
        err: "Uh oh! No user registered with this mobile number.",
      });

    const isMatch = await bcrypt.compare(password, patient.password);

    if (!isMatch) return res.status(406).json({ err: "Invalid credentials!" });

    //crete jwt token
    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET);
    console.log(token);

    res.json({
      token,
      key: patient.key,
      name: patient.name,
      ailment: patient.ailments,
    });
  } catch (error) {
    res.status(500).json({
      err:
        error.message ||
        "There was an error while logging in. Try again later.",
    });
  }
};

//delete the account
exports.delete = async (req, res) => {
  try {
    await PatientDetails.findByIdAndDelete(req.patient_id);
    res.json({ message: "User deleted successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ error: err.message || "Error while deleting the user!" });
  }
};
