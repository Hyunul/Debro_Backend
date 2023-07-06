module.exports = (app) => {
    const plant = require('../controller/plant.controller.js');

    app.post('/plant', plant.create);

    app.get('/plant', plant.findAll);

    app.get('/plant/recent', plant.findRecent);

    app.delete('/plant/:plantId', plant.delete);
};
