const { default: mongoose } = require("mongoose");
const { ADMIN, USER } = require("../Server/contants");
const Joi = require("joi")
const register_model = mongoose.model(
    "register_user",
    new mongoose.Schema({
        firstname:{
            type:String,
            required : true,
        },
        lastname:{
            type:String,
            required : true,
        },
        phone_number:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            unique:true,
            required : true,
        },
        password:{
            type:String,
            required : true,
        },
        role:{
            type:String,
            enum:[ADMIN,USER],
            default:USER
        }
    },{timestamps:true})
)


const input_validation = (user) => {
   const userSchema = Joi.object({
    firstname:Joi.string().min(3).max(15).required(),
    lastname:Joi.string().min(3).max(15).required(),
    phone_number:Joi.string().min(10).max(10).required(),
    email:Joi.string().email().min(5).max(210).required(),
    password:Joi.string().min(5).max(50).required(),
   })

   const result = userSchema.validate(user)
   return result
}



module.exports = {register_model,input_validation}