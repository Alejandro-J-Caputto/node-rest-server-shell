require('./config/config')

const express = require('express');
const mongoose = require('mongoose')

const app = express();
///BODYPARSER//////////////////
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
///////////////////////////////

//CONFIGURACIOM GLOBAL DE RUTAS
app.use(require('./routes/index'))



//
/* HEMOS MOVIDO LAS RUTAS A USUARIO.CRUD.JS */

//

mongoose.connect(process.env.URLDB, {
    // mongoose.connect('mongodb+srv://AleFullStack:1867DanLula@cluster0-p2jik.mongodb.net/savage_cafe', {

    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, res) => {
    if (err) throw err;
    console.log('base de datos online. Savage Cafe is here ONLINE')
});





app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto' + process.env.PORT)
})
