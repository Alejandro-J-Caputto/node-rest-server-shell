
const expres = require('express');
const Usuario = require('../models/usuario.model');
const { verificaToken, verificaRol } = require('../middlewares/autenticacion')
const bcrypt = require('bcrypt');
const _ = require('underscore');

const app = expres();



app.get('/usuario', [verificaToken, verificaRol], (req, res) => {

    // console.log(req.usuario)

    let desde = req.query.desde || 0;
    desde = Number(desde)

    let limite = req.query.limite || 5;

    limite = Number(limite)

    Usuario.find({ estado: true }, 'nombre email role estado google img').skip(desde).limit(limite).exec((err, usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        Usuario.countDocuments({ estado: true }, (err, conteo) => {

            res.json({
                ok: true,
                usuarios,
                cuantos: conteo
            })
        })
    });

});

app.post('/usuario', (req, res) => {
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    })

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })



})
app.put('/usuario/:id', [verificaToken, verificaRol], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body,
        [
            'nombre',
            'email',
            'password',
            'img',
            'role',
            'estado'
        ]);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }


        res.json({
            id,
            usuario: usuarioDB
        });
    })


})
app.delete('/usuario/:id', [verificaToken, verificaRol], (req, res) => {

    let cambiaEstado = {
        estado: false
    }

    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true }, (err, usuarioBorrado) => {
        if (err) {
            res.status(400).json({
                ok: false,
                err
            })
        }
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            usuaario: usuarioBorrado
        })
    })

})


module.exports = app;