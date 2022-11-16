const Manufacters = require("../models/modelManufacters");

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const getAllManufacters = async (page) => {
  return await Manufacters.paginate(
    {},
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

const getManufactersByName = async (name, page) => {
  const regex = new RegExp(escapeRegex(name), "gi");
  return await Manufacters.paginate(
    { name: regex },
    { page, sort: { ["price"]: 1 }, limit: 10 }
  );
};

module.exports = { getAllManufacters, getManufactersByName };
