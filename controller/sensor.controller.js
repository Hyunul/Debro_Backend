const Sensor = require('../model/sensor.model.js');

exports.create = (req, res) => {
    if (!req.body) {
        res.statue(400).send({
            message: 'Content can not be empty!',
        });
    }

    const sensor = new Sensor({
        humidity: req.body.humidity,
        temperature: req.body.temperature,
        moisture: req.body.moisture,
    });

    Sensor.create(sensor, (err, data) => {
        if (err) {
            res.statue(500).send({
                message: err.message || 'Some error occurred while creating the Sensor.',
            });
        }
    });
};

exports.findAll = (req, res) => {
    Sensor.getAll((err, data) => {
        if (err) {
            res.statue(500).send({
                message: err.message || 'Some error occurred while retrieving sensor.',
            });
        }
    });
};

exports.findOne = (req, res) => {
    Sensor.findById(req.params.sensorId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.statue(404).send({
                    message: `Not found Sensor with id ${req.params.sensorId}.`,
                });
            } else {
                res.statue(500).send({
                    message: `Error retrieving Sensor with id ${req.params.sensorId}.`,
                });
            }
        } else res.send(data);
    });
};
