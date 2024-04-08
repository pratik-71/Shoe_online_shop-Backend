const cart_model = require("../Modals/cart_model");
const { register_model } = require("../Modals/register_model");
const product_model = require("../Modals/product_model");

const add_cart = async (req, res) => {
  const user = req.user;

  const checkuser = await register_model.findOne({ _id: user._id });
  if (!checkuser) {
    return res.status(400).json("User does not exist");
  }

  const product = await product_model.findById(req.body.product);
  if (!product) {
    return res.status(400).json({ error: "Product is Not Available" });
  }

  try {
    const existingCartItem = await cart_model.findOne({
      user: user._id,
      product: req.body.product
    });

    if (existingCartItem) {
      return res.status(200).json({ error: "Item already exists in the cart" });
    }

    const cartItem = new cart_model({ user: user._id, ...req.body });
    const response = await cartItem.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};



const get_cart = async(req,res)=>{
const user = req.user;
try {
    const cartItems = await cart_model.find({ user: user._id });

    res.status(200).json(cartItems)
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}


const remove_cart = async (req, res) => {
  const user = req.user;
  console.log(req.body.product)
  console.log(user._id)
  try {
    const deleteItem = await cart_model.findOneAndDelete({
      product: req.body.product, 
      user: user._id 
    });

    if (!deleteItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    return res.status(200).json({ message: "Cart item deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {add_cart,get_cart,remove_cart}
