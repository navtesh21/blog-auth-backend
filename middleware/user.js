const { validateToken } = require("../services/auth")

function checkForCookieAuthentication(cookieName){
    return(req,res,next) => {
       const token = req.cookies[cookieName]
       if(!token) {
        next()
       }
       try{
        const payload = validateToken(token)
        req.user = payload
       }
       catch(err){}
       next()
       

    }
}

module.exports = {checkForCookieAuthentication}