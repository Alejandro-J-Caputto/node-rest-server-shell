const jwt = require('jsonwebtoken')

// ==================
// VERIFICAR TOKEN
// ======

const verificaToken = (req, res, next) => {


    let token = req.get('token'); //Authorizaticion 


    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: err
                }
            })
        }
        // console.log(req.usuario)
        req.usuario = decoded.usuario;
        // console.log(decoded.usuario)

        next();

    })


    // res.json({
    //     token: token
    // })

    // next()


};


// Verifica Admin Role

const verificaRol = (req, res, next) => {

    if (req.usuario.role === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.json({
            ok: false,
            err: {
                message: 'No tiene privilegios de administrador'
            }
        })
    }


}








module.exports = {
    verificaToken,
    verificaRol
}