var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/get/demo', function (req, res) {
    res.status(200).json({
        message: 'call get api demo',
    });
});

router.post('/post/demo', function (req, res) {
    res.status(200).json({
        message: 'call post api demo',
    });
});

module.exports = router;
