const express = require('express');
const router = express.Router();
const customerCtrl = require('../controllers/customerCtrl');

// get customer profile
router.get('/profile/:id_profile', customerCtrl.getProfile);

// register new customers
router.post('/register', customerCtrl.register);

// login
router.post('/login', customerCtrl.login);

module.exports = router;
