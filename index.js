const express = require("express")
const app = express()
const userRoute = require("./routes/user")
const blogRoute = require("./routes/blog")
const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/nsut-ai-blogs").then(() => {console.log("db connected")})

const PORT = 8000

app.use(express.json())

app.listen(PORT,() => {console.log(`server connected: ${PORT}`)})


app.get("/",(req,res) => {
    res.json([{name:"hello"}])
})

app.use("/user",userRoute)
app.use("/blog",blogRoute)