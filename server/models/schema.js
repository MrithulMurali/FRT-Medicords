const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bloodgrp: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
    unique: true,
  },
  ailment: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const PatientDetails = mongoose.model("patient", patientSchema);

module.exports = PatientDetails;
