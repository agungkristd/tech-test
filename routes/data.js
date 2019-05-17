const express = require('express');
const router = express.Router();
const dataCtrl = require('../controllers/dataCtrl');

router.post('/findnumber', dataCtrl.findNumber);

module.exports = router;