const { default: mongoose } = require("mongoose");

const address_model = mongoose.model(
    "address_model",
    new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"register_user"
        },
        fullname:{
            type:String,
            required:true,
        },
        phone_number:{
            type:String,
            required:true,
        },
        state:{
            type:String
        },
        district:{
            type:String
        },
        pincode:{
            type:Number,
            required:true
        },
        city_village:{
            type:String,
            required:true
        },
        building_village:{
            type:String,
            required:true
        }
    })
)
module.exports=address_model