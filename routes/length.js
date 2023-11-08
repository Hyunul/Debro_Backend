module.exports = (app) => {
    const length = require('../controller/length.controller.js');

    app.post('/length', length.create);

    app.get('/length', length.findRecent);

    app.get('/length/all', length.findAll);
};