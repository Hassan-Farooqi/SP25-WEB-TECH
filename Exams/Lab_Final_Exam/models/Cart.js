const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  image: String,
  price: String,
});
const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);
module.exports = Cart;
