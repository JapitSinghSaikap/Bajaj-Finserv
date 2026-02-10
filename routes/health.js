const express = require('express');
const router = express.Router();
const { CHITKARA_EMAIL } = require('../utils'); // This will be replaced

router.get('/', (req, res) => {
  res.json({
    is_success: true,
    official_email: process.env.OFFICIAL_EMAIL
  });
});

//Used for checking
// router.get('/check-api-key', (req, res) => {
//   const apiKey = process.env.OPENAI_API_KEY; // Check for OpenAI API key
//   if (apiKey && apiKey.length > 0) {
//     res.json({
//       is_success: true,
//       official_email: process.env.OFFICIAL_EMAIL,
//       api_key_status: 'present'
//     });
//   } else {
//     res.status(400).json({
//       is_success: false,
//       official_email: process.env.OFFICIAL_EMAIL,
//       api_key_status: 'missing'
//     });
//   }
// });

module.exports = router;
