const Length = require('../model/length.model.js');
const url = require('url');

exports.create = (req, res) => {
    if (!req.body) {
        res.statue(400).send({
            message: 'Content can not be empty!',
        });
    }

    const length = new Length({
        plantName: req.body.plantName,
        pheightL: req.body.pheightL,
        pheightH: req.body.pheightH,
    });

    Length.create(length, (err, data) => {
        console.log(data);
        if (err) {
            res.statue(500).send({
                message: err.message || 'Some error occurred while creating the Sensor.',
            });
        }
        if (data) return res.send({ success: true });
        else return res.send({ success: false });
    });
};

exports.findAll = (req, res) => {
    Length.getAll((err, data) => {
        if (err) {
            res.statue(500).send({
                message: err.message || 'Some error occurred while retrieving sensor.',
            });
        }
        return res.send({ data });
    });
};

exports.findRecent = (req, res) => {
    Length.findRecent((err, data) => {
        if (err) {
            res.statue(500).send({
                message: err.message || 'Some error occurred while retrieving sensor.',
            });
        }
        return res.send({ data });
    });
};