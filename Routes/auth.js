const express = require("express")
const { register, sign_in } = require("../Controllers/Auth")
const { jwt_auth } = require("../Middlewares/JWT_auth")
const { get_profile } = require("../Controllers/Account")
const router = express()

router.use(express.json())


router.post("/register",register)

router.post("/sign_in",sign_in)

router.get("/profile",jwt_auth,get_profile)

router.put("/change_password",async(req,res)=>{
    
})

router.put("/update_profile",async(req,res)=>{
    
})



module.exports = router