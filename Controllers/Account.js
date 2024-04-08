const { register_model } = require("../Modals/register_model")

const get_profile = async(req,res)=>{
const user = req.user

try {
    const response = await register_model.findById(user._id)
    if(response){
        return res.status(200).json(response)
    }
    if(!response){
        res.status(400).error("no user with this id exists")
    }
} catch (error) {
    res.status(400).error("no user exists")
}
}
module.exports = {get_profile}