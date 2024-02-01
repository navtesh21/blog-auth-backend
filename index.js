const express = require("express")
const app = express()
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const { checkForCookieAuthentication } = require("./middleware/user")



mongoose.connect("mongodb://127.0.0.1:27017/nsut-ai-blogs").then(() => {console.log("db connected")})

const PORT = 8000

app.use(express.json())
app.use(cookieParser())
app.use(checkForCookieAuthentication('token'))

app.listen(PORT,() => {console.log(`server connected: ${PORT}`)})


app.get("/",(req,res) => {
    res.json(req.user)
    console.log(req.user)
})

app.use("/user",userRoute)
app.use("/blog",blogRoute)