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
    let {
      name,
      bloodgrp,
      age,
      key,
      ailment,
      gender,
      password,
      lastVisit,
      state,
      email,
    } = req.body;

    //hashing password
    const hash = await bcrypt.hashSync(password, 10);

    //Send data to mongodb

    const patientDetails = new PatientDetails({
      key,
      password: hash,
      name,
      bloodgrp,
      age,
      gender,
      email,
      state,
      recordData: [{ lastVisit, ailment }],
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

    console.log(patient);

    if (!patient)
      return res.status(406).json({
        err: "Uh oh! No user registered with this mobile number.",
      });

    const isMatch = await bcrypt.compare(password, patient.password);

    if (!isMatch) return res.status(406).json({ err: "Invalid credentials!" });

    //crete jwt token
    const token = jwt.sign({ id: patient._id }, `${process.env.JWT_SECRET}`, {
      expiresIn: "1h",
    });
    console.log(token);

    res.json({
      token,
      key: patient.key,
      name: patient.name,
      bloodgrp: patient.bloodgrp,
      age: patient.age,
      gender: patient.gender,
      recordData: patient.recordData,
    });
  } catch (error) {
    res.status(500).json({
      err:
        error.message ||
        "There was an error while logging in. Try again later.",
    });
  }
};
// Add records to exisiting patient
exports.existingPatient = async (req, res) => {
  try {
    let { key, ailment, lastVisit } = req.body;
    let existingPatient = await PatientDetails.findOneAndUpdate(
      { key },
      { upsert: true, new: true }
    );
    existingPatient.recordData.push({ lastVisit, ailment });
    existingPatient.save(existingPatient).then((update) => {
      res.json(update);
    });
  } catch (error) {
    res.status(500).json({
      err: error.message || "There was an error while updating the record!",
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

// Admin Patient data

exports.patientData = (req, res) => {
  PatientDetails.find()
    .then((data) => {
      const newArray = [];
      for (let i = 0; i < data.length; i++) {
        const { _id, name, bloodgrp, age, gender, recordData, key } = data[i];
        let lastUpdatedData = recordData.slice(-1);

        const updatedValues = {
          key,
          _id,
          name,
          bloodgrp,
          age,
          gender,
          recordData: lastUpdatedData,
        };
        newArray.push(updatedValues);
      }
      res.json(newArray);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ error: err.message || "Error while fetching data!" })
    );
};

//Logged patient data

exports.loggedUserdata = (req, res) => {
  const key = req.params.key;

  PatientDetails.find({ key })
    .then((data) => {
      if (data) {
        data.forEach((response) => {
          const {
            _id,
            key,
            name,
            age,
            bloodgrp,
            gender,
            recordData,
            state,
            email,
          } = response;
          res.json({
            _id,
            key,
            name,
            age,
            bloodgrp,
            gender,
            recordData,
            state,
            email,
          });
        });
      } else {
        res
          .status(404)
          .json({ err: `No user found with the mobilenumber ${key}` });
      }
    })
    .catch((error) => {
      res
        .status(500)
        .json({ err: error.message || "Error occurred while fetching data" });
    });
};
