const address_model = require("../Modals/address_model");
const order_model = require("../Modals/order_model");
const product_model = require("../Modals/product_model");
const { response } = require("../Routes/product");

const add_order = async (req, res) => {
    const user = req.user
    const product = await product_model.findById({_id:req.body.product});
    if (!product) {
        return res.status(400).json({error: "Product is Not Available"});
    }

    const address = await address_model.findById({_id:req.body.address});
    if (!address) {
        return res.status(400).json({error: "Address is Not Available"});
    }

    if (product.available_items < req.body.quantity) {
        console.log("Sorry! Product is out of stock");
        return res.status(404).json({error: "Sorry! Product is out of stock"});
    }

    try {
        const createdAt = new Date();
        const delivery_date = new Date(createdAt);
        delivery_date.setDate(delivery_date.getDate() + 6);

        const order = new order_model({...req.body, user: user._id, delivery_date:delivery_date});
        const saveorder = await order.save();

        const update_product = await product_model.findById(product);
        console.log(update_product);
        update_product.available_items -= +req.body.quantity;
        await update_product.save();

        return res.status(200).json(saveorder);
    } catch (error) {
        console.log("Error occurred while placing order:", error.message);
        res.status(400).send("idk whats wrong here");
    }
};




const get_orders = async (req, res) => {
    const user = req.user;

    try {
        const response = await order_model.find({ user: user._id, isDelivered:false,isCancelled:false })

        const ordersWithProductDetails = [];
        for (const order of response) {
            const product = await product_model.findById(order.product);
          
            if (product) {
                const orderWithProduct = {
                    _id: order._id,
                    product: order.product,
                    imageURL: product.imageURL,
                    title: product.title,
                    price: product.price,
                    category:product.category,
                    quantity: order.quantity,
                    isDelivered: order.isDelivered,
                    isCancelled: order.isCancelled,
                    delievery_date:order.delivery_date
                };
                ordersWithProductDetails.push(orderWithProduct);
            }
        }
        
        if (!ordersWithProductDetails || ordersWithProductDetails.length === 0) {
            return res.status(200).json("Sorry, you haven't ordered anything yet");
        }
        return res.status(200).json(ordersWithProductDetails);
    } catch (error) {
        return res.status(500).json("Something went wrong");
    }
}




const delivered_orders = async (req, res) => {
    const user = req.user;

    try {
        const response = await order_model.find({ user: user._id,isDelivered:true,isCancelled:false })

        const ordersWithProductDetails = [];
        for (const order of response) {
            const product = await product_model.findById(order.product);
          
            if (product) {
                const orderWithProduct = {
                    _id: order._id,
                    product: order.product,
                    imageURL: product.imageURL,
                    title: product.title,
                    price: product.price,
                    category:product.category,
                    quantity: order.quantity,
                    delievery_date:order.delivery_date
                };
                ordersWithProductDetails.push(orderWithProduct);
            }
        }
        
        if (!ordersWithProductDetails || ordersWithProductDetails.length === 0) {
            return res.status(200).json("Sorry, nothing delivered yet");
        }
        return res.status(200).json(ordersWithProductDetails);
    } catch (error) {
        return res.status(500).json("Something went wrong");
    }
}



const cancelled_order = async(req,res)=>{
    const user = req.user;

    try {
        const response = await order_model.find({ user: user._id,isCancelled:true })

        const ordersWithProductDetails = [];
        for (const order of response) {
            const product = await product_model.findById(order.product);
          
            if (product) {
                const orderWithProduct = {
                    _id: order._id,
                    product: order.product,
                    imageURL: product.imageURL,
                    title: product.title,
                    price: product.price,
                    category:product.category,
                    quantity: order.quantity,
                };
                ordersWithProductDetails.push(orderWithProduct);
            }
        }
        
        if (!ordersWithProductDetails || ordersWithProductDetails.length === 0) {
            return res.status(200).json("Sorry, nothing delivered yet");
        }
        return res.status(200).json(ordersWithProductDetails);
    } catch (error) {
        return res.status(500).json("Something went wrong");
    }
}



const cancel_order = async (req, res) => {
    const user = req.user;
    try {
        console.log(user._id)
        console.log(req.body.product_id)
        const response = await order_model.findOneAndUpdate(
            { user: user._id, product: req.body.product_id },
            { isCancelled: true }
        );
        if (response) {
            res.status(200).json({ message: "Order cancelled successfully", order: response });
        } else {
            res.status(404).json({ message: "Order not found" });
        }
    } catch (error) {
        console.error("Error cancelling order:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = { add_order,get_orders,cancelled_order,delivered_orders,cancel_order };
