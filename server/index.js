const express = require('express')
const {connectDB} =  require('./DbConn/config')
const mail = require('./routes/mail.router')
require('dotenv').config()
const cors = require('cors')
const cookieParser = require('cookie-parser')

const authRouter = require('./routes/auth.routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const custrouter=require("./routes/cust.routes")
const stockrouter=require("./routes/stock.router")
const addRouter = require('./routes/add.routes')
const historyrouter=require("./routes/history.routes")
app.use("/customer",custrouter)
app.use("/stock",stockrouter)
app.use("/addlist",addRouter)
app.use("/history",historyrouter)
app.use('/api/mail',mail)

app.use(cookieParser())

app.use('/api', addRouter)
app.use('/auth', authRouter)



const start=async()=>{
    try {
        await connectDB(process.env.MONGO)
        app.listen(4000, () => {
    console.log('Server is running at port 4000')
})
    } catch (error) {
        console.log(error)
    }
}

start()