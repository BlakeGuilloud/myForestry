const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const monkey = require('monkey-scale');
const fs = require('fs');
const configData = fs.readFileSync(__dirname + '/../config.json');
const config = JSON.parse(configData);


// ==== configuration ==== //
app.set('port', config.api.auth.port);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
// ======================= //

monkey.http(app, {});

const routes = require('./routes')(app, config);
const data = require('./service/data')(app,config);
