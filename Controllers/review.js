const product_model = require("../Modals/product_model");

const add_review = async (req, res) => {
  const user = req.user;
  const newReview = {
    name: user.name,
    review: req.body.review,
    rating: req.body.star,
  };

  try {
    const update = await product_model.findByIdAndUpdate(
      req.body.product_id,
      { $push: { reviews: newReview } },
      { new: true }
    );

    if (update) {
      return res.status(200).json(update);
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

const get_review = async (req, res) => {
  try {
    const { product_id } = req.query;
    console.log(product_id);
    const response = await product_model.findById(product_id).select("reviews");
    if (response) {
      return res.status(200).json(response);
    }
    if (!response) {
      return res.status(404).json("no reviews are available for this product");
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = { get_review, add_review };
