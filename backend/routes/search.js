const express = require('express');
const Patient = require('../models/Patients'); // Assuming your Patient model is in the models folder
const router = express.Router();

// Route to search patients by mobile number
router.get('/patients/search', async (req, res) => {
    const { mobile } = req.query; // Get the mobile number from query parameters

    try {
        // Search for patients with the matching mobile number
        const patients = await Patient.find({ mobile: mobile });

        // If patients are found, return them as the response
        if (patients.length > 0) {
            res.json(patients);
        } else {
            res.status(404).json({ message: 'No patients found with the given mobile number.' });
        }
    } catch (error) {
        console.error('Error while searching for patients:', error);
        res.status(500).json({ message: 'An error occurred while searching. Please try again later.' });
    }
});

module.exports = router;
