const express = require('express');
const router = express.Router();
const Patient = require('../Models/patientModel');

// Endpoint to get all patients
router.get('/patients', async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
