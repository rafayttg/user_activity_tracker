const experss = require('express')
const users = experss.Router()
const { User} = require('../dbconfig/UserSchema')
const jwt = require('jsonwebtoken')
const activity = require('./activity')

users.get('/', (req, res) => {
    res.send('Hi World')
})


users.post('/signup', async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email && !password) {
            res.status(401).send('Enter Your Credentials')
            return;
        }
        const userExist = await User.findOne({ email })
        if (userExist) {
            res.send('User already registered');
            return;
        }

        const newUser = new User({
            email: email,
            password: password
        })

        const saveUser = await newUser.save()
        res.status(200).send('user registered successfully')

    } catch (err) {
        console.log(err)
        res.status(400).send('enter email or password')
    }
})

users.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password })
        if (!user) {
            res.status(404).json({ message: 'Credentials are invalid' });
            return;
        }
        if (user) {
            const token = generateAccessToken({ email: email })
            res.status(200).send(token)
            return;
        }
    } catch (error) {

        res.status(401).json({ message: 'Invalid Email & Password' })
    }

})

users.use( '/activity', activity)





function generateAccessToken(email) {
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn: '15m' })
}


module.exports = users