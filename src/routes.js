const express = require('express');
const addModels = require('./middleware/add-models');
// Import Controllers

const router = express.Router();

// Add Models to the Router
router.use(addModels);

// Define Routes

module.exports = router;
