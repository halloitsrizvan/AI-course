const jwt = require('jsonwebtoken')
const { secretKey } = require('../config/jwtConfig')

const authToken=(req,res,next)=>{
    const authHeader = req.header("Authorization")
    if(!authHeader){
        return res.status(401).json({msg:"Unathorized: Missing token"})
    }
    const [bearer,token] = authHeader.split(" ")
    if(bearer !=="Bearer" || !token){
        return res.status(401).json({msg:"Unathorized: Invalid token"})
    }
    jwt.verify(token, secretKey, (err, decoded)=>{
        if(err){
            return res.status(403).json({msg:"Forbidden: Invalid token"})
        }
        req.user = decoded;
        next()
    })
}

module.exports={authToken}