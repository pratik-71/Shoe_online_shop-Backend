
const product_model = require("../Modals/product_model");

const add_product = async (req, res) => {
  const product = new product_model(req.body);
  try {
    const saveproduct = await product.save();
    return res.status(200).json(saveproduct);
  } catch (error) {
    console.log(error);
  }
};

const get_product = async (req, res) => {
  let product = await product_model.findById(req.params.id);

  if (!product) {
    res.status(404).send(`Product with id ${req.params.id} not found`);
    return;
  }

  res.send(product);
};

const get_categories = async (req, res) => {
  try {
    const categories = await product_model
      .find()
      .select("category")
      .distinct("category");
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const update_product = async (req, res) => {
  let product = await product_model.findById(req.body._id);
  if (!product) {
    res.status(400).json("This product does not exits");
  }

  try {
    const update = await product_model.findByIdAndUpdate(req.user._id, {
      imageURL: req.body.imageURL,
      title: req.body.title,
      category: req.body.category,
      color: req.body.color,
      gender: req.body.gender,
      price: req.body.price,
      available_items: req.body.available_items,
    });
    res.status(200).json(update);
  } catch (error) {
    res.status(400).json({ error: "Something goes wrong" });
  }
};

const all_product = async (req, res) => {
  try {
    const { param } = req.params;
    let products;

    if (param === "All" || !param) { 
      products = await product_model.find();
    } else {
      products = await product_model.find({ category: param });
    }

    const requiredProducts = products.map(({ _id, imageURL, title, price, category, gender, color }) => ({
      _id,
      imageURL,
      title,
      price,
      category,
      gender,
      color,
    }));
    res.status(200).json(requiredProducts);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve products" });
  }
};


const delete_product = async (req, res) => {
  try {
  
    const product = await product_model.findByIdAndDelete(req.body.product);
    if (product) {
      return res.status(200).json("Product deleted succesfully");
    }
    if (!product) {
      return res.status(400).json("Unable to find product");
    }
  } catch (error) {
    return res.status(400).json("Something goes wrong");
  }
};




const category_relative_product = async(req,res)=>{
 
  try {
    const response = await product_model.find({category:req.body.category}).select('_id','imageURL','title','price')
    if(response){
      return res.status(200).json(response)
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}





module.exports = {
  add_product,
  all_product,
  get_categories,
  get_product,
  update_product,
  delete_product,
  category_relative_product
};
