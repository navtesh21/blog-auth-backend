const Jwt = require("jsonwebtoken")
const secret = "nsut.aiparthchaitanyaharshitbhaiya"

function createTokenForUser(user) {
    const payload = {
        id:user._id,
        email:user.email,
        profileImgUrl:user.profileImgUrl,
        role:user.role
    }
   const token = Jwt.sign(payload,secret)
   return token
}

function validateToken(token){
    const payload = Jwt.verify(token,secret)
    return payload

}

module.exports = {
    createTokenForUser,
    validateToken

}