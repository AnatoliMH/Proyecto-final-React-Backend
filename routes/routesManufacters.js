const router = require("express").Router();
const servicesManufacters = require("../services/servicesManufacters");

router.get("/search", async (req, res) => {
  const { name, page } = req.query;
  let docs = [];

  if (name) docs = await servicesManufacters.getManufactersByName(name, page);
  else docs = await servicesManufacters.getAllManufacters(page);

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
