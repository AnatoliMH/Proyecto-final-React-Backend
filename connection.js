const mongoose = require("mongoose");
const user = "anatoli";
const passwd = "root1234";
const database = "videogameStore";
const connectionString = `mongodb+srv://${user}:${passwd}@cluster0.v7epe.mongodb.net/${database}?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
  });
