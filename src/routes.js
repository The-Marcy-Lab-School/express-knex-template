const express = require('express');
const router = express.Router();

// Add Models to the Router
const addModels = require('./middleware/add-models')
router.use(addModels);

// Import Controllers


// Define Routes


module.exports = router;