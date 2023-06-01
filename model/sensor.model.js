const sql = require('../routes/db.js');

const Sensor = function (sensor) {
    this.humidity = sensor.humidity;
    this.temperature = sensor.temperature;
    this.moisture = sensor.moisture;
    this.ph = sensor.ph;
};

Sensor.create = (newSensor, result) => {
    sql.query('INSERT INTO sensor_data SET ?', newSensor, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }
        result(null, { id: res.insertId, ...newSensor });
    });
};

Sensor.getAll = (result) => {
    sql.query('SELECT * FROM sensor_data', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        console.log('sensor: ', res);
        result(null, res);
    });
};

Sensor.findByID = (sensorID, result) => {
    sql.query('SELECT * FROM sensor_data WHERE id = ?', sensorID, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log('found customer: ', res[0]);
            result(null, res[0]);
            return;
        }

        // 결과가 없을 시
        result({ kind: 'not_found' }, null);
    });
};

module.exports = Sensor;
