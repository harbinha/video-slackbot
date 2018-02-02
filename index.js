"use strict";

const request = require('request');
const express = require('express');
const app = express();
const API_KEY = 'Am9Rw80CEAcdu3W38zqo7VzSutCD0vqr';

app.get('/', (req, res) => {
    let selection = 'count(*)';
    let bucket = 'videoView';
    let timeFrame = '1 HOUR AGO';
    let like = "currentUrl like '%25usatoday%25'";

    let query = `SELECT ${selection} FROM PageAction WHERE actionName='uwVideoReport' and type='${bucket}' and ${like} SINCE ${timeFrame}`;

    let options = {
        url: `https://insights-api.newrelic.com/v1/accounts/728646/query?nrql=${query}`,
        headers: {
            'X-Query-Key': API_KEY,
            'Accept': 'application/json'
        }
    }
    let callback = function(error, response, body) {
        if (!error) {
            var info = JSON.parse(body);
            res.send(`video view count ${info.results[0].count}`);
        } else {
            res.send('something went wrong');
        }
    }
    request(options, callback);
    
});

app.get('/web-api/:id', (req, res) => {
    let assetId = req.params.id;
    let webApi = `http://web-api.production.gannettdigital.com/v4/assets/${assetId}?consumer=testing&sitereferrerid=1`;
    let callback = function (error, response, body) {
        if (!error) {
            res.json(JSON.parse(body));
        }
    };
    request({url: webApi}, callback)
});

app.listen(3000, () => console.log('Running on port 3000'));

