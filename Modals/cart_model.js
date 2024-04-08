const { default: mongoose } = require("mongoose");

const cart_model = mongoose.model(
    "cart_model",
    new mongoose.Schema({
        user:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "register_model"
        },
        product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "product_model"
        },
        imageURL: {
            type: String,
            required: true,
          },
          title: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
    }, { timestamps: true })
);

module.exports = cart_model;
