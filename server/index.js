const express = require('express');
const app = express()
const cors = require('cors');

require('dotenv').config();
const PORT = process.env.PORT || 4000
const dbConn = require('./config/db_config')


app.use(cors());
app.use(express.json());

app.get('/test',(req,res) => {
    res.send('Hello World')
})

const questionRoutes = require('./router/question')
const answerRoutes = require('./router/answer')
const loginRoutes = require('./router/student')
const subjectRoutes = require('./router/subject')
const admin = require('./router/admin')
const classroom = require('./router/classroom')

app.use('/question',questionRoutes)
app.use('/answer',answerRoutes)
app.use('/login',loginRoutes)
app.use('/subject',subjectRoutes)
app.use('/admin',admin)
app.use('/classroom',classroom )

// app.all('*',(req,res,next) => {
//     const err = new Error(`Requested URL ${req.path} not found`);
//     err.statusCode = 404;
//     next(err)
// })

// app.use((err,req,res,next) => {
//     const statusCode = err.statusCode || 500;
//     res.status(statusCode).json({
//         success : 0,
//         message : err.message,
//         stack : err.stack
//     })
// })

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})