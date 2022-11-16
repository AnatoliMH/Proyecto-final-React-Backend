const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const productSchema = new Schema({
  name: String,
  relevance: Number,
  price: Number,
  developer: String,
  manufacter: {
    _id: { type: Schema.Types.ObjectId, ref: "Manufacter" },
  },
});

productSchema.plugin(mongoosePaginate);

const Product = model("Product", productSchema);

module.exports = Product;
