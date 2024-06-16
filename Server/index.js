const express=require('express')
const app=express()
const cookieparser=require('cookie-parser')
const cors=require('cors')
const {dbconnect} =require('./config/db')
require('dotenv').config()
const port = process.env.PORT || 3000

app.listen(port,()=>{
    console.log(`app listen on port no ${port} `)
    dbconnect()
})

app.use(express.json())
app.use(cookieparser())
// app.use(cors)
const userroute =require('./routes/userroute')
app.use('/api/v1',userroute)
