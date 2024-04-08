const { type } = require("express/lib/response");
const { default: mongoose } = require("mongoose");

const order_model = mongoose.model(
    "order_model",new mongoose.Schema({
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"register_user",
        },
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"product_model",
        },
        address:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"address_modal"
        },
        quantity:{
            type:Number,
            required:true
        },
        delivery_date:{
            type:Date,
            required:true
        },
        isDelivered : {
            type:Boolean,
            default:false
        },
        isCancelled : {
            type:Boolean,
            default:false
        }
    },{timestamps:true})
)
module.exports = order_model