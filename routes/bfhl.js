const express = require('express');
const router = express.Router();
const {
  fibonacci,
  filterPrimes,
  lcmOfArray,
  hcfOfArray,
  callOpenAI,
} = require('../utils');

router.post('/', async (req, res) => {
  try {
    const keys = Object.keys(req.body);
    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false,
        official_email: process.env.OFFICIAL_EMAIL,
        error: 'Request must contain exactly one key'
      });
    }
    const key = keys[0];
    const value = req.body[key];
    if (key === 'fibonacci') {
      if (!Number.isInteger(value) || value < 0) {
        return res.status(400).json({
          is_success: false,
          official_email: process.env.OFFICIAL_EMAIL,
          error: 'fibonacci must be a non-negative integer'
        });
      }
      const result = fibonacci(value);
      return res.json({
        is_success: true,
        official_email: process.env.OFFICIAL_EMAIL,
        data: result
      });
    }
    if (key==='prime') {
      if (!Array.isArray(value)) {
        return res.status(400).json({
          is_success: false,
          official_email: process.env.OFFICIAL_EMAIL,
          error: 'prime must be an array'
        });
      }
      if (!value.every(num => Number.isInteger(num))) {
        return res.status(400).json({
          is_success: false,
          official_email: process.env.OFFICIAL_EMAIL,
          error: 'prime array must contain only integers'
        });
      }
      const result = filterPrimes(value);
      return res.json({
        is_success: true,
        official_email: process.env.OFFICIAL_EMAIL,
        data: result
      });
    }
    if (key === 'lcm') {
      if (!Array.isArray(value)) {
        return res.status(400).json({
          is_success: false,
          official_email: process.env.OFFICIAL_EMAIL,
          error: 'lcm must be an array'
        });
      }
      if (!value.every(num => Number.isInteger(num))) {
        return res.status(400).json({
          is_success: false,
          official_email: process.env.OFFICIAL_EMAIL,
          error: 'lcm array must contain only integers'
        });
      }
      if (value.length === 0) {
        return res.status(400).json({
          is_success: false,
          official_email: process.env.OFFICIAL_EMAIL,
          error: 'lcm array cannot be empty'
        });
      }
      const result = lcmOfArray(value);
      return res.json({
        is_success: true,
        official_email: process.env.OFFICIAL_EMAIL,
        data: result
      });
    }
    if (key === 'hcf') {
      if (!Array.isArray(value)) {
        return res.status(400).json({
          is_success: false,
          official_email: process.env.OFFICIAL_EMAIL,
          error: 'hcf must be an array'
        });
      }
      if (!value.every(num => Number.isInteger(num))) {
        return res.status(400).json({
          is_success: false,
          official_email: process.env.OFFICIAL_EMAIL,
          error: 'hcf array must contain only integers'
        });
      }
      if (value.length === 0) {
        return res.status(400).json({
          is_success: false,
          official_email: process.env.OFFICIAL_EMAIL,
          error: 'hcf array cannot be empty'
        });
      }
      const result = hcfOfArray(value);
      return res.json({
        is_success: true,
        official_email: process.env.OFFICIAL_EMAIL,
        data: result
      });
    }
    if (key === 'AI') {
      if (typeof value !== 'string' || value.trim() === '') {
        return res.status(400).json({
          is_success: false,
          official_email: process.env.OFFICIAL_EMAIL,
          error: 'AI value must be a non-empty string'
        });
      }
      const answer = await callOpenAI(value);
      if (!answer) {
        return res.status(500).json({
          is_success: false,
          official_email: process.env.OFFICIAL_EMAIL,
          error: 'Failed to get AI response'
        });
      }
      return res.json({
        is_success: true,
        official_email: process.env.OFFICIAL_EMAIL,
        data: answer
      });
    }
    res.status(400).json({
      is_success: false,
      official_email: process.env.OFFICIAL_EMAIL,
      error: 'Unknown operation'
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      official_email: process.env.OFFICIAL_EMAIL,
      error: 'Internal server error'
    });
  }
});

module.exports = router;
