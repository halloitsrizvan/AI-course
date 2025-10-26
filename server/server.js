require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const port = process.env.PORT  || 4000
const mongoDB = process.env.MONGO_URL

const usersRoutes = require('./routes/user')
const coursesRoutes = require('./routes/courseRoutes')
const courseUsersRoutes = require('./routes/courseUsers')
const couponRouter = require('./routes/couponRouter')

const app = express();
app.use(cors())
app.use(express.json());   


app.use((req,res,next)=>{
    console.log(req.method,req.path);
    next(); 
})

app.use('/users',usersRoutes) 
app.use('/courses',coursesRoutes)
app.use('/course-users',courseUsersRoutes)
app.use('/coupons',couponRouter)

mongoose.connect(mongoDB)
    .then(()=>{
        app.listen(port,(req,res)=>{
            console.log('app listen on port 4000 & MongoDB connected');
              
         }) 
    })
    .catch((err)=>{
        console.log(err); 
        
    })

