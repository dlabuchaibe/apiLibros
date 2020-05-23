const express = require('express');
const nocache = require('nocache');
const fs = require('fs');
const morgan = require('morgan');

const config = require('./config');
const api = require('./api');

const app = express();

const accessLogStream = fs.createWriteStream('./files/access.log', {flags : 'a'});

app.use(nocache());
app.use(express.json());
app.use(morgan('combined', {stream : accessLogStream}))
app.use('/api', api);

app.listen(config.port, () => {
    console.log('Servidor iniciado')
});