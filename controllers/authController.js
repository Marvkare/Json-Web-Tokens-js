const {Router} = require('express')
const router = Router();
/*un token es un string que se va intercambiando entre el criente y el servidor para decirle al servidor que 
determinado usuari puede consultar cosas */
const jwt = require('jsonwebtoken')
const User =  require('../models/User')

router.post('/signup', async(req, res, next)=>{
    const {username, email, password} = req.body
    const user = new User({
        username: username,
        email: email,
        password:password
    });
    user.password = await user.encryptPassword(user.password)
    await user.save()
    /* El metodo jwt.sign() me permite crear un token el metodo
    este metodo almacena tres valores 
    1.-Nesesita el id de un usuario o un payload */
    jwt.sign({id: user.id},)
    res.json()
})
router.post('/signin', (req, res, next)=>{
    res.json('signin')
})
router.get('/me', (req, res, next)=>{
    res.json('me')
})

module.exports = router