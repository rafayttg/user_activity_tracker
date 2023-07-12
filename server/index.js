const express = require('express')
const app = express()
const cors = require('cors')
const dbcon = require('./dbconfig/db')
const bodyParser = require("body-parser");
const routes = require('./routes/routes')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())



app.use( '/' , routes )



app.listen( 8080 , () => {
    console.log('Server is conneced')
}) 