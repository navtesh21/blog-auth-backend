const {Router} = require("express")
const User = require("../models/user")
const router = Router()
const { createHmac } = require('crypto');
const {createTokenForUser} = require("../services/auth")


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
    const token = createTokenForUser(user)

    console.log(token)
   return  res.cookie('token',token).json({...user._doc,password:undefined,salt:undefined})
    
   
}) 


module.exports = router