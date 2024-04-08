const { AUTH_TOKEN } = require("../Server/contants")
const jwt =  require("jsonwebtoken")

const jwt_auth = async(req,res,next)=>{
    const token = req.header(AUTH_TOKEN)
    if(!token){
       res.status(400).json({error:"Login first to Access this functionality"})
    }
    
    try {
        const decode = jwt.verify(token,'1@3456Qw-')
        req.user = decode
        console.log("it worked")
        next()
    } catch (error) {
       res.status(400).json(error) 
    }
    
}
module.exports ={jwt_auth}