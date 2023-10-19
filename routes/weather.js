const express = require('express');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');
const moment = require('moment');
require('moment-timezone');

router.get('/', function (req, res, next) {
    const key = 'kEJIkSMDN2B%2FKruJC7BJ0tssPOtW8Ldx%2BL%2FRrrObpJ4bC5I5IbHD1P3fx7YUHPbF2K%2BLVoHps8Ydmkf3tCdzxw%3D%3D';

    moment.tz.setDefault('Asia/Seoul');
    let date = moment().format('YYYYMMDD');
    const now = new Date();
    let hour = now.getHours();

    if (hour < 2) {
        date = moment().subtract(1, 'days').format('YYYYMMDD');
        hour = '2300';
    } else if (hour < 5) {
        hour = '0200';
    } else if (hour < 8) {
        hour = '0500';
    } else if (hour < 11) {
        hour = '0800';
    } else if (hour < 14) {
        hour = '1100';
    } else if (hour < 17) {
        hour = '1400';
    } else if (hour < 20) {
        hour = '1700';
    } else if (hour < 23) {
        hour = '2000';
    } else {
        hour = '2300';
    }

    const nx = '60';
    const ny = '127';
    // const dataType = 'XML';

    console.log(date, hour)

    var url = 'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst';
    var queryParams = '?' + encodeURIComponent('serviceKey') + '=' + key; /* Service Key*/
    queryParams += '&' + encodeURIComponent('pageNo') + '=' + encodeURIComponent('1'); /* */
    queryParams += '&' + encodeURIComponent('numOfRows') + '=' + encodeURIComponent('10'); /* */
    queryParams += '&' + encodeURIComponent('dataType') + '=' + encodeURIComponent('JSON'); /* */
    queryParams += '&' + encodeURIComponent('base_date') + '=' + encodeURIComponent(date); /* */
    queryParams += '&' + encodeURIComponent('base_time') + '=' + encodeURIComponent(hour); /* */
    queryParams += '&' + encodeURIComponent('nx') + '=' + encodeURIComponent(nx); /* */
    queryParams += '&' + encodeURIComponent('ny') + '=' + encodeURIComponent(ny); /* */

    const dict = { "T1H": 0, "RN1": 0, "UUU": 0, "VVV": 0, "REH": 0, "PTY": 0, "VEC": 0, "WSD": 0 };

    request(
        {
            url: url + queryParams,
            method: 'GET',
        },
        function (err, response, body) {
            const parsing_body = JSON.parse(body);
            const item = parsing_body.response.body.items.item;

            for (var i = 0; i < item.length; i++) {
                switch (item[i].category) {
                    case 'T1H':
                        dict['T1H'] = item[i].obsrValue;
                        break;
                    case 'RN1':
                        dict['RN1'] = item[i].obsrValue;
                        break;
                    case 'UUU':
                        dict['UUU'] = item[i].obsrValue;
                        break;
                    case 'VVV':
                        dict['VVV'] = item[i].obsrValue;
                        break;
                    case 'REH':
                        dict['REH'] = item[i].obsrValue;
                        break;
                    case 'PTY':
                        dict['PTY'] = item[i].obsrValue;
                        break;
                    case 'VEC':
                        dict['VEC'] = item[i].obsrValue;
                        break;
                    case 'WSD':
                        dict['WSD'] = item[i].obsrValue;
                        break;
                }
            }
            console.log(dict);

            if (err) {
                console.log('error: ', err);
                result(null, err);
                return;
            } else {
                return res.send(body), dict;
            }
        }
    );
});

module.exports = router;
