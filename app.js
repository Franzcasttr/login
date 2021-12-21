const express = require('express')
const bodyparser = require('body-parser')
require('dotenv').config()
const app = express()
const connectDB = require('./db/connect')
const task = require('./routes/routes')
const notfound = require('./middleware/notfound')
const cookieparser = require('cookie-parser')
const {authuser, checkuser} = require('./middleware/authuser')

app.use(express.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cookieparser())
app.set('view engine', 'ejs')
//routes
app.get('*', checkuser)
app.use(task)
app.get('/', (req, res) =>{res.render('home')})
app.get('/next', authuser, (req, res) =>{res.render('next')})
app.get('/error', (req, res) =>{res.render('error')})
app.use(notfound)


const port = process.env.PORT || 3000
const start = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening to port ${port}`))
    } catch (error) {
        console.log(error)   
    }
}
start()