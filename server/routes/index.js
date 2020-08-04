

const express = require('express');
const app = express();


app.use(require('./usuario.crud'))
app.use(require('./login'))

module.exports = app;