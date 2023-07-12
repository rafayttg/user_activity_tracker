const experss = require('express')
const activity = experss.Router()
const { Activity, User } = require('../dbconfig/UserSchema')
const jwt = require('jsonwebtoken')

activity.use((req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send('unauthorized');
        res.user = user
        next()
    })
})



activity.get('/', (req, res) => {
    const { email } = req.query;

    User.findOne({ email })
        .then((user) => {
            if (user) {
                res.json(user);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        })
        .catch((error) => {
            console.error('Failed to fetch user:', error);
            res.status(500).json({ error: 'Failed to fetch user' });
        });
})


activity.get('/activities', async (req, res) => {
    const userId = req.query.userId;
    if (userId) {
        try {
            const userActivities = await Activity.find({ user: userId });
            res.send(userActivities);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error retrieving user activities');
        }
    }

})



activity.post('/', async (req, res) => {
    const { duration, date, activityType, user, email } = req.body
    try {
        const userEmail = await User.findOne({ email: email })
        if (!userEmail) {
            res.status(404).send('User not found');
            return;
        }


        const newActivity = new Activity({
            activityType: activityType,
            duration: duration,
            date: date,
            user: user,
        })


        const saveActivity = await newActivity.save();
        res.status(200).send('Activity saved successfully');
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Error saving activity' });
    }
})

activity.delete('/:id', async (req, res) => {
    const { id } = req.params
    const { userId } = req.query
    let activity = await Activity.findByIdAndDelete(id)

    try {
        if (id) {
            const updateActivity = await Activity.find({ user: userId })
            res.send(updateActivity)
        }
    } catch (error) {
        res.status(404).send('error deleting activity')
    }

})



module.exports = activity   