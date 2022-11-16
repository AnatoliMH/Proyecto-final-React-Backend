const Products = require("../models/modelProducts");
const PAG_LIMIT = 10;

const getManufacter = async (id) => {
  const product = await Products.findById(id).populate("manufacter._id").exec();
  return {
    ...product._doc,
    manufacter: {
      ...product.manufacter._id._doc,
    },
  };
};

const escapeRegex = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const getAllProducts = async (page, orderField, order) => {
  const docs = await Products.paginate(
    { },
    { page, sort: { [`${orderField}`]: order }, limit: PAG_LIMIT }
  );
  return docs;
};

const getProductsNameRelevancePrice = async (
  name,
  relevance,
  price,
  page,
  orderField,
  order
) => {
  const regex = new RegExp(escapeRegex(name), "gi");
  return await Products.paginate(
    {
      $and: [
        { name: regex },
        { relevance: relevance.toUpperCase() },
        { price: { $lte: price } },
      ],
    },
    { page, sort: { [`${orderField}`]: order }, limit: PAG_LIMIT }
  );
};

const getProductsNameRelevance = async (
  name,
  relevance,
  page,
  orderField,
  order
) => {
  const regex = new RegExp(escapeRegex(name), "gi");
  return await Products.paginate(
    {
      $and: [{ name: regex }, { relevance: relevance.toUpperCase() }],
    },
    { page, sort: { [`${orderField}`]: order }, limit: PAG_LIMIT }
  );
};

const getProductsNamePrice = async (name, price, page, orderField, order) => {
  const regex = new RegExp(escapeRegex(name), "gi");
  return await Products.paginate(
    {
      $and: [{ name: regex }, { price: { $lte: price } }],
    },
    { page, sort: { [`${orderField}`]: order }, limit: PAG_LIMIT }
  );
};

const getProductsRelevancePrice = async (
  relevance,
  price,
  page,
  orderField,
  order
) => {
  return await Products.paginate(
    {
      $and: [
        { relevance: relevance.toUpperCase() },
        { price: { $lte: price } },
      ],
    },
    { page, sort: { [`${orderField}`]: order }, limit: PAG_LIMIT }
  );
};

const getProductsRelevance = async (relevance, page, orderField, order) => {
  return await Products.paginate(
    {
      relevance: relevance.toUpperCase(),
    },
    { page, sort: { [`${orderField}`]: order }, limit: PAG_LIMIT }
  );
};

const getProductsName = async (name, page, orderField, order) => {
  const regex = new RegExp(escapeRegex(name), "gi");
  return await Products.paginate(
    { name: regex },
    { page, sort: { [`${orderField}`]: order }, limit: PAG_LIMIT }
  );
};

const getProductsPrice = async (price, page, orderField, order) => {
  return await Products.paginate(
    { price: { $lte: price } },
    { page, sort: { [`${orderField}`]: order }, limit: PAG_LIMIT }
  );
};

module.exports = {
  getAllProducts,
  getProductsNameRelevancePrice,
  getProductsNameRelevance,
  getProductsNamePrice,
  getProductsRelevancePrice,
  getProductsRelevance,
  getProductsName,
  getProductsPrice,
  getManufacter,
};
