const { input_validation, register_model } = require("../Modals/register_model")
const { ADMIN, AUTH_TOKEN } = require("../Server/contants")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async(req,res)=>{
    console.log("triggerd .................. ////////////////// ")
    // check input validation
    const {error} = input_validation(req.body)
    if(error){
        return res.status(401).json({messege:"Bad request : "+error})
    }
 
    // check email already exists
    let email_exist = await register_model.findOne({email:req.body.email})
    if(email_exist){
        return res.status(400).json({messege:"email already exists "})
    }

     // check phone alredy exist
    let phone_exist = await register_model.findOne({phone_number:req.body.phone_numnber})
    if(phone_exist){
        return res.status(400).json({messege:"phone number already exists "})
    }
    
    // add user after hashing password
    try {
        const salt = await bcrypt.genSalt(10)
        const user = new register_model({
            ...req.body,
            password : await bcrypt.hash(req.body.password,salt)
        })
         const response = user.save()
         res.status(200).json({
            name: `${user.firstname} ${user.lastname}`,
            email:user.email,
            isAuthenticated:true,
         }
        );

    } catch (error) {
        res.send(400).json({messege:error.messege})
    }

}




const sign_in = async(req,res)=>{
 
    let user = await register_model.findOne({ email: req.body.email })
    if(!user){
        return res.status(400).json({messege:"invalid credentials "})
    }
  
    let ispassword_valid = await bcrypt.compare(req.body.password, user.password)
    if(!ispassword_valid){
        return res.status(400).json({messege:"invalid credentials "})
    }

    try {
        const token = jwt.sign(
            {
                _id:user._id,
                name : `${user.firstname} ${user.lastname}`,
                isAdmin : user.role===ADMIN

            },
            "1@3456Qw-"
        )

        res.header(AUTH_TOKEN,token).send({
            name : `${user.firstname} ${user.lastname}`,
            email: user.email,
            isAuthenticated : true,
            phone_number : user.phone_number
        })
    } catch (error) {
      console.log(error)  
    }
}





module.exports={register,sign_in}