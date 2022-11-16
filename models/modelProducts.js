const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new Schema({
  name: String,
  relevance: Number,
  price: Number,
  manufacter: {
    _id: { type: Schema.Types.ObjectId, ref: "Manufacter" },
    name: String,
  },
});

productSchema.plugin(mongoosePaginate);

const Product = model("Product", productSchema);

module.exports = Product;
