require('dotenv').config();
const express = require('express')
const app = express()
const db = require('../server/config/dbConnect')
const cors = require("cors")
const adminRouter = require('./router/adminRouter')
const userRouter = require('./router/userRouter')



app.use(express.json())
app.use(cors())
app.use((req,res,next)=>{
console.log(req.path,req.method);
next()
})

db.connectToDb()

app.listen(8000,()=>{
    console.log("Listening to port 8000");
})

app.use('/api/admin', adminRouter)
app.use('/api/user', userRouter)
