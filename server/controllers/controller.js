const bcrypt = require("bcrypt");
const PatientDetails = require("../models/schema");

//controller for registering user
exports.registerUser = async (req, res) => {
  try {
    if (!req.body) {
      res.json({ err: "You have fill the registration details!" });
      return;
    }
    let { name, bloodgrp, age, mobile, ailment, gender, username, password } =
      req.body;

    //hashing password
    const hash = await bcrypt.hashSync(password, 10);

    //Send data to mongodb

    const patientDetails = new PatientDetails({
      name,
      bloodgrp,
      age,
      mobile,
      ailment,
      gender,
      username,
      password: hash,
    });

    patientDetails
      .save(patientDetails)
      .then((register) => {
        res.json({ register });
      })
      .catch((err) => {
        res.status(406).json({
          err: err.message || "Something went wrong while registration!",
        });
      });

    res.json({
      name,
      bloodgrp,
      age,
      mobile,
      ailment,
      gender,
      username,
      hash,
    });
  } catch (error) {
    res.status(500).json({ err: error.message || "There was an error!" });
  }
  res.json({ message: "Register response" });
};

//controller for login
exports.login = (req, res) => {
  try {
    if (!req.body) {
      res.json({ err: "Please enter the login credentials!" });
      return;
    }
    let { key, username, password } = req.body;
    const patientPasswordHash =
      " $2b$10$YkUaoKXYI6GWnRT9dkLFxeM8OP8XPGuJ1XQjZDbDPC4P5MHI3tlPi";

    const isMatch = bcrypt.compare(password, patientPasswordHash);

    res.json({ key, username, password, isMatch });
  } catch (error) {
    res.status(500).json({
      err:
        error.message ||
        "There was an error while logging in. Try again later.",
    });
  }
  res.json({ key, username, pass });
};
