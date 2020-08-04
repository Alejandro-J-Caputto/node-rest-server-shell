const express = require('express');

const app = express();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario.model');



app.post('/login', (req, res) => {
    let body = req.body;



    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        console.log(body.email)
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            })
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario ) o contraseña incorrectos'
                }
            })
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            })
        }
        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN })

        res.json({
            ok: true,
            usuario: usuarioDB,
            token: token
        })

    })
})

module.exports = app