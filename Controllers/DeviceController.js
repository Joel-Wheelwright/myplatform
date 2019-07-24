const mongoose = require('mongoose');
const DeviceModel = mongoose.model('Device');
const nodeMailer = require('nodemailer');

const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.MAIL_ACCOUNT,
        pass: process.env.MAIL_PASSWORD
    }
});

module.exports.createDevice = function(req, res){
    const name = req.body.name;
    const type = req.body.type;

    if(!name) {
        res.status(400).send('Missing name');
    };

    const newDevice = new DeviceModel({
        name: name,
        type: type
    });

    newDevice.save().then(function(device){
        if (device) {
            res.status(200).send('Device created');
        } else {
            res.status(400).send('Device creation failed');
        };
    });
};

module.exports.getDevices = function(req, res){
    DeviceModel.find({}).then(function(devices){
        res.json(devices);
    });
};

module.exports.getDeviceById = function(req, res){
    const deviceId = req.query.id
    DeviceModel.findById(deviceId).then(function(device) {
        if (device){
            res.json(device);
        } else {
            res.status (404).send('No device found with this id');
        }
    })
    .catch(function(error){
        res.status(400).send(error);
    });
};

module.exports.updateDevice = function(req, res){
        const deviceId = req.body.deviceId;
        const newDeviceStatus = req.body.status;
        DeviceModel.findByIdAndUpdate(deviceId, {status:newDeviceStatus}).then(function(device){
            if(device){
                res.status(200).send("Device Updated Succesfully");
            } else{
                res.status(404).send("No device found with this id");
            }
        });
}

module.exports.sendEmail = function(req, res) {
    const deviceId = req.body.deviceId;
    const date = new Date();
    const formattedDate = date.toISOString();
    const mailOptions = {
        from: process.env.MAIL_ACCOUNT,
        to:'joel.whe@techtalents.club',
        subject: formattedDate + ' || New alert from device: ' + deviceId,
        html:`<p>The device with ID:${deviceId} send you an alert at ${formattedDate} </p>`
    };

    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            console.log(info);
            res.status(200).json(info);
        }
    });
};