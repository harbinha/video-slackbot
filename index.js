"use strict";

// const { IncomingWebhook, WebClient } = require('@slack/client');
const request = require('request');
const API_KEY = 'Am9Rw80CEAcdu3W38zqo7VzSutCD0vqr';


let selection = 'count(*)';
let bucket = 'videoView';
let timeFrame = '1 HOUR AGO';

let query = `SELECT ${selection} FROM PageAction WHERE actionName='uwVideoReport' and type='${bucket}' SINCE ${timeFrame}`;

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
        console.log(`video view count ${info.results[0].count}`);
    } else {
        console.error('something went wrong');
    }
}
request(options, callback);