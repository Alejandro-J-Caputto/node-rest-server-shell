require('./config/config')


const express = require('express');
const app = express();

///BODYPARSER//////////////////
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
///////////////////////////////


app.get('/usuario', (req, res) => {
    res.json('get usuario');

})
app.post('/usuario', (req, res) => {
    let body = req.body;

    if (body.nombre === undefined) {
        res.status(400).json({
            ok: false,
            message: 'El nombre es necesario vino undefined'

        })
    }
    res.json({
        persona: body
    });

})
app.put('/usuario/:id', (req, res) => {
    let id = req.params.id;
    console.log(id)
    res.json({
        id
    });

})
app.delete('/usuario', (req, res) => {
    res.json('delete usuario');

})

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto' + process.env.PORT)
})