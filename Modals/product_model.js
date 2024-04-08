const { type } = require("express/lib/response");
const { required } = require("joi");
const { default: mongoose } = require("mongoose");

const product_model = mongoose.model(
  "products",
  new mongoose.Schema({
    imageURL: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    available_items: {
      type: Number,
      required: true,
    },
    category:{
      type:String,
      required:true
    },
    color:{
      type:String,
      required:true
    },
    gender:{
      type:String,
      required:true
    },
    reviews: [
      
      {
        _id:false,
        name:{
          type:String,
          required:true
        },
        review: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
      },
    ],
  },{timestamps:true})




);
module.exports = product_model;
