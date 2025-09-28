require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT
const mongoDB = process.env.MONGO_URL

app.use(express.json())
app.use((req,res,next)=>{
    console.log(req.method,req.path);
    next(); 
})

mongoose.connect(mongoDB)
    .then(()=>{
        app.listen(4000,(req,res)=>{
            console.log('app listen on port 4000 & MongoDB connected');
              
         }) 
    })
    .catch((err)=>{
        console.log(err); 
        
    })

