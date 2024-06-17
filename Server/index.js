const express=require('express')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')
const {dbconnect} =require('./config/db')
require('dotenv').config()
const port = process.env.PORT || 3000



app.use(express.json())
app.use(cookieParser())
app.use(
    cors({
      credentials: true,
      origin:"http://localhost:5173"
    })
  );
const userroute =require('./routes/userroute')
app.use('/api/v1',userroute)



app.listen(port,()=>{
    console.log(`app listen on port no ${port} `)
    dbconnect()
})