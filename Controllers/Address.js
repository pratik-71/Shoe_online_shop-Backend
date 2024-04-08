const address_model = require("../Modals/address_model")
const { findByIdAndDelete } = require("../Modals/product_model")

const add_address = async(req,res)=>{
  const user = req.user
  const address =new address_model({...req.body,user:user._id})
  try {
    const saveaddress = await address.save()
    console.log(saveaddress)
    return res.status(200).json(saveaddress)
  } catch (error) {
    res.status(400).json(error)
  }
}

const get_address = async(req,res)=>{
   const user = req.user;
   try {
    const address = await address_model.find({user:user._id})
    return res.status(200).json(address)
   } catch (error) {
    return res.status(400).json(error)
   } 
}


const delete_address = async (req, res) => {
  try {
    console.log(req.body.id)
    const response = await address_model.findByIdAndDelete(req.body.id);
    if (response) {
      return res.status(200).json({ message: "Address deleted successfully" });
    } else {
      return res.status(400).json("Address not found");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error");
  }
}

module.exports = {add_address,get_address,delete_address}