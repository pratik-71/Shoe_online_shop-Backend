const express = require("express")
const { add_product, all_product, get_categories, get_product, update_product, delete_product, category_relative_product } = require("../Controllers/Product")
const { add_address, get_address, delete_address } = require("../Controllers/Address")
const { jwt_auth } = require("../Middlewares/JWT_auth")
const { add_order, get_orders, cancelled_order, return_order, delivered_orders, cancel_order } = require("../Controllers/Order")
const { add_cart, get_cart, remove_cart } = require("../Controllers/cart")
const { get_review, add_review } = require("../Controllers/review")
const router = express()

router.use(express.json())

// --------------- For products -------------
router.get("/all_product",all_product)
router.get("/get_categories",get_categories)
router.post("/add_product",add_product)
router.get("/get_product/:id",get_product)
router.put("/update_product",update_product)
router.delete("/delete_product",delete_product)
router.post("/add_review",jwt_auth,add_review)
router.get("/get_review",get_review)
router.get("/related_category",jwt_auth,category_relative_product)




// -------------- For Cart -------------
router.get("/get_cart",jwt_auth,get_cart)
router.post("/add_cart",jwt_auth,add_cart)
router.delete("/remove_cart",jwt_auth,remove_cart)



// ---------------- For Address --------------
router.post("/add_address",jwt_auth,add_address)
router.get("/get_address",jwt_auth,get_address)
router.delete("/delete_address",delete_address)



//---------------- For Cart ------------------
router.post("/add_order",jwt_auth,add_order)
router.get("/all_orders",jwt_auth,get_orders)
router.post("/cancel_order",jwt_auth,cancel_order)
router.get("/delivered_order",jwt_auth,delivered_orders)
router.get("/cancelled_orders",jwt_auth,cancelled_order)

module.exports=router