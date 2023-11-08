const sql = require('../routes/db.js');

const Plant = function (plant) {
    this.userName = plant.userName;
    this.plantName = plant.plantName;
    this.address = plant.address;
    this.isOutside = plant.isOutside;
    this.selectedTitle = plant.selectedTitle;
};


Plant.create = (newPlant, result) => {
    sql.query('SELECT * FROM plant_data', (err, res) => {
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
        sql.query('INSERT INTO plant_data SET ?', newPlant, (err, res) => {
            if (err) {
                console.log('error: ', err);
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...newPlant });
        });

        sql.query('SET @count=0')
        sql.query('UPDATE plant_data SET plantNumber=@count:=@count+1')
        // else {
        //     result(null, null);
        //     return;
        // }
    });
};

Plant.findRecent = (result) => {
    sql.query('SELECT * FROM plant_data', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        console.log('plant: ', res[res.length - 1]);
        result(null, res[res.length - 1]);
    });
};

Plant.getAll = (result) => {
    sql.query('SELECT * FROM plant_data', (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(null, err);
            return;
        }
        console.log('plant: ', res);
        result(null, res);
    });
};

Plant.remove = (plantID, result) => {
    sql.query('DELETE FROM plant_data WHERE plantNumber = ?', plantID, (err, res) => {
        if (err) {
            console.log('error: ', err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            // 결과가 없을 시
            result({ kind: 'not_found' }, null);
            return;
        }

        console.log('deleted plant with id: ', plantID);
        result(null, res);
    });

    sql.query('SET @count=0')
    sql.query('UPDATE plant_data SET plantNumber=@count:=@count+1')

};

module.exports = Plant;
