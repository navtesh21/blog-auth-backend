const {Router} = require("express")
const User = require("../models/user")
const router = Router()
const { createHmac } = require('crypto');



router.get("/signin",(req,res) => {
    res.json([{name:"hello"}])
})

router.get("/signup",(req,res) => {
    res.json([{name:"hello"}])
})

router.post("/signup",async(req,res) => {
    const {fullName , email , password} = req.body
    await User.create({
        fullName,
        email,
        password
    })   

    return res.redirect("/")
})

router.post("/signin",async (req,res) => {
    const {email , password} = req.body
    const user = await User.findOne({email})
    if(!user) return res.status(404).json({ error: "No Profile Found" });
    const hashedPassword = createHmac('sha256',user.salt)
    .update(password)
    .digest("hex") 

    if(!hashedPassword === user.password) return res.status(400).json({ error: "Wrong Password" });

    console.log(hashedPassword)
    res.json({...user._doc,password:undefined,salt:undefined})
    
   
}) 


module.exports = router