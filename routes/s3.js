var express = require('express');
var AWS = require('aws-sdk');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config('dotenv');

// process.env.AWS_ACCESS_KEY
// process.env.AWS_SECRET_ACCESS_KEY

router.get('/', (req, res) => {
    const bucketName = 'capstone-bucket';

    const s3 = new AWS.S3({
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const params = {
        Bucket: bucketName,
        Key: 'plant_iamge/',
    };

    let objectlists = [];
    s3.listObjectsV2({ Bucket: 'capston-bucket' })
        .promise()
        .then((data) => {
            console.log('Object Lists : ', data);
            for (let i of data.Contents) {
                objectlists.push(i.Key);
            }
            console.log('objectlists : ', objectlists);
            return res.send(objectlists), objectlists;
        })
        .catch((error) => {
            console.error(error);
        });
});

module.exports = router;
