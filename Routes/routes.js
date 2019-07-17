const express = require('express');
const router = express.Router();

const deviceController = require('../Controllers/DeviceController');

router.post('/create-device', deviceController.createDevice);
router.get('/devices', deviceController.getDevices);
router.get('/device', deviceController.getDeviceById);
module.exports = router;
