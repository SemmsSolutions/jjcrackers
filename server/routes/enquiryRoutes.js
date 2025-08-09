// routes/enquiryRoutes.js
const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

// POST: /api/enquiry
router.post('/', async (req, res) => {
  const { name, mobile, message } = req.body;

  if (!name || !mobile || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const enquiry = new Enquiry({ name, mobile, message });
    await enquiry.save();
    res.status(201).json({ message: 'Enquiry submitted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// (Optional) GET: /api/enquiry – to view all enquiries
router.get('/', async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ date: -1 });
    res.status(200).json(enquiries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch enquiries.' });
  }
});

module.exports = router;
