require("./connection");

const express = require("express");
const app = express();
const config = require("./modules/config");
const routerManufacters = require("./routes/routesManufacters");
const routerProducts = require("./routes/routesProducts");
const router = express.Router();
const hostname = config.HOST;
const port = config.PORT;
const cors = require("cors");

app.use(cors());
app.use("/manufacters", routerManufacters);
app.use("/products", routerProducts);

app.listen(port, hostname, () => {
  console.log(`Servidor levantado con éxito en http://${hostname}:${port}`);
  // console.log(`Entorno: ${process.env.NODE_ENV}`);
});

module.exports = router;
