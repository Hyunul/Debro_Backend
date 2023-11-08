const sql = require('../routes/db.js');

const Length = function (length) {
    this.plantName = length.plantName;
    this.pheightL = length.pheightL;
    this.pheightH = length.pheightH;
};


Length.create = (newLength, result) => {
    sql.query('SELECT * FROM length_data', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        // if (res.length == 0) {
        //     sql.query('INSERT INTO plant_data SET ?', newPlant, (err, res) => {
        //         if (err) {
        //             console.log('error: ', err);
        //             result(err, null);
        //             return;
        //         }
        //         result(null, { id: res.insertId, ...newPlant });
        //     });
        // } else if (newPlant.length > res[res.length - 1].length) {
        //     sql.query('INSERT INTO plant_data SET ?', newPlant, (err, res) => {
        //         if (err) {
        //             console.log('error: ', err);
        //             result(err, null);
        //             return;
        //         }
        //         result(null, { id: res.insertId, ...newPlant });
        //     });
        // } 
        sql.query('INSERT INTO length_data SET ?', newLength, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newLength });
        });
        return;
    });
};

Length.findRecent = (result) => {
    sql.query('SELECT * FROM length_data', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        console.log('length: ', res[res.length - 1]);
        result(null, res[res.length - 1]);
    });
};

Length.getAll = (result) => {
    sql.query('SELECT * FROM length_data', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        console.log('length: ', res);
        result(null, res);
    });
};

module.exports = Length;
