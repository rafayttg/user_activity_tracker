require("dotenv").config();
const mongoose = require('mongoose');
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('DB connected'))
    .catch((err) => console.log(err))

module.exports = mongoose;