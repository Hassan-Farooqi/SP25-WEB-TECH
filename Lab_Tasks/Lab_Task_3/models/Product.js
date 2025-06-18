const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: String,
  image: String,
  price: String,
});
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);
module.exports = Product;
