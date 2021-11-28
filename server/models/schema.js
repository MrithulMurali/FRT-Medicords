const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  age: {
    type: String,
  },
  bloodgrp: {
    type: String,
  },
  ailment: {
    type: String,
  },
  gender: {
    type: String,
  },
  email: {
    type: String,
  },
  state: {
    type: String,
  },
  recordData: [
    {
      lastVisit: { type: String, required: true },
      ailment: { type: String, required: true },
    },
  ],
});

module.exports = PatientDetails = mongoose.model("patient", patientSchema);
