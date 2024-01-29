const { createHmac,randomBytes } = require('crypto');

const {Schema,model} = require("mongoose")

const userSchema = new Schema({
   fullName:{
    type:String,
    required:true
   },
   email:{
    type:String,
    unique:true,
    required:true
   },
   salt:{
    type:String,
   },
   password:{
    type:String,
    required:true
   },
   profileImgUrl:{
    type : String,
    default:"/images/default-user.jpg"
   },
   role:{
    type :String,
    enum:["USER","ADMIN"],
    default:"USER"
   }

},{timestamps:true}
)

userSchema.pre("save",function(next) {
    const user = this
    if(!user.isModified("password")) return
    const salt = randomBytes(16).toString()
    const hashedPassword = createHmac('sha256',salt)
    .update(user.password)
    .digest("hex")

    this.password = hashedPassword
    this.salt = salt

    next()
})



const User = model('user',userSchema)

module.exports = User