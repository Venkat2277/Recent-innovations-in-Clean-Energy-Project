const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { barChart, pieChart, initData } = require("../controllers/chart");

router.get('/bar', auth, barChart);
router.get('/pie', auth, pieChart);
router.post('/initData', initData);


module.exports = router;
