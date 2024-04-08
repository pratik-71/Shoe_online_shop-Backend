const Admin_auth = (req,res,next)=>{
  const  token  = req.header('x-auth-token')
  if(!token){
    return res.status(400).json("Token is not provided")
  }

  try {
    const decodetoken = jwt.verify(token,'1@3456Qw-')
    if(decodetoken.isAdmin){
        req.user = decodetoken
        next()
    }
    else{
        return res.status(400).json("You are not admin toaccess this functionality")
    }
  } catch (error) {
    res.status(400).json('Bad request ')
  }
}
module.exports = Admin_auth