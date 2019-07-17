const mongoose = require('mongoose');
const DeviceModel = mongoose.model('Device');

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
    })
};