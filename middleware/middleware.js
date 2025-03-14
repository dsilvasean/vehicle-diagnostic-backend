const express = require('express');

// Middleware to parse JSON request body
const jsonParser = express.json();

// Middleware to parse URL-encoded form data
const urlEncodedParser = express.urlencoded({ extended: true });

module.exports = { jsonParser, urlEncodedParser };
