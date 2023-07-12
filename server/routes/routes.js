const experss = require('express')
const routes = experss.Router()
const users = require('../controller/user')


routes.get('/' , (req , res) => {
    res.send('Hello from Routes')
})

routes.use('/users' , users )


module.exports = routes