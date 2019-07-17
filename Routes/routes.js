const express = require('express');
const router = express.Router();

const deviceController = require('../Controllers/DeviceController');

router.post('/create-device', deviceController.createDevice);

module.exports = router;
