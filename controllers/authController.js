const { Router } = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const router = Router();
/*un token es un string que se va intercambiando entre el criente y el servidor para decirle al servidor que 
determinado usuari puede consultar cosas */
const jwt = require('jsonwebtoken')
const config = require('../config')
const User = require('../models/User')
const verifyToken = require('./verifyToken')

router.post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body
    const user = new User({
        username: username,
        email: email,
        password: password
    });
    user.password = await user.encryptPassword(user.password)
    await user.save()
    /* El metodo jwt.sign() me permite crear un token el metodo
    este metodo almacena tres valores 
    1.-Nesesita el id de un usuario o un payload 
    2.-Nesesita un secret que es una forma de poder ayudarle al algoritmo 
    de poder sifrarlo y hacerlo unico en mi sistema */
    const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 60 * 60 * 24
    })
    res.json({ auth: true, token })
})
router.post('/signin', async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email, password)
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(404).send('The email doesn exist')
    }
    const validPassword = await user.validatePassword(password)
    if (!validPassword) {
        return res.status(401).json({ auth: false, token: null })
    }
    const token = jwt.sign({ id: user.is }, config.secret, {
        expiresIn: 60 * 60 * 24
    })

    res.json({ auth: true, token })
})

router.get('/me', verifyToken, async (req, res, next) => {

    const user = await User.findById(req.userId, { password: 0 })
    if (!user) {
        return res.status(404).send('No user found')
    }
    res.json(user)
})

module.exports = router