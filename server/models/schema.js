const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  bloodgrp: {
    type: String,
    required: true,
  },
  ailment: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  lastVisit: {
    type: String,
    required: true,
  },
});

module.exports = PatientDetails = mongoose.model("patient", patientSchema);
