const express = require('express');
const { getCropPrediction } = require('../controllers/crop.controller');
const router = express.Router();

router.post('/get_prediction', getCropPrediction)
router.post('/find', getCropPrediction)

module.exports = router;