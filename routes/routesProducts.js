const router = require("express").Router();
const servicesProducts = require("../services/servicesProducts");

router.get("/manufacter", async (req, res) => {
  const { id } = req.query;
  let docs = [];
  docs = await servicesProducts.getManufacter(id);

  if (docs !== 0) res.json({ products: docs }).status(200).end();
  else res.json({ result: "No existen resultados" }).status(404).end();
});

router.get("/search", async (req, res) => {
  const { name, relevance, price, manufacter, page, orderField, order } =
    req.query;
  let docs = [];

  if (name && relevance && price) {
    docs = await servicesProducts.getProductsNameRelevancePrice(
      name,
      relevance,
      price,
      page,
      orderField,
      order
    );
  } else if (name && relevance) {
    docs = await servicesProducts.getProductsNameRelevance(
      name,
      relevance,
      page,
      orderField,
      order
    );
  } else if (name && price) {
    docs = await servicesProducts.getProductsNamePrice(
      name,
      price,
      page,
      orderField,
      order
    );
  } else if (relevance && price) {
    docs = await servicesProducts.getProductsRelevancePrice(
      relevance,
      price,
      page,
      orderField,
      order
    );
  } else if (relevance) {
    docs = await servicesProducts.getProductsRelevance(
      relevance,
      page,
      orderField,
      order
    );
  } else if (name) {
    docs = await servicesProducts.getProductsName(
      name,
      page,
      orderField,
      order
    );
  } else if (price) {
    docs = await servicesProducts.getProductsPrice(
      price,
      page,
      orderField,
      order
    );
  } else {
    docs = await servicesProducts.getAllProducts(
      page,
      orderField,
      order
    );
  }

  if (docs.totalDocs !== 0) {
    const { page, totalPages } = docs;
    docs = docs.docs.map((elem) => {
      const { _id, name, relevance, price } = elem;
      return { _id, name, relevance, price };
    });
    res.json({ page, totalPages, products: docs }).status(200).end();
  } else {
    res.json({ result: "No existen resultados" }).status(404).end();
  }
});

module.exports = router;
