const express = require('express');
const router = express.Router();

const deviceController = require('../Controllers/DeviceController');
const dataController = require('../Controllers/DataController');

router.post('/create-device', deviceController.createDevice);
router.get('/devices', deviceController.getDevices);
router.get('/device', deviceController.getDeviceById);
router.post('/save-data', dataController.saveData);
router.get('/get-data', dataController.getDeviceData);
router.post("/update-device", deviceController.updateDevice);
router.post("/send-email", deviceController.sendEmail);
module.exports = router;
