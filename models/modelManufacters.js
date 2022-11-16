const { model, Schema } = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const manufacterSchema = new Schema({
  name: String,
  cif: String,
  address: String,
});

manufacterSchema.plugin(mongoosePaginate);

const Manufacter = model("Manufacter", manufacterSchema);

module.exports = Manufacter;
