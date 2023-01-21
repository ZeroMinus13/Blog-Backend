const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

router.get('/get', (req, res) => {
  res.send('<h1>Get</h1>');
});

module.exports = router;
