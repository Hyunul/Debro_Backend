var createError = require('http-errors');
var express = require('express');
var path = require('path');
const { swaggerUi, specs } = require('./modules/swagger');
var indexRouter = require('./routes/index');
var weatherRouter = require('./routes/weather');
var S3Router = require('./routes/s3');
const bodyParser = require('body-parser');
const detenv = require('dotenv');
detenv.config('dotenv');

var app = express();
var port = 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRouter);
app.use('/weather', weatherRouter);
app.use('/s3', S3Router);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

require('./routes/sensor.js')(app);
require('./routes/plant.js')(app);
require('./routes/length.js')(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
